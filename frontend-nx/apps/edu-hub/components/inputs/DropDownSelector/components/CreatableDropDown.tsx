import React, { useState, useCallback } from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import useTranslation from 'next-translate/useTranslation';
import { Option } from '../types';
import { SelectChangeEvent } from '@mui/material';

type CreatableDropDownProps = {
  inputValue: string;
  localValue: string;
  variant: 'material' | 'eduhub';
  className?: string;
  placeholder?: string;
  label?: string;
  localOptions: Option[];
  errorMessage?: string;
  onInputChange: (value: string) => void;
  onValueChange: (event: SelectChangeEvent<string> | React.ChangeEvent<HTMLSelectElement>) => void;
  onCreateOption: () => void;
  getLabelForValue: (value?: string) => string;
};

export const CreatableDropDown: React.FC<CreatableDropDownProps> = ({
  inputValue,
  localValue,
  variant,
  className,
  placeholder,
  label,
  localOptions,
  errorMessage,
  onInputChange,
  onValueChange,
  onCreateOption,
  getLabelForValue,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isCleared, setIsCleared] = useState(false);

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

  const handleValueChange = (value: string | null) => {
    const syntheticEvent = {
      target: { value: value === null ? null : value },
    } as SelectChangeEvent<string>;
    onValueChange(syntheticEvent);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={isCleared ? '' : inputValue || (localValue ? getLabelForValue(localValue) : '')}
        onChange={(e) => {
          onInputChange(e.target.value);
          if (!e.target.value) {
            handleValueChange(null);
            setIsCleared(true);
          } else {
            setIsCleared(false);
          }
          setIsOpen(true);
          setHighlightedIndex(-1);
        }}
        onKeyDown={(e) => {
          if (!isOpen) return;

          const filteredOptions = getFilteredOptions(inputValue);
          const maxIndex = shouldShowCreateOption(inputValue) ? filteredOptions.length : filteredOptions.length - 1;

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
                onCreateOption();
              } else if (highlightedIndex >= 0) {
                const selectedOption = filteredOptions[highlightedIndex];
                onInputChange('');
                handleValueChange(selectedOption.value);
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
          if (!inputValue && !isCleared) {
            onInputChange(getLabelForValue(localValue));
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
                onInputChange('');
                handleValueChange(option.value);
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
              onClick={onCreateOption}
            >
              <AddIcon className="w-4 h-4 mr-2" />
              {t('dropdown_selector.create_option', { option: inputValue })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
