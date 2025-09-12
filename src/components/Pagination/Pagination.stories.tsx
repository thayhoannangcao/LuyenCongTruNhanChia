import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { useState } from 'react';
import StoryBookNextIntlProvider from '../common/StoryBookNextIntlProvider';

export default {
  title: 'Common/Pagination',
  component: Pagination,
} as Meta<typeof Pagination>;

export const PaginationCommon: StoryObj<typeof Pagination> = {
  render() {
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    return (
      <div className="bg-neutral-white flex h-24 justify-center p-6">
        <StoryBookNextIntlProvider>
          <Pagination
            pageSize={pageSize}
            pageIndex={pageIndex}
            setPageSize={setPageSize}
            setPageIndex={setPageIndex}
            total={40}
          />
        </StoryBookNextIntlProvider>
      </div>
    );
  },
};
