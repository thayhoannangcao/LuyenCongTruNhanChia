import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Badge from './Badge';
import { Mail } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'Common/Badge',
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const BadgeDefault: Story = {
  render: () => (
    <div className="ml-2">
      <Badge icon={<Mail />} label="999" className="ml-2" />
    </div>
  ),
};

export const BadgePrimary: Story = {
  render: () => (
    <div className="ml-2">
      <Badge icon={<Mail />} label="999" className="ml-2" color="primary" />
    </div>
  ),
};

export const BadgeIconStandard: Story = {
  render: () => (
    <div className="ml-2">
      <Badge icon={<Mail />} label="999" className="ml-2" color="primary" />
    </div>
  ),
};

export const BadgeIconDot: Story = {
  render: () => (
    <div className="ml-2">
      <Badge icon={<Mail />} label="" className="ml-2" color="primary" />
    </div>
  ),
};
