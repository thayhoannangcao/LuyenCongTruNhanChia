import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Tag from './Tag';
import { X, User } from 'lucide-react';

const meta: Meta<typeof Tag> = {
  title: 'Common/Tag',
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const TagMainDefault: Story = {
  render: (args) => (
    <>
      <Tag {...args} className="ml-2" label="Chip" />
    </>
  ),
};

export const TagMainActive: Story = {
  render: (args) => (
    <>
      <Tag
        {...args}
        className="ml-2"
        label="Chip"
        variant="main"
        active={true}
      />
    </>
  ),
};

export const TagOutlineDefault: Story = {
  render: (args) => (
    <>
      <Tag {...args} className="ml-2" label="Chip" variant="outline" />
    </>
  ),
};

export const TagOutlineActive: Story = {
  render: (args) => (
    <>
      <Tag
        {...args}
        className="ml-2"
        label="Chip"
        variant="outline"
        active={true}
      />
    </>
  ),
};

export const TagSmall: Story = {
  render: (args) => (
    <>
      <Tag
        {...args}
        className="ml-2"
        label="Chip"
        variant="outline"
        active={true}
        size="sm"
      />
    </>
  ),
};

export const TagMedium: Story = {
  render: (args) => (
    <>
      <Tag
        {...args}
        className="ml-2"
        label="Chip"
        variant="outline"
        active={true}
      />
    </>
  ),
};

export const TagIcon: Story = {
  render: (args) => (
    <>
      <Tag
        {...args}
        className="ml-2"
        label="Chip"
        icon={<X className="h-full w-full text-text-secondary" />}
      />
    </>
  ),
};

export const TagAvatar: Story = {
  render: (args) => (
    <>
      <Tag
        {...args}
        className="ml-2"
        label={
          <span className="inline-flex items-center justify-center">
            <User className="mr-1 h-[16px] w-[16px]" />
            Chip
          </span>
        }
      />
    </>
  ),
};

export const TagClickable: Story = {
  render: (args) => (
    <>
      <Tag
        {...args}
        className="ml-2"
        label="Chip"
        icon={<X className="h-full w-full" />}
        onRemove={() => alert('Removed')}
      />
    </>
  ),
};
