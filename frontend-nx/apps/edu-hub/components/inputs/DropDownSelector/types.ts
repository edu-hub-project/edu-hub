import { DocumentNode } from 'graphql';

export type Option = {
  value: string;
  label: string;
  aliases?: Array<string | { name: string } | null> | null;
};

export type DropDownSelectorProps = {
  variant: 'material' | 'eduhub';
  label?: string;
  placeholder?: string;
  value: string;
  options: Option[];
  updateValueMutation: DocumentNode;
  onValueUpdated?: (data: any) => void;
  refetchQueries?: string[];
  helpText?: string;
  errorText?: string;
  isMandatory?: boolean;
  className?: string;
  identifierVariables: Record<string, any>;
  creatable?: boolean;
  onOptionCreated?: (newValue: string) => void;
  createOptionMutation?: DocumentNode;
}; 