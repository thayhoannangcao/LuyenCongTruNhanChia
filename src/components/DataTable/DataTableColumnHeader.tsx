import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/src/utils/utils';
import { sortOrder } from '@/src/enums/app.enum';
import { ArrowDownIcon, ArrowUpIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import type { Column } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { LuArrowUpDown } from 'react-icons/lu';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const trans = useTranslations();
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  return (
    <div
      className={cn(
        'flex items-center space-x-2 [&_button]:outline-0',
        className
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="!border-none">
          <div className="focus:none !text-text-primary !flex h-8 w-full items-center justify-center !border-none !bg-transparent !px-0 text-sm font-medium !outline-none">
            <span>{title}</span>
            {column.getIsSorted() === sortOrder.Desc ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === sortOrder.Asc ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <LuArrowUpDown className="text-text-disabled ml-2 h-4 w-4" />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            {trans('common.asc')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            {trans('common.desc')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            {trans('common.hide')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
