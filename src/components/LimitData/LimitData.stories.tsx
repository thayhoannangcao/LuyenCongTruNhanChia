import type { Meta, StoryObj } from '@storybook/react';
import StoryBookNextIntlProvider from '../common/StoryBookNextIntlProvider';
import LimitData from './LimitData';

const meta: Meta<typeof LimitData> = {
  title: 'Common/LimitData',
  component: LimitData,
};

export default meta;
type Story = StoryObj<typeof LimitData>;

export const Default: Story = {
  render() {
    return (
      <StoryBookNextIntlProvider>
        <LimitData
          content="Business Description: Our company is a general construction company celebrating its 128th anniversary. Business Description: Our company is a general construction company celebrating its 128th anniversary. Business Description: Our company is a general construction company celebrating its 128th anniversary. Business Description: Our company is a general construction company celebrating its 128th anniversary."
          limit={70}
          className="w-[500px]"
        />
      </StoryBookNextIntlProvider>
    );
  },
};
