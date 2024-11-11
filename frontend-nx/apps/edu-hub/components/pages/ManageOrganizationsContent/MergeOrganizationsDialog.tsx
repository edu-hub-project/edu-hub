import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import DropDownSelector from '../../inputs/DropDownSelector';
import { OrganizationList_Organization } from '../../../queries/__generated__/OrganizationList';
import { BaseDialog } from '../../common/dialogs/BaseDialog';

interface MergeOrganizationsDialogProps {
  open: boolean;
  organizationList: OrganizationList_Organization[];
  onClose: () => void;
  onConfirm: (targetOrgId: string) => void;
}

export const MergeOrganizationsDialog: React.FC<MergeOrganizationsDialogProps> = ({
  open,
  organizationList,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation('manageOrganizations');
  const [selectedTargetOrg, setSelectedTargetOrg] = useState<string>('');

  const organizationOptions = organizationList.map((org) => ({
    value: org.id.toString(),
    label: org.name,
  }));

  const handleValueUpdated = (data: any) => {
    setSelectedTargetOrg(data.value || data);
  };

  const handleClose = () => {
    setSelectedTargetOrg('');
    onClose();
  };

  return (
    <BaseDialog
      open={open}
      onClose={handleClose}
      onConfirm={() => onConfirm(selectedTargetOrg)}
      confirmDisabled={!selectedTargetOrg}
    >
      <div>{t('bulk_action.merge.description')}</div>
      <div className="mt-4">
        <DropDownSelector
          variant="material"
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
