import type { Meta, StoryObj } from '@storybook/react';
import CardInfo from './CardInfo';

export default {
  title: 'Common/CardInfo',
  component: CardInfo,
} as Meta<typeof CardInfo>;

export const Default: StoryObj<typeof CardInfo> = {
  render() {
    return (
      <div>
        <CardInfo title="Card Notification Title">
          This is a description
        </CardInfo>
      </div>
    );
  },
};
