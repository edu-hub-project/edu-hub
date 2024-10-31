import React, { useState, useCallback, useEffect } from 'react';
import { DocumentNode } from 'graphql';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import { HelpOutline, Add as AddIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useDebouncedCallback } from 'use-debounce';
import { useRoleMutation } from '../../hooks/authedMutation';
import useTranslation from 'next-translate/useTranslation';
import { prioritizeClasses } from '../../helpers/util';
import useErrorHandler from '../../hooks/useErrorHandler';
import { AlertMessageDialog } from '../common/dialogs/AlertMessageDialog';
import { ErrorMessageDialog } from '../common/dialogs/ErrorMessageDialog';
import NotificationSnackbar from '../common/dialogs/NotificationSnackbar';
import { gql } from 'graphql-tag';

type Option = {
  label: string;
  value: string;
};

type DropDownSelectorProps = {
  /**
   * Determines the visual style and behavior of the component.
   * 'material' uses Material-UI components, 'eduhub' uses custom styling.
   */
  variant: 'material' | 'eduhub';

  /** The label for the dropdown selector. */
  label?: string;

  /** Placeholder text for the input field */
  placeholder?: string;

  /** The currently selected value in the dropdown. */
  value: string;

  /** Array of available options for the dropdown (in format used in the database). */
  options: Option[];

  /**
   * GraphQL mutation to update the selected value.
   * Example:
   * ```
   * const UPDATE_VALUE_MUTATION = gql`
   *   mutation UpdateValue($id: ID!, $value: String!) {
   *     updateValue(id: $id, value: $value) {
   *       id
   *       value
   *     }
   *   }
   * `;
   * ```
   */
  updateValueMutation: DocumentNode;

  /** Callback function triggered after a successful value update. */
  onValueUpdated?: (data: any) => void;

  /** Array of query names to refetch after a successful update. */
  refetchQueries?: string[];

  /** Tooltip text to provide additional information about the dropdown. */
  helpText?: string;

  /** Error message to display when the selection is invalid. */
  errorText?: string;

  /** Indicates if the field is required. Default is false. */
  isMandatory?: boolean;

  /** Additional CSS classes to apply to the component. */
  className?: string;

  /**
   * Variables to include in the mutation for identification.
   * These should match the variables expected by the updateValueMutation.
   * Example: { id: "user123" }
   */
  identifierVariables: Record<string, any>;

  /** Allows users to enter custom values not in the options list */
  creatable?: boolean;

  /** Callback when a new option is created */
  onOptionCreated?: (newValue: string) => void;

  /**
   * GraphQL mutation to create a new option.
   * Example:
   * ```
   * const CREATE_VALUE_MUTATION = gql`
   *   mutation CreateValue($id: ID!, $value: String!) {
   *     createValue(id: $id, value: $value) {
   *       id
   *       value
   *     }
   *   }
   * `;
   * ```
   */
  createOptionMutation?: DocumentNode;
};

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
  isMandatory = false,
  className = '',
  identifierVariables = {},
  creatable = false,
  onOptionCreated,
  createOptionMutation,
}) => {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState(value);
  const [localOptions, setLocalOptions] = useState(options);
  const getLabelForValue = useCallback(
    (val?: string) => {
      if (!val || !localOptions?.length) return '';
      const option = localOptions.find((opt) => opt.value === val);
      return option ? option.label : creatable ? val : '';
    },
    [localOptions, creatable]
  );
  const [inputValue, setInputValue] = useState(getLabelForValue(value) || '');
  const [hasBlurred, setHasBlurred] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { error, handleError, resetError } = useErrorHandler();
  const [showSavedNotification, setShowSavedNotification] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const theme = useTheme();

  const [updateValue] = useRoleMutation(updateValueMutation, {
    onError: (error) => handleError(t(error.message)),
    onCompleted: (data) => {
      if (onValueUpdated) onValueUpdated(data);
      setShowSavedNotification(true);
    },
    refetchQueries,
  });

  const [createValue] = useRoleMutation(
    createOptionMutation ||
      gql`
        mutation NoOp {
          __typename
        }
      `,
    {
      onError: (error) => handleError(t(error.message)),
      onCompleted: async (data) => {
        const newValue = data?.createOption?.value || inputValue;
        const variables = {
          ...identifierVariables,
          value: newValue,
        };
        await updateValue({ variables });

        if (onOptionCreated) onOptionCreated(newValue);
        setShowSavedNotification(true);
      },
    }
  );

  const validateValue = (newValue: string) => {
    return isMandatory ? newValue !== '' : true;
  };

  const debouncedUpdateValue = useDebouncedCallback((newValue: string) => {
    if (validateValue(newValue)) {
      const variables = {
        ...identifierVariables,
        value: newValue,
      };
      updateValue({ variables });
      setErrorMessage('');
    } else {
      setErrorMessage(t('unified_dropdown_selector.invalid_selection'));
    }
    setHasBlurred(false);
  }, 300);

  const handleValueChange = useCallback(
    (event: SelectChangeEvent<string> | React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = event.target.value;
      setLocalValue(newValue);
      setInputValue(getLabelForValue(newValue) || '');
      debouncedUpdateValue(newValue);
    },
    [debouncedUpdateValue, getLabelForValue]
  );

  const handleBlur = useCallback(() => {
    setHasBlurred(true);
    if (!validateValue(localValue)) {
      setErrorMessage(t('dropdown_selector.invalid_selection'));
      if (variant === 'eduhub') {
        handleError(t('dropdown_selector.invalid_selection'));
      }
    } else {
      setErrorMessage('');
      if (variant === 'eduhub') {
        resetError();
      }
    }
    debouncedUpdateValue.flush();
  }, [variant, localValue, validateValue, debouncedUpdateValue, handleError, resetError, t]);

  const baseClass = 'w-full px-3 py-3 mb-8 text-gray-500 rounded bg-edu-light-gray';
  const finalClassName = prioritizeClasses(`${baseClass} ${className}`);

  const handleCreateOption = useCallback(() => {
    if (inputValue && !localOptions.some((option) => option.value === inputValue)) {
      if (createOptionMutation) {
        createValue({
          variables: {
            ...identifierVariables,
            value: localValue,
          },
          onCompleted: (data) => {
            const newValue = data?.createOption?.value || data?.insert_Organization_one?.id;
            if (newValue) {
              const newValueStr = newValue.toString();
              setLocalOptions((prev) => [...prev, { value: newValueStr, label: inputValue }]);
              setLocalValue(newValueStr);
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
        setLocalOptions((prev) => [...prev, { value: inputValue, label: inputValue }]);
        onOptionCreated?.(inputValue);
        setLocalValue(inputValue);
        debouncedUpdateValue(inputValue);
      }
      setIsOpen(false);
    }
  }, [
    inputValue,
    localOptions,
    onOptionCreated,
    debouncedUpdateValue,
    identifierVariables,
    createValue,
    handleError,
    t,
  ]);

  const getFilteredOptions = useCallback(
    (searchValue: string = '') => {
      return localOptions.filter((option) => t(option.label).toLowerCase().includes(searchValue.toLowerCase()));
    },
    [localOptions, t]
  );

  const shouldShowCreateOption = useCallback(
    (searchValue: string = '') => {
      return (
        searchValue &&
        !getFilteredOptions(searchValue).some((option) => t(option.label).toLowerCase() === searchValue.toLowerCase())
      );
    },
    [getFilteredOptions, t]
  );

  const renderCreatableDropdown = (className?: string) => (
    <div className="relative">
      <input
        type="text"
        value={inputValue || getLabelForValue(localValue)}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsOpen(true);
          setHighlightedIndex(-1);
        }}
        onKeyDown={(e) => {
          if (!isOpen) return;

          const filteredOptions = localOptions.filter((option) =>
            t(option.label).toLowerCase().includes(inputValue.toLowerCase())
          );
          const maxIndex =
            inputValue && !filteredOptions.some((option) => t(option.label).toLowerCase() === inputValue.toLowerCase())
              ? filteredOptions.length
              : filteredOptions.length - 1;

          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              setHighlightedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
              break;
            case 'ArrowUp':
              e.preventDefault();
              setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
              break;
            case 'Enter':
              e.preventDefault();
              if (highlightedIndex === filteredOptions.length) {
                handleCreateOption();
              } else if (highlightedIndex >= 0) {
                const selectedOption = filteredOptions[highlightedIndex];
                setInputValue('');
                setLocalValue(selectedOption.value);
                debouncedUpdateValue(selectedOption.value);
                setIsOpen(false);
              }
              break;
            case 'Escape':
              setIsOpen(false);
              break;
          }
        }}
        onFocus={() => {
          setIsOpen(true);
          if (!inputValue) {
            setInputValue(getLabelForValue(localValue));
          }
        }}
        onBlur={() => {
          if (variant === 'eduhub') {
            setTimeout(() => setIsOpen(false), 200);
          }
        }}
        className={
          variant === 'eduhub' ? `${className} ${errorMessage ? 'border-red-500' : ''}` : 'w-full p-2 border rounded'
        }
        placeholder={placeholder || t(label || '')}
      />
      {isOpen && (
        <div
          className={`absolute w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto ${
            variant === 'eduhub' ? 'z-50' : 'z-10'
          }`}
        >
          {getFilteredOptions(inputValue).map((option, index) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer ${highlightedIndex === index ? 'bg-gray-300' : 'hover:bg-gray-300'}`}
              onClick={() => {
                setInputValue('');
                setLocalValue(option.value);
                debouncedUpdateValue(option.value);
                setIsOpen(false);
              }}
            >
              {t(option.label)}
            </div>
          ))}
          {shouldShowCreateOption(inputValue) && (
            <div
              className={`px-4 py-2 cursor-pointer text-blue-600 flex items-center ${
                highlightedIndex === localOptions.length ? 'bg-gray-300' : 'hover:bg-gray-300'
              }`}
              onClick={handleCreateOption}
            >
              <AddIcon className="w-4 h-4 mr-2" />
              {t('dropdown_selector.create_option', { option: inputValue })}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderMaterialUI = () => (
    <div className="col-span-10 flex mt-3">
      <FormControl variant="standard" className={hasBlurred && errorMessage ? 'w-3/4' : 'w-full'}>
        {label && (
          <InputLabel id={`${label}-label`} style={{ color: hasBlurred && errorMessage ? 'red' : 'rgb(34, 34, 34)' }}>
            {t(label)}
          </InputLabel>
        )}
        {creatable ? (
          renderCreatableDropdown()
        ) : (
          <Select
            labelId={label ? `${label}-label` : undefined}
            value={localValue}
            onChange={handleValueChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            displayEmpty
            style={{ color: hasBlurred && errorMessage ? 'red' : 'inherit' }}
            endAdornment={
              helpText ? (
                <InputAdornment position="end">
                  <Tooltip title={t(helpText)} placement="top">
                    <HelpOutline style={{ cursor: 'pointer', color: theme.palette.text.disabled }} />
                  </Tooltip>
                </InputAdornment>
              ) : null
            }
          >
            {!localValue && placeholder && (
              <MenuItem value="" disabled>
                {placeholder}
              </MenuItem>
            )}
            {localOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {t(option.label)}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
      {hasBlurred && errorMessage && <p className="text-red-500 mt-2 ml-2 text-sm">{errorMessage}</p>}
    </div>
  );

  const renderEduhub = () => (
    <div className="px-2">
      <div className="text-gray-400">
        <div className="flex justify-between mb-2">
          <div className="flex items-center">
            {helpText && (
              <Tooltip title={t(helpText)} placement="top">
                <HelpOutline style={{ cursor: 'pointer', marginRight: '5px' }} />
              </Tooltip>
            )}
            {label}
          </div>
        </div>
        <div>
          {creatable ? (
            renderCreatableDropdown(finalClassName)
          ) : (
            <select
              onChange={handleValueChange}
              onBlur={handleBlur}
              value={localValue}
              className={`${finalClassName} ${errorMessage ? 'border-red-500' : ''}`}
            >
              {localOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {t(option.label)}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );

  // Add effect to update inputValue when options or value changes
  useEffect(() => {
    if (value && localOptions?.length) {
      setInputValue(getLabelForValue(value));
    }
  }, [value, localOptions, getLabelForValue]);

  // Update inputValue when value or options change
  useEffect(() => {
    const newLabel = getLabelForValue(localValue);
    if (newLabel) {
      setInputValue(newLabel);
    }
  }, [localValue, localOptions, getLabelForValue]);

  // Update localValue when value prop changes
  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value);
    }
  }, [value]);

  // Update local options when prop changes
  useEffect(() => {
    setLocalOptions(options);
  }, [options]);

  return (
    <>
      {variant === 'material' ? renderMaterialUI() : renderEduhub()}
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
