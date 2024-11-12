import React, { FC, useMemo, useState, useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ColumnDef } from '@tanstack/react-table';
import { ApolloError } from '@apollo/client';
import { ErrorMessageDialog } from '../../common/dialogs/ErrorMessageDialog';
import { QuestionConfirmationDialog } from '../../common/dialogs/QuestionConfirmationDialog';

import TableGrid from '../../common/TableGrid';
import Loading from '../../common/Loading';
import InputField from '../../inputs/InputField';
import DropDownSelector from '../../inputs/DropDownSelector';
import { useRoleQuery } from '../../../hooks/authedQuery';
import { useRoleMutation } from '../../../hooks/authedMutation';
import { PageBlock } from '../../common/PageBlock';

import { OrganizationList, OrganizationList_Organization } from '../../../queries/__generated__/OrganizationList';
import { InsertOrganization, InsertOrganizationVariables } from '../../../queries/__generated__/InsertOrganization';
import {
  ORGANIZATION_LIST,
  INSERT_ORGANIZATION,
  UPDATE_ORGANIZATION_NAME,
  UPDATE_ORGANIZATION_TYPE,
  UPDATE_ORGANIZATION_DESCRIPTION,
  DELETE_ORGANIZATION,
  UPDATE_ORGANIZATION_ALIASES,
} from '../../../queries/organization';
import { UPDATE_USER_ORGANIZATION_ID } from '../../../queries/updateUser';
import CreatableTagSelector from '../../inputs/CreatableTagSelector';
import { OrganizationType_enum } from '../../../__generated__/globalTypes';
import { MergeOrganizationsDialog } from './MergeOrganizationsDialog';
import CommonPageHeader from '../../common/CommonPageHeader';

type ExpandableRowProps = {
  row: OrganizationList_Organization;
};

const ExpandableOrganizationRow: React.FC<ExpandableRowProps> = ({ row }): React.ReactElement => {
  const { t } = useTranslation('manageOrganizations');

  const currentTags = Array.isArray(row.aliases)
    ? row.aliases
        .filter((alias) => alias != null)
        .map((alias) => {
          if (typeof alias === 'string') return alias;
          if (typeof alias === 'object' && alias !== null && 'name' in alias) return alias.name;
          return null;
        })
        .filter((alias) => alias !== null)
    : [];

  return (
    <div className="font-medium bg-edu-course-list p-4">
      <CreatableTagSelector
        variant="material"
        label={t('organization.aliases')}
        placeholder={t('input.enter_alias')}
        itemId={row.id}
        values={currentTags}
        options={[]}
        updateValuesMutation={UPDATE_ORGANIZATION_ALIASES}
        refetchQueries={['OrganizationList']}
      />
      <InputField
        variant="material"
        type="input"
        label={t('organization.description')}
        placeholder={t('input.enter_description')}
        itemId={row.id}
        value={row.description || ''}
        updateValueMutation={UPDATE_ORGANIZATION_DESCRIPTION}
        refetchQueries={['OrganizationList']}
      />
    </div>
  );
};

const ManageOrganizationsContent: FC = () => {
  const { t } = useTranslation('manageOrganizations');
  const [error, setError] = useState<string | null>(null);
  const [bulkActionDialogOpen, setBulkActionDialogOpen] = useState(false);
  const [selectedRowsForBulkAction, setSelectedRowsForBulkAction] = useState<OrganizationList_Organization[]>([]);
  const [mergeDialogOpen, setMergeDialogOpen] = useState(false);

  const organizationQueryResult = useRoleQuery<OrganizationList>(ORGANIZATION_LIST);

  const { data, loading, error: queryError, refetch } = organizationQueryResult;

  const [insertOrganization] = useRoleMutation<InsertOrganization, InsertOrganizationVariables>(INSERT_ORGANIZATION);
  const [deleteOrganization] = useRoleMutation(DELETE_ORGANIZATION);
  const [updateOrganizationAliases] = useRoleMutation(UPDATE_ORGANIZATION_ALIASES);
  const [updateUserOrganizationId] = useRoleMutation(UPDATE_USER_ORGANIZATION_ID);

  const organizationTypes = useMemo(
    () =>
      data?.OrganizationType?.map((type) => ({ value: type.value, label: t(`type_selection.${type.value}`) })) || [],
    [data, t]
  );

  const columns = useMemo<ColumnDef<OrganizationList_Organization>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'organization.name',
        meta: { width: 3 },
        cell: ({ getValue, row }) => (
          <InputField
            variant="material"
            type="input"
            placeholder={t('input.enter_name')}
            itemId={row.original.id}
            value={getValue<string>()}
            updateValueMutation={UPDATE_ORGANIZATION_NAME}
            refetchQueries={['OrganizationList']}
          />
        ),
      },
      {
        accessorKey: 'type',
        header: t('organization.type'),
        meta: { width: 3 },
        cell: ({ getValue, row }) => (
          <DropDownSelector
            variant="material"
            identifierVariables={{ id: row.original.id }}
            value={getValue<string>()}
            options={organizationTypes}
            updateValueMutation={UPDATE_ORGANIZATION_TYPE}
            refetchQueries={['OrganizationList']}
          />
        ),
      },
    ],
    [t, organizationTypes]
  );

  const onAddOrganizationClick = useCallback(async () => {
    try {
      await insertOrganization({
        variables: {
          insertInput: {
            name: t('organization.new_organization'),
            type: organizationTypes[0].value as OrganizationType_enum,
            description: t('organization.default_description'),
          },
        },
      });
      refetch();
    } catch (error) {
      let errorMessage = '';
      if (error instanceof ApolloError) {
        const rawErrorMessage = error.message;
        if (rawErrorMessage.includes('duplicate key value violates unique constraint "Organization_name_key"')) {
          errorMessage = t('error.duplicate_organization_name');
        } else {
          errorMessage = rawErrorMessage;
        }
      } else {
        errorMessage = t('error.unexpected');
      }
      setError(errorMessage);
      console.error('Error adding organization:', error);
    }
  }, [insertOrganization, t, organizationTypes, refetch]);

  const generateDeletionConfirmation = useCallback(
    (row: OrganizationList_Organization) => {
      return t('action.delete_confirmation', { name: row.name });
    },
    [t]
  );

  const bulkActions = useMemo(
    () => [
      { value: 'delete', label: t('bulk_action.delete.label') },
      { value: 'merge', label: t('bulk_action.merge.label') },
    ],
    [t]
  );

  const handleBulkAction = useCallback((action: string, selectedRows: OrganizationList_Organization[]) => {
    if (selectedRows.length === 0) return;

    if (action === 'delete') {
      setBulkActionDialogOpen(true);
      setSelectedRowsForBulkAction(selectedRows);
    } else if (action === 'merge') {
      setMergeDialogOpen(true);
      setSelectedRowsForBulkAction(selectedRows);
    }
  }, []);

  const handleMergeConfirmation = useCallback(
    async (targetOrgId: string) => {
      setMergeDialogOpen(false);
      try {
        // Find target organization from the full organization list
        const targetOrg = data?.Organization?.find((org) => org.id === parseInt(targetOrgId, 10));
        const targetOrgExistingAliases = targetOrg?.aliases || [];

        // Get all aliases from selected organizations and their names
        const aliasesToMerge = selectedRowsForBulkAction.flatMap((org) => {
          const orgAliases = Array.isArray(org.aliases)
            ? org.aliases
                .filter((alias) => alias != null)
                .map((alias) => {
                  if (typeof alias === 'string') return alias;
                  if (typeof alias === 'object' && alias !== null && 'name' in alias) return alias.name;
                  return null;
                })
                .filter((alias): alias is string => alias !== null)
            : [];

          return org.id !== parseInt(targetOrgId, 10) ? [...orgAliases, org.name] : [];
        });

        // Combine existing target aliases with new aliases, removing duplicates
        const combinedAliases = Array.from(new Set([...targetOrgExistingAliases, ...aliasesToMerge]));

        await updateOrganizationAliases({
          variables: {
            id: parseInt(targetOrgId, 10),
            tags: combinedAliases,
          },
        });

        // Delete all selected organizations except the target one
        const orgsToDelete = selectedRowsForBulkAction.filter((org) => org.id !== parseInt(targetOrgId, 10));

        await Promise.all(orgsToDelete.map((org) => deleteOrganization({ variables: { id: org.id } })));

        refetch();
      } catch (error) {
        setError(t('error.merge_failed'));
      }
      setSelectedRowsForBulkAction([]);
    },
    [
      selectedRowsForBulkAction,
      data?.Organization,
      deleteOrganization,
      updateOrganizationAliases,
      updateUserOrganizationId,
      refetch,
      t,
    ]
  );

  const handleCloseErrorDialog = () => {
    setError(null);
  };

  const handleBulkActionConfirmation = useCallback(async () => {
    setBulkActionDialogOpen(false);
    try {
      await Promise.all(selectedRowsForBulkAction.map((org) => deleteOrganization({ variables: { id: org.id } })));
      refetch();
    } catch (error) {
      setError(t('error.bulk_delete_failed'));
    }
    setSelectedRowsForBulkAction([]);
  }, [selectedRowsForBulkAction, deleteOrganization, refetch, t]);

  return (
    <PageBlock>
      <div className="max-w-screen-xl mx-auto mt-20">
        {loading && <Loading />}
        {!loading && (
          <div>
            <CommonPageHeader headline={t('headline')} />
            <TableGrid
              columns={columns}
              data={data?.Organization || []}
              deleteMutation={DELETE_ORGANIZATION}
              error={queryError}
              loading={loading}
              refetchQueries={['OrganizationList']}
              showDelete
              bulkActions={bulkActions}
              onBulkAction={handleBulkAction}
              translationNamespace="manageOrganizations"
              generateDeletionConfirmationQuestion={generateDeletionConfirmation}
              expandableRowComponent={({ row }) => <ExpandableOrganizationRow row={row} />}
              onAddButtonClick={onAddOrganizationClick}
              addButtonText={t('action.add')}
            />
            <ErrorMessageDialog errorMessage={error || ''} open={!!error} onClose={handleCloseErrorDialog} />
            <QuestionConfirmationDialog
              open={bulkActionDialogOpen}
              question={t('bulk_action.delete.description', {
                count: selectedRowsForBulkAction.length,
              })}
              onConfirm={handleBulkActionConfirmation}
              onClose={() => {
                setBulkActionDialogOpen(false);
                setSelectedRowsForBulkAction([]);
              }}
            />
            <MergeOrganizationsDialog
              open={mergeDialogOpen}
              organizationList={data.Organization}
              onClose={() => {
                setMergeDialogOpen(false);
                setSelectedRowsForBulkAction([]);
              }}
              onConfirm={handleMergeConfirmation}
            />
          </div>
        )}
      </div>
    </PageBlock>
  );
};

export default React.memo(ManageOrganizationsContent);
