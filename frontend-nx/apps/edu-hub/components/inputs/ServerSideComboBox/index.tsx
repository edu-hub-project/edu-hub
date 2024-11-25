import React, { useState, useCallback, useEffect } from 'react';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown, Plus, Loader } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import { cn } from '../../../lib/utils'; // Utility for combining class names
import { DocumentNode } from 'graphql';
import { useRoleMutation } from '../../../hooks/authedMutation';
import { ErrorMessageDialog } from '../../common/dialogs/ErrorMessageDialog';
import * as Label from '@radix-ui/react-label';
import NotificationSnackbar from '../../common/dialogs/NotificationSnackbar';
import useTranslation from 'next-translate/useTranslation';

// Add type for variant
type VariantType = 'default' | 'minimal';

const VARIANTS: Record<
  VariantType,
  {
    trigger: string;
    content: string;
    input: string;
    item: string;
    createItem: string;
    viewport: string;
  }
> = {
  default: {
    // Styles for the main button/trigger that opens the dropdown
    trigger:
      'inline-flex items-center justify-between w-full px-3 py-3 text-base text-gray-500 border rounded-md shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    // Styles for the dropdown container
    content: 'overflow-hidden bg-white rounded-md shadow-lg border max-h-[300px]',
    // Styles for the search input field
    input:
      'w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    // Styles for regular dropdown items
    item: 'relative flex items-center px-8 py-2 text-sm rounded-md cursor-default select-none hover:bg-blue-50 focus:bg-blue-50 focus:outline-none',
    // Styles for the "Create new" item
    createItem:
      'relative flex items-center px-8 py-2 text-sm rounded-md cursor-default select-none hover:bg-blue-50 focus:bg-blue-50 focus:outline-none text-blue-600',
    // Styles for the scrollable viewport
    viewport: 'p-1 overflow-auto max-h-[280px]',
  },
  minimal: {
    trigger:
      'inline-flex items-center justify-between w-full px-2 py-1 text-sm border-b hover:border-gray-300 focus:outline-none focus:border-blue-500',
    content: 'overflow-hidden bg-white rounded shadow-sm border-gray-200',
    input: 'w-full px-2 py-1 text-sm focus:outline-none',
    item: 'relative flex items-center px-4 py-1 text-sm cursor-default select-none hover:bg-gray-50 focus:bg-gray-50',
    createItem:
      'relative flex items-center px-4 py-1 text-sm cursor-default select-none hover:bg-gray-50 focus:bg-gray-50 text-blue-500',
    viewport: 'p-1 overflow-auto max-h-[280px]',
  },
};

const ComboboxTrigger = ({ variant = 'default', children, className, ...props }) => (
  <Select.Trigger className={cn(VARIANTS[variant].trigger, className)} {...props}>
    {children}
  </Select.Trigger>
);

const ComboboxContent = ({ variant = 'default', children, className, ...props }) => (
  <Select.Content className={cn(VARIANTS[variant].content, className)} position="popper" sideOffset={5} {...props}>
    {children}
  </Select.Content>
);

const ComboboxInput = ({ variant = 'default', className, ...props }) => (
  <input className={cn(VARIANTS[variant].input, className)} {...props} />
);

interface ComboboxItemProps {
  variant?: 'default' | 'minimal';
  isCreateOption?: boolean;
  children: React.ReactNode;
  className?: string;
  value: string;
}

const ComboboxItem = ({
  variant = 'default',
  isCreateOption,
  children,
  className,
  value,
  ...props
}: ComboboxItemProps) => (
  <Select.Item
    className={cn(isCreateOption ? VARIANTS[variant].createItem : VARIANTS[variant].item, className)}
    value={value}
    {...props}
  >
    {children}
  </Select.Item>
);

interface Option {
  value: string;
  label: string;
}

// Update ServerSideCombobox props interface
interface ServerSideComboboxProps {
  // External handler props (optional)
  onSearch?: (term: string) => Promise<Option[]>;
  onSelect?: (value: string) => void;
  onCreate?: (value: string) => void;

  // Basic props
  placeholder?: string;
  variant?: VariantType;
  value?: string | null;
  className?: string;
  debounceMs?: number;

  // Internal handling props (optional)
  queryDocument?: DocumentNode;
  queryVariables?: Record<string, any>;

  createMutation?: DocumentNode;
  createMutationVariables?: (value: string) => Record<string, any>;

  selectMutation?: DocumentNode;
  selectMutationVariables?: (value: string) => Record<string, any>;

  label?: string;
  required?: boolean;
}

const ServerSideCombobox = ({
  onSearch,
  onSelect,
  onCreate,
  placeholder = 'Select an option...',
  variant = 'default',
  value,
  className,
  debounceMs = 300,
  label,
  createMutation,
  createMutationVariables,
  selectMutation,
  selectMutationVariables,
  required = false,
}: ServerSideComboboxProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(value || null);
  const [error, setError] = useState<string | null>(null);
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  const [executeMutationCreate] = useRoleMutation(createMutation);
  const [executeMutationSelect] = useRoleMutation(selectMutation);

  const { t } = useTranslation('common');

  // Update selectedValue when value prop changes
  useEffect(() => {
    setSelectedValue(value || null);
  }, [value]);

  const handleSelect = useCallback(
    async (value: string) => {
      if (value === 'create-new') {
        if (onCreate) {
          onCreate(searchTerm);
        } else if (createMutation && createMutationVariables) {
          try {
            await executeMutationCreate({
              variables: createMutationVariables(searchTerm),
            });
            setShowSavedNotification(true);

            // Use the search term as the display value for the newly created option
            setSelectedValue(searchTerm);

            // After creation, trigger a new search to refresh the list
            if (onSearch) {
              setIsLoading(true);
              const results = await onSearch(searchTerm);
              setOptions(results);
              setIsLoading(false);
            }
          } catch (error) {
            setError(error.message);
            return;
          }
        }
        setSearchTerm('');
      } else {
        if (onSelect) {
          onSelect(value);
        } else if (selectMutation && selectMutationVariables) {
          try {
            await executeMutationSelect({
              variables: selectMutationVariables(value),
            });
            setShowSavedNotification(true);

            // Find the selected option to get its label
            const selectedOption = options.find((opt) => opt.value === value);
            if (selectedOption) {
              setSelectedValue(selectedOption.label);
            }
          } catch (error) {
            setError(error.message);
            return;
          }
        }
      }
      setIsOpen(false);
    },
    [
      searchTerm,
      onCreate,
      onSelect,
      onSearch,
      createMutation,
      selectMutation,
      createMutationVariables,
      selectMutationVariables,
      executeMutationCreate,
      executeMutationSelect,
      options,
    ]
  );

  const debouncedSearch = useDebouncedCallback(async (term: string) => {
    if (!term) {
      setOptions([]);
      return;
    }

    setIsLoading(true);
    try {
      if (onSearch) {
        const results = await onSearch(term);
        setOptions(results);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, debounceMs);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="w-full px-2">
      {label && (
        <Label.Root
          className={cn(
            'mb-2 text-base text-gray-400 block',
            required && 'after:content-[&quot;*&quot;] after:ml-0.5 after:text-red-500'
          )}
        >
          {label}
        </Label.Root>
      )}
      <Select.Root open={isOpen} onOpenChange={setIsOpen} onValueChange={handleSelect} value={selectedValue}>
        <ComboboxTrigger variant={variant} className={className}>
          <Select.Value placeholder={placeholder}>{selectedValue}</Select.Value>
          <Select.Icon>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </Select.Icon>
        </ComboboxTrigger>

        <Select.Portal>
          <ComboboxContent variant={variant} className="">
            <div className="px-2 py-2 sticky top-0 bg-white z-10">
              <div className="relative">
                <ComboboxInput
                  variant={variant}
                  className=""
                  placeholder={placeholder}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {isLoading && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Loader className="w-4 h-4 animate-spin text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            <Select.Viewport className={cn(VARIANTS[variant].viewport)}>
              {searchTerm && !options.some((opt) => opt.label === searchTerm) && !isLoading && (
                <ComboboxItem value="create-new" variant={variant} isCreateOption={true} className="">
                  <Plus className="absolute left-2 w-4 h-4" />
                  <Select.ItemText>{t('server_side_combobox.create_option', { option: searchTerm })}</Select.ItemText>
                </ComboboxItem>
              )}

              {options.map((option) => (
                <ComboboxItem
                  key={option.value}
                  value={option.value}
                  variant={variant}
                  className=""
                  isCreateOption={false}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <Check className="w-4 h-4" />
                  </Select.ItemIndicator>
                </ComboboxItem>
              ))}

              {!isLoading && options.length === 0 && searchTerm && (
                <div className="px-2 py-4 text-sm text-gray-500 text-center">No results found</div>
              )}
            </Select.Viewport>
          </ComboboxContent>
        </Select.Portal>
      </Select.Root>

      <ErrorMessageDialog errorMessage={error} open={!!error} onClose={() => setError(null)} />
      <NotificationSnackbar
        open={showSavedNotification}
        onClose={() => setShowSavedNotification(false)}
        message="notification_snackbar.saved"
      />
    </div>
  );
};

export default ServerSideCombobox;
