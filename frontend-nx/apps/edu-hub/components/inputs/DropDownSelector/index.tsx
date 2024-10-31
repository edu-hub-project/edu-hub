import React, { useState, useCallback } from 'react';
import { useDropDownLogic } from './hooks';
import { DropDownSelectorProps } from './types';
import { MaterialDropDown } from './components/MaterialDropDown';
import { EduhubDropDown } from './components/EduhubDropDown';
import { useRoleMutation } from '../../../hooks/authedMutation';
import useTranslation from 'next-translate/useTranslation';
import NotificationSnackbar from '../../common/dialogs/NotificationSnackbar';
import { ErrorMessageDialog } from '../../common/dialogs/ErrorMessageDialog';

const DropDownSelector: React.FC<DropDownSelectorProps> = ({
  variant,
  label,
  placeholder,
  value,
  options,
  updateValueMutation,
  onValueUpdated,
  refetchQueries = [],
  helpText,
  errorText,
  isMandatory = false,
  className = '',
  identifierVariables,
  creatable = false,
  onOptionCreated,
  createOptionMutation,
}) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');

  const {
    localValue,
    localOptions,
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
  } = useDropDownLogic(value, options, updateValueMutation, identifierVariables, onValueUpdated, refetchQueries);

  const [createValue] = useRoleMutation(createOptionMutation || updateValueMutation);

  const getLabelForValue = useCallback(
    (value?: string) => {
      if (!value) return '';
      const option = localOptions.find((opt) => opt.value === value);
      return option ? t(option.label) : '';
    },
    [localOptions, t]
  );

  const handleCreateOption = useCallback(() => {
    if (inputValue && !localOptions.some((option) => option.value === inputValue)) {
      if (createOptionMutation) {
        createValue({
          variables: {
            ...identifierVariables,
            value: inputValue,
          },
          onCompleted: (data) => {
            const newValue = data?.createOption?.value || data?.insert_Organization_one?.id;
            if (newValue) {
              const newValueStr = newValue.toString();
              onOptionCreated?.(newValueStr);
              debouncedUpdateValue(newValueStr);
            }
          },
          onError: (error) => {
            if (error.message.includes('Uniqueness violation')) {
              handleError(t('dropdown_selector.name_already_exists'));
            } else {
              handleError(error.message);
            }
          },
        });
      } else {
        onOptionCreated?.(inputValue);
        debouncedUpdateValue(inputValue);
      }
    }
  }, [
    inputValue,
    localOptions,
    createOptionMutation,
    createValue,
    identifierVariables,
    onOptionCreated,
    debouncedUpdateValue,
    handleError,
    t,
  ]);

  return (
    <>
      {variant === 'material' ? (
        <MaterialDropDown
          label={label}
          placeholder={placeholder}
          localValue={localValue}
          localOptions={localOptions}
          helpText={helpText}
          errorMessage={errorMessage}
          hasBlurred={hasBlurred}
          creatable={creatable}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onValueChange={handleValueChange}
          onBlur={() => handleBlur(variant, isMandatory)}
          onCreateOption={handleCreateOption}
          getLabelForValue={getLabelForValue}
        />
      ) : (
        <EduhubDropDown
          label={label}
          placeholder={placeholder}
          localValue={localValue}
          localOptions={localOptions}
          helpText={helpText}
          errorMessage={errorMessage}
          className={className}
          creatable={creatable}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onValueChange={handleValueChange}
          onBlur={() => handleBlur(variant, isMandatory)}
          onCreateOption={handleCreateOption}
          getLabelForValue={getLabelForValue}
        />
      )}
      <NotificationSnackbar
        open={showSavedNotification}
        onClose={() => setShowSavedNotification(false)}
        message="notification_snackbar.saved"
      />
      <ErrorMessageDialog errorMessage={error} open={!!error} onClose={resetError} />
    </>
  );
};

export default DropDownSelector;
