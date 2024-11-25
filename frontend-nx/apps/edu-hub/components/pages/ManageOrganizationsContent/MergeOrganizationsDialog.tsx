import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import DropDownSelector from '../../inputs/DropDownSelector';
import { BaseDialog } from '../../common/dialogs/BaseDialog';
import { useRoleQuery } from '../../../hooks/authedQuery';
import { ORGANIZATION_LIST } from '../../../queries/organization';

interface MergeOrganizationsDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (targetOrgId: string) => void;
}

export const MergeOrganizationsDialog: React.FC<MergeOrganizationsDialogProps> = ({ open, onClose, onConfirm }) => {
  const { t } = useTranslation('manageOrganizations');
  const [selectedTargetOrg, setSelectedTargetOrg] = useState<string>('');

  const { data } = useRoleQuery(ORGANIZATION_LIST, {
    variables: {
      limit: 10000,
      order_by: [{ name: 'asc' }],
    },
  });

  const organizationOptions = data?.Organization?.map((org) => ({
    value: org.id.toString(),
    label: org.name,
  }));

  const handleValueUpdated = (data: any) => {
    setSelectedTargetOrg(data.value || data);
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      onConfirm={() => onConfirm(selectedTargetOrg)}
      confirmDisabled={!selectedTargetOrg}
    >
      <div>{t('bulk_action.merge.description')}</div>
      <div className="mt-4">
        <DropDownSelector
          variant="eduhub"
          label={t('bulk_action.merge.select_target.label')}
          placeholder={t('bulk_action.merge.select_target.placeholder')}
          value={selectedTargetOrg}
          options={organizationOptions}
          onValueUpdated={handleValueUpdated}
        />
      </div>
    </BaseDialog>
  );
};
