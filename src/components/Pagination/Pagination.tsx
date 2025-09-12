import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Button from '../Button';
import { Skeleton } from '@/components/ui/skeleton';

interface DataTablePaginationProps {
  total: number;
  pageCount?: number;
  pageSize: number;
  pageIndex: number;
  setPageSize: (value: number) => void;
  setPageIndex: (value: number) => void;
  rowsPerPageOptions?: number[];
  loading?: boolean;
  isHideTotalNumber?: boolean;
}

export function Pagination({
  total,
  pageCount,
  pageSize,
  pageIndex,
  setPageSize,
  setPageIndex,
  rowsPerPageOptions = [10, 20, 30, 40, 50],
  loading,
  isHideTotalNumber = false,
}: Readonly<DataTablePaginationProps>) {
  const trans = useTranslations('common');
  const pageCountRes: number = pageCount || Math.ceil(total / pageSize);
  const canPreviousPage = pageIndex > 1;
  const canNextPage = pageIndex <= pageCountRes - 1;
  const currentPageStart = total ? (pageIndex - 1) * pageSize + 1 : 0;
  const currentPageEnd = Math.min(pageIndex * pageSize, total);

  return (
    <div className="flex items-center justify-start px-2 text-text-primary">
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-text-secondary">
            {trans('pagination.page')}
          </p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue>{pageSize}</SelectValue>
            </SelectTrigger>
            <SelectContent side="top">
              {rowsPerPageOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {loading ? (
          <div className="">
            <Skeleton className="h-6 w-[80px] bg-action-hover" />
          </div>
        ) : (
          <div className="text-base">
            {isHideTotalNumber
              ? trans('pagination.pageIndexWithoutTotal', {
                  currentIndex: `${currentPageStart}-${currentPageEnd}`,
                })
              : trans('pagination.pageIndex', {
                  currentIndex: `${currentPageStart}-${currentPageEnd}`,
                  total,
                })}
          </div>
        )}
        <div className="flex items-center">
          {/* <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPageIndex(0)}
            disable={!canPreviousPage}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button> */}
          <Button
            variant="ghost"
            className="px-1"
            size="sm"
            onClick={() => setPageIndex(pageIndex - 1)}
            disable={!canPreviousPage}
          >
            <LuChevronLeft
              className={clsx(
                'h-6 w-6 text-text-primary',
                !canPreviousPage && 'text-text-disabled'
              )}
              style={{ width: 24, height: 24 }}
            />
          </Button>
          <Button
            variant="ghost"
            className="px-1"
            size="sm"
            onClick={() => setPageIndex(pageIndex + 1)}
            disable={!canNextPage}
          >
            <LuChevronRight
              className={clsx(
                'h-6 w-6 text-text-primary',
                !canNextPage && 'text-text-disabled'
              )}
              style={{ width: 24, height: 24 }}
            />
          </Button>
          {/* <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPageIndex(pageCountRes - 1)}
            disable={!canNextPage}
          >
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button> */}
        </div>
      </div>
    </div>
  );
}
