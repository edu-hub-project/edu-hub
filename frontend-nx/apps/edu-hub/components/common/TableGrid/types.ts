import { ApolloError, DocumentNode } from '@apollo/client';
import { ColumnDef } from '@tanstack/react-table';
import { ReactElement } from 'react';

export interface BaseRow {
  id: number;
}

export interface BulkAction {
  value: string;
  label: string;
}

export interface TableGridProps<T extends BaseRow> {
  addButtonText?: string;
  data: T[];
  columns: ColumnDef<T>[];
  deleteMutation?: DocumentNode;
  deleteIdType?: 'number' | 'uuidString';
  generateDeletionConfirmationQuestion?: (row: T) => string;
  enablePagination?: boolean;
  error: ApolloError;
  expandableRowComponent?: (props: { row: T }) => ReactElement | null;
  loading: boolean;
  pageSize?: number;
  refetchQueries: string[];
  showCheckbox?: boolean;
  showGlobalSearchField?: boolean;
  onAddButtonClick?: () => void;
  onBulkAction?: (action: string, selectedRows: T[]) => void;
  bulkActions?: BulkAction[];
  totalCount?: number;
  pageIndex: number;
  onPageChange: (index: number) => void;
  searchFilter: string;
  onSearchFilterChange: (value: string) => void;
}

export interface UseTableGridProps<T, V> {
  queryHook: any; // useRoleQuery or useAdminQuery
  query: DocumentNode;
  queryVariables?: V;
  pageSize?: number;
  refetchFilter?: (searchFilter: string) => Record<string, any>;
} 

export interface TableGridDeleteButtonProps {
  deleteMutation: DocumentNode;
  id: string | number;
  refetchQueries: string[];
  idType: 'number' | 'uuidString';
  deletionConfirmationQuestion?: string;
}
