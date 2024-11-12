import React from 'react';
import { BaseDialog } from './BaseDialog';

interface QuestionConfirmationDialogProps {
  open: boolean;
  question: string;
  confirmationText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const QuestionConfirmationDialog: React.FC<QuestionConfirmationDialogProps> = ({
  open,
  question,
  confirmationText,
  cancelText,
  onClose,
  onConfirm,
  onCancel,
}) => {
  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmText={confirmationText}
      onCancel={onCancel}
      cancelText={cancelText}
    >
      {question}
    </BaseDialog>
  );
};
