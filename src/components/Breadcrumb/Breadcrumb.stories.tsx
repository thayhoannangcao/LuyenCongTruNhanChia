import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Common/Breadcrumb',
  component: Breadcrumb,
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const items = [{ href: '/home', label: 'Home' }, { label: 'Search' }];

export const BreadcrumbDefault: Story = {
  render: () => (
    <div className="ml-2">
      <Breadcrumb items={items} />
    </div>
  ),
};
