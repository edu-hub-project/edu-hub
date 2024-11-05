import { useState, useCallback, useEffect } from 'react';
import { useRoleMutation } from '../../../hooks/authedMutation';
import { useDebouncedCallback } from 'use-debounce';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { Option } from './types';
import { DocumentNode } from 'graphql';
import { SelectChangeEvent } from '@mui/material';

export const useDropDownLogic = (
  value: string,
  options: Option[],
  updateValueMutation: DocumentNode,
  identifierVariables: Record<string, any>,
  onValueUpdated?: (data: any) => void,
  refetchQueries: string[] = []
) => {
  const [localValue, setLocalValue] = useState(value);
  const [localOptions, setLocalOptions] = useState(options);
  const { error, handleError, resetError } = useErrorHandler();
  const [showSavedNotification, setShowSavedNotification] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [updateValue] = useRoleMutation(updateValueMutation, {
    onError: (error) => handleError(error.message),
    onCompleted: (data) => {
      if (onValueUpdated) onValueUpdated(data);
      setShowSavedNotification(true);
    },
    refetchQueries,
  });

  const validateValue = useCallback((newValue: string, isMandatory = false) => {
    return isMandatory ? newValue !== '' : true;
  }, []);

  const debouncedUpdateValue = useDebouncedCallback((newValue: string, isMandatory = false) => {
    if (validateValue(newValue, isMandatory)) {
      const variables = {
        ...identifierVariables,
        value: newValue,
      };
      updateValue({ variables });
      setErrorMessage('');
    } else {
      setErrorMessage('unified_dropdown_selector.invalid_selection');
    }
    setHasBlurred(false);
  }, 300);

  const handleValueChange = useCallback(
    (event: SelectChangeEvent<string> | React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = event.target.value;
      setLocalValue(newValue);
      debouncedUpdateValue(newValue);
    },
    [debouncedUpdateValue]
  );

  const handleBlur = useCallback(
    (variant: 'material' | 'eduhub', isMandatory = false) => {
      setHasBlurred(true);
      if (!validateValue(localValue, isMandatory)) {
        setErrorMessage('dropdown_selector.invalid_selection');
        if (variant === 'eduhub') {
          handleError('dropdown_selector.invalid_selection');
        }
      } else {
        setErrorMessage('');
        if (variant === 'eduhub') {
          resetError();
        }
      }
      debouncedUpdateValue.flush();
    },
    [localValue, validateValue, debouncedUpdateValue, handleError, resetError]
  );

  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value);
    }
  }, [value, localValue]);

  useEffect(() => {
    setLocalOptions(options);
  }, [options]);

  return {
    localValue,
    setLocalValue,
    localOptions,
    setLocalOptions,
    error,
    handleError,
    resetError,
    showSavedNotification,
    setShowSavedNotification,
    hasBlurred,
    errorMessage,
    handleValueChange,
    handleBlur,
    debouncedUpdateValue,
    validateValue,
  };
}; 