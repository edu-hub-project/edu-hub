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
    (searchValue = '') => {
      return localOptions.filter((option) => {
        const labelMatch = t(option.label).toLowerCase().includes(searchValue.toLowerCase());
        const aliasMatch = option.aliases?.some((alias) => {
          if (!alias) return false;
          if (typeof alias === 'object' && 'name' in alias) {
            return alias.name.toLowerCase().includes(searchValue.toLowerCase());
          }
          if (typeof alias === 'string') {
            return alias.toLowerCase().includes(searchValue.toLowerCase());
          }
          return false;
        });
        return labelMatch || aliasMatch;
      });
    },
    [localOptions, t]
  );

  const shouldShowCreateOption = useCallback(
    (searchValue = '') => {
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

  const handleOptionSelect = (optionValue: string) => {
    handleValueChange(optionValue);
    // Force the display of the selected value
    const selectedLabel = getLabelForValue(optionValue);
    onInputChange(selectedLabel);
    setIsOpen(false);
    setIsCleared(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const filteredOptions = getFilteredOptions(inputValue);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const optionElements = document.querySelectorAll('.dropdown-option');
      optionElements.forEach((el) => el.classList.remove('hover:bg-gray-300'));

      setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const optionElements = document.querySelectorAll('.dropdown-option');
      optionElements.forEach((el) => el.classList.remove('hover:bg-gray-300'));

      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (event.key === 'Enter' && highlightedIndex >= 0) {
      event.preventDefault();
      if (highlightedIndex < filteredOptions.length) {
        const selectedOption = filteredOptions[highlightedIndex];
        handleOptionSelect(selectedOption.value);
      } else if (shouldShowCreateOption(inputValue)) {
        onCreateOption();
      }
      setHighlightedIndex(-1);
    }
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
        onKeyDown={handleKeyDown}
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
              className={`dropdown-option px-4 py-2 cursor-pointer ${
                highlightedIndex === index ? 'bg-gray-300' : 'hover:bg-gray-300'
              }`}
              onClick={() => handleOptionSelect(option.value)}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseLeave={() => setHighlightedIndex(-1)}
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
