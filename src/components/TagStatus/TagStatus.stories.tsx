import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TagStatus from './TagStatus';

const meta: Meta<typeof TagStatus> = {
  title: 'Common/TagStatus',
  component: TagStatus,
};

export default meta;
type Story = StoryObj<typeof TagStatus>;

export const TagStatusSuccess: Story = {
  render() {
    return <TagStatus label="Chips Status" />;
  },
};

export const TagStatusInfo: Story = {
  render() {
    return <TagStatus status="info" label="Chips Status" />;
  },
};

export const TagStatusWarning: Story = {
  render() {
    return <TagStatus status="warning" label="Chips Status" />;
  },
};

export const TagStatusDanger: Story = {
  render() {
    return <TagStatus status="danger" label="Chips Status" />;
  },
};

export const TagStatusPrimary: Story = {
  render() {
    return <TagStatus status="primary" label="Chips Status" />;
  },
};

export const TagStatusSave: Story = {
  render() {
    return <TagStatus status="save" label="Chips Status" />;
  },
};

export const TagStatusSmall: Story = {
  render() {
    return <TagStatus size="sm" label="Chips Status" />;
  },
};

export const TagStatusMedium: Story = {
  render() {
    return <TagStatus label="Chips Status" />;
  },
};

export const TagStatusIcon: Story = {
  render() {
    return <TagStatus icon={true} label="Chips Status" />;
  },
};

export const TagStatusClickable: Story = {
  render() {
    return (
      <TagStatus
        icon={true}
        label="Chips Status"
        onRemove={() => alert('Removed')}
      />
    );
  },
};
