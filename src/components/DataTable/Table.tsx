'use client';

import type { Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table as TableBase,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TABLE_SKELETON_NUM } from '@/src/constants/number.constants';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import type { DataTableViewOptionsProps } from './TableViewOptions';
import { TableViewOptions } from './TableViewOptions';

export interface DataTableProps<TData> {
  className?: string;
  headerDisplay?: boolean;
  dataTableVisibleProps?: Omit<DataTableViewOptionsProps<TData>, 'table'>;
  loading?: boolean;
  empty?: React.ReactNode;
  table: Table<TData>;
  showExtraRow?: boolean;
  extraRowContent?: React.ReactNode;
}
type CustomColumnMeta = {
  fixed?: 'left' | 'right' | boolean;
  onClick?: (value: string) => void;
  width?: number;
  className?: string;
  minWidth?: number;
};

export function Table<TData>({
  dataTableVisibleProps,
  className,
  headerDisplay = true,
  loading,
  empty,
  table,
  showExtraRow,
  extraRowContent,
}: Readonly<DataTableProps<TData>>) {
  const trans = useTranslations();

  const renderRows = () => {
    const rows = [];

    if (showExtraRow && extraRowContent) {
      const fixedRightColumn = [...table.getAllColumns()]
        .reverse()
        .find(
          (col) => (col.columnDef.meta as CustomColumnMeta)?.fixed === 'right'
        );
      const fixedLeftColumn = [...table.getAllColumns()]
        .reverse()
        .find(
          (col) => (col.columnDef.meta as CustomColumnMeta)?.fixed === 'left'
        );

      const fixedRightWidth =
        (fixedRightColumn?.columnDef.meta as CustomColumnMeta)?.width ?? 0;
      const fixedLeftWidth =
        (fixedLeftColumn?.columnDef.meta as CustomColumnMeta)?.width ?? 0;

      rows.push(
        <TableRow className="">
          <TableCell
            colSpan={table.getAllColumns().length}
            className="z-0 !p-0"
          >
            <div className="flex w-full">
              {fixedLeftColumn && (
                <div
                  className="sticky left-0 z-10 bg-white px-[12px] py-2 shadow-table-extra-fixed-left"
                  style={{ width: fixedLeftWidth }}
                >
                  <div style={{ width: fixedLeftWidth }}></div>
                </div>
              )}
              <div className="w-full">{extraRowContent}</div>

              {fixedRightColumn && (
                <div
                  className="sticky right-0 z-10 bg-white px-[12px] py-2 shadow-table-extra-fixed-right"
                  style={{ width: fixedRightWidth }}
                >
                  <div style={{ width: fixedRightWidth }}></div>
                </div>
              )}
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (loading) {
      return [
        ...rows,
        ...Array(TABLE_SKELETON_NUM)
          .fill(null)
          .map((_, i) => (
            <TableRow key={`skeleton-${i}`}>
              <TableCell colSpan={table.getAllColumns().length}>
                <Skeleton className="h-8 bg-action-hover" />
              </TableCell>
            </TableRow>
          )),
      ];
    }

    return [
      ...rows,
      ...table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() && 'selected'}
          className="[&:hover_.sticky]:!bg-[#f2f5fe] [&>th]:!text-xs [&>th]:font-medium"
        >
          {row.getVisibleCells().map((cell) => {
            const { fixed, onClick, width, minWidth, className } =
              (cell.column.columnDef.meta as CustomColumnMeta) || {};
            const isFixedLeft = fixed === true || fixed === 'left';
            const isFixedRight = fixed === 'right';

            return (
              <TableCell
                key={cell.id}
                className={clsx(
                  'whitespace-nowrap',
                  onClick && 'custom-cursor cursor-pointer',
                  isFixedLeft &&
                    'custom-p-claim sticky left-0 z-10 flex flex-wrap bg-white shadow-table-extra-fixed-left transition-colors',
                  isFixedRight &&
                    'sticky right-0 z-10 flex flex-wrap bg-white shadow-table-extra-fixed-right transition-colors',
                  className
                )}
                onClick={() => onClick?.(row.id)}
                style={{ width, minWidth }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            );
          })}
        </TableRow>
      )),
    ];
  };

  const isEmpty = !table.getRowModel().rows?.length && !loading;
  return (
    <div className={clsx('overflow-hidden', isEmpty && 'h-full')}>
      {dataTableVisibleProps && (
        <TableViewOptions {...dataTableVisibleProps} table={table} />
      )}

      <div className="relative w-full overflow-x-auto overflow-y-hidden">
        <TableBase className={clsx('border', className)}>
          {headerDisplay && (
            <TableHeader className="!rounded-none !bg-action-hover md:h-[45px]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="[&:hover_.sticky]:!bg-[#f2f5fe] [&>th]:!text-xs [&>th]:font-medium"
                >
                  {headerGroup.headers.map((header) => {
                    const { fixed, width, minWidth, className } =
                      (header.column.columnDef.meta as CustomColumnMeta) || {};
                    const isFixedLeft = fixed === true || fixed === 'left';
                    const isFixedRight = fixed === 'right';
                    return (
                      <TableHead
                        key={header.id}
                        className={clsx(
                          'sticky top-0 z-10 whitespace-nowrap px-2 text-sm font-medium !text-text-primary',
                          isFixedLeft && 'left-0 z-20 bg-[#f6f6f6]',
                          isFixedRight && 'right-0 z-20 bg-[#f6f6f6]',
                          className
                        )}
                        style={{ width, minWidth }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
          )}
          <TableBody className="text-text-primary">{renderRows()}</TableBody>
        </TableBase>
      </div>
      {isEmpty && (
        <div className="flex h-full w-full justify-center py-6 text-text-primary">
          {empty || trans('common.table.noData')}
        </div>
      )}
    </div>
  );
}
