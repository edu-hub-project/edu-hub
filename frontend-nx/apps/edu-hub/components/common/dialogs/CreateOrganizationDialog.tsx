import React, { FC } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { MdClose } from 'react-icons/md';
import { Button } from '../Button';
import DropDownSelector from '../../inputs/DropDownSelector_single component';
import InputField from '../../inputs/InputField';
import { useAdminMutation } from '../../../hooks/authedMutation';
import { useAdminQuery } from '../../../hooks/authedQuery';
import { INSERT_ORGANIZATION, ORGANIZATION_LIST, UPDATE_ORGANIZATION_TYPE } from '../../../queries/organization';
import { OrganizationType_enum } from '../../../__generated__/globalTypes';

export interface CreateDialogProps {
  open: boolean;
  onClose: (confirmed: boolean) => void;
  initialValue: string;
}

const CreateOrganizationDialog: FC<CreateDialogProps> = ({ open, onClose, initialValue }) => {
  const { t } = useTranslation('manageOrganizations');
  const [name, setName] = React.useState(initialValue);
  // Get initial type from the query
  const { data: orgData } = useAdminQuery(ORGANIZATION_LIST);
  const initialType = orgData?.OrganizationType?.[0]?.value as OrganizationType_enum;
  const [type, setType] = React.useState<OrganizationType_enum>(initialType);

  const organizationTypes =
    orgData?.OrganizationType?.map((type) => ({
      label: t(`type_selection.${type.value}`),
      value: type.value,
    })) || [];

  const [insertOrganization] = useAdminMutation(INSERT_ORGANIZATION);

  const handleCreate = async () => {
    try {
      await insertOrganization({
        variables: {
          insertInput: {
            name,
            type,
            description: '',
          },
        },
        refetchQueries: ['OrganizationList'],
      });
      onClose(true);
    } catch (error) {
      console.error('Error creating organization:', error);
      onClose(false);
    }
  };

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div className="flex justify-between items-center">
          <span>{t('organization.create_new')}</span>
          <MdClose onClick={handleCancel} className="cursor-pointer" />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="mt-4 space-y-4">
          <InputField
            variant="material"
            type="input"
            label={t('organization.name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            showCharacterCount={false}
            itemId={0} // Temporary ID for new item
            updateValueMutation={null}
          />

          <DropDownSelector
            variant="material"
            label={t('organization.type')}
            value={type}
            options={organizationTypes}
            identifierVariables={{}}
            updateValueMutation={UPDATE_ORGANIZATION_TYPE}
          />

          <div className="flex justify-end space-x-2 pt-4">
            <Button onClick={handleCancel} className="mr-2">
              {t('common:cancel')}
            </Button>
            <Button onClick={handleCreate} filled>
              {t('common:create')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrganizationDialog;
