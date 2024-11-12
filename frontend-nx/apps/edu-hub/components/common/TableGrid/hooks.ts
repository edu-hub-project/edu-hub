import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { ColumnDef } from '@tanstack/react-table';
import { DocumentNode } from '@apollo/client';

interface UseTableGridProps<T, V> {
  queryHook: any; // useRoleQuery or useAdminQuery
  query: DocumentNode;
  queryVariables?: V;
  pageSize?: number;
  refetchFilter?: (searchFilter: string) => Record<string, any>;
}

export function useTableGrid<T extends { id: number }, V>({
  queryHook,
  query,
  queryVariables = {} as V,
  pageSize = 15,
  refetchFilter,
}: UseTableGridProps<T, V>) {
  const [searchFilter, setSearchFilter] = useState('');
  const [pageIndex, setPageIndex] = useState(0);

  const queryResult = queryHook(query, {
    variables: {
      offset: pageIndex * pageSize,
      limit: pageSize,
      ...queryVariables,
    },
  });

  const { data, loading, error, refetch } = queryResult;

  const debouncedRefetch = useDebouncedCallback(refetch, 300);

  useEffect(() => {
    debouncedRefetch({
      offset: pageIndex * pageSize,
      limit: pageSize,
      filter: refetchFilter ? refetchFilter(searchFilter) : {},
      ...queryVariables,
    });
  }, [pageIndex, debouncedRefetch, searchFilter, queryVariables]);

  const handleSetSearchFilter = useCallback((value: string) => {
    setSearchFilter(value);
    setPageIndex(0);
  }, []);

  const handleSetPageIndex = useCallback((index: number) => {
    setPageIndex(index);
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
    searchFilter,
    pageIndex,
    setSearchFilter: handleSetSearchFilter,
    setPageIndex: handleSetPageIndex,
  };
}