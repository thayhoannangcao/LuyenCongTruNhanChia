'use client';

import type { TableOptions } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table } from './Table';
import type { DataTableViewOptionsProps } from './TableViewOptions';

interface DataTableProps<TData> {
  dataTableProps: Omit<TableOptions<TData>, 'getCoreRowModel'>;
  className?: string;
  dataTableVisibleProps?: Omit<DataTableViewOptionsProps<TData>, 'table'>;
  loading?: boolean;
  empty?: React.ReactNode;
  headerDisplay?: boolean;
  showExtraRow?: boolean;
  extraRowContent?: React.ReactNode;
}

export function DataTable<TData>({
  dataTableProps,
  ...props
}: Readonly<DataTableProps<TData>>) {
  const table = useReactTable({
    ...dataTableProps,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return <Table table={table} {...props} />;
}
