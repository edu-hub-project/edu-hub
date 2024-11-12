import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { IconButton } from '@mui/material';
import { MdDelete } from 'react-icons/md';

import { TableGridDeleteButtonProps } from '../types';
import { QuestionConfirmationDialog } from '../../dialogs/QuestionConfirmationDialog';
import { useRoleMutation } from '../../../../hooks/authedMutation';

const TableGridDeleteButton = ({
  deleteMutation,
  id,
  refetchQueries,
  idType,
  deletionConfirmationQuestion,
}: TableGridDeleteButtonProps) => {
  const [deleteItem] = useRoleMutation(deleteMutation);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { t } = useTranslation();

  // If no question is provided, use the default one
  const confirmationQuestion = deletionConfirmationQuestion || t('common:deletion_confirmation_question');

  const handleDeleteClick = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmationClose = (confirmed: boolean) => {
    setIsConfirmationOpen(false);
    if (confirmed) {
      performDelete();
    }
  };

  const performDelete = () => {
    let variableId: string | number = id;

    if (idType === 'number') {
      if (typeof id === 'string') {
        variableId = parseInt(id, 10);
        if (isNaN(variableId)) {
          console.error('Invalid numeric ID:', id);
          return;
        }
      }
    } else if (idType === 'uuidString') {
      if (typeof id !== 'string') {
        console.error('Invalid UUID string:', id);
        return;
      }
      // Optionally, you could add a UUID validation regex here
    }

    deleteItem({
      variables: { id: variableId },
      refetchQueries,
    });
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleDeleteClick}
        className="delete-button"
        sx={{
          backgroundColor: 'transparent !important',
          padding: 0,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'rgba(255, 0, 0, 0.1) !important',
          },
        }}
      >
        <MdDelete size="1.25em" color="red" />
      </IconButton>
      <QuestionConfirmationDialog
        question={confirmationQuestion}
        confirmationText={t('common:confirm_delete')}
        open={isConfirmationOpen}
        onClose={() => handleConfirmationClose(false)}
        onConfirm={() => handleConfirmationClose(true)}
      />
    </>
  );
};

export default TableGridDeleteButton;
