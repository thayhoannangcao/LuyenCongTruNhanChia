import type { Meta, StoryObj } from '@storybook/react';
import StoryBookNextIntlProvider from '../common/StoryBookNextIntlProvider';
import DataTableExample from './DataTableExample';
import { DataTable } from './DataTable';

export default {
  title: 'Common/DataTable',
  component: DataTable,
} as Meta<typeof DataTable>;

export const DataTableCommon: StoryObj<typeof DataTable> = {
  render() {
    return (
      <StoryBookNextIntlProvider>
        <DataTableExample />
      </StoryBookNextIntlProvider>
    );
  },
};
