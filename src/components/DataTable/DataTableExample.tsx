import { Checkbox } from '@/components/ui/checkbox';
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';
import Button from '../Button';
import StoryBookNextIntlProvider from '../common/StoryBookNextIntlProvider';
import { DataTableColumnHeader } from './DataTableColumnHeader';
import { DataTable } from './DataTable';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};
const data: Payment[] = [
  {
    id: '1',
    status: 'pending',
    email: 'email+122@gmail.com',
    amount: 1011,
  },
  {
    id: '12',
    status: 'processing',
    email: 'email+233@gmail.com',
    amount: 101,
  },
  {
    id: '13',
    status: 'failed',
    email: 'email+55@gmail.com',
    amount: 109,
  },
  {
    id: '14',
    status: 'success',
    email: 'email+7@gmail.com',
    amount: 107,
  },
  {
    id: '15',
    status: 'pending',
    email: 'email+9@gmail.com',
    amount: 104,
  },
  {
    id: '16',
    status: 'failed',
    email: 'email+12@gmail.com',
    amount: 130,
  },
  {
    id: '17',
    status: 'success',
    email: 'email+17@gmail.com',
    amount: 104,
  },
  {
    id: '18',
    status: 'pending',
    email: 'email+198@gmail.com',
    amount: 10,
  },
  {
    id: '19',
    status: 'pending',
    email: 'email+145@gmail.com',
    amount: 104,
  },
  {
    id: '20',
    status: 'pending',
    email: 'email+1@gmail.com',
    amount: 10,
  },
  {
    id: '21',
    status: 'pending',
    email: 'email+1@gmail.com',
    amount: 10,
  },
  {
    id: '22',
    status: 'pending',
    email: 'email+1@gmail.com',
    amount: 10,
  },
  {
    id: '23',
    status: 'pending',
    email: 'email+1@gmail.com',
    amount: 10,
  },
  {
    id: '24',
    status: 'pending',
    email: 'email+1@gmail.com',
    amount: 10,
  },
  {
    id: '25',
    status: 'pending',
    email: 'email+1@gmail.com',
    amount: 10,
  },
  {
    id: '26',
    status: 'pending',
    email: 'email+1@gmail.com',
    amount: 10,
  },
];
const DataTableExample = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Payment>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="text-n translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
    },
    {
      id: 'actions',
      cell: () => {
        return <Button title="Edit" size="sm" />;
      },
    },
  ];
  return (
    <div className="bg-neutral-white h-full p-6">
      <StoryBookNextIntlProvider>
        <DataTable
          dataTableProps={{
            data,
            columns,
            state: {
              sorting,
              columnVisibility,
              rowSelection,
              columnFilters,
            },
            enableRowSelection: true,
            onRowSelectionChange: setRowSelection,
            onSortingChange: setSorting,
            onColumnFiltersChange: setColumnFilters,
            onColumnVisibilityChange: setColumnVisibility,
          }}
          dataTableVisibleProps={{ title: 'View' }}
        />
      </StoryBookNextIntlProvider>
    </div>
  );
};

export default DataTableExample;
