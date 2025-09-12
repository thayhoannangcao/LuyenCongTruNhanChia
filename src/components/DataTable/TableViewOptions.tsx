'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import Button from '../Button';

export interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  title?: string | ReactNode;
}

export function TableViewOptions<TData>({
  table,
  title,
}: DataTableViewOptionsProps<TData>) {
  const trans = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="!outline-0">
        <Button variant="outline" size="sm" className="mb-2 ml-auto w-full">
          <div className="flex justify-center">
            <MixerHorizontalIcon className="mr-2 w-4" />
            {title || trans('common.view')}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>
          {trans('common.table.viewColumnsToggle')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
