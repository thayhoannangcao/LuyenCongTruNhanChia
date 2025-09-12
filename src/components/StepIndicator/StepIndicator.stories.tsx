import type { Meta, StoryObj } from '@storybook/react';
import StepIndicator from '../StepIndicator/StepIndicator';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

const messages = {
  auth: {
    register: {
      startRegistration: 'Start Registration',
      verifyAccount: 'Verify Account',
      enterInformation: 'Enter Information',
    },
  },
};

const StoryBookNextIntlProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <NextIntlClientProvider messages={messages} locale="en">
    {children}
  </NextIntlClientProvider>
);

const withIntl = (Story: React.FC) => (
  <StoryBookNextIntlProvider>
    <Story />
  </StoryBookNextIntlProvider>
);

const meta: Meta<typeof StepIndicator> = {
  title: 'Components/StepIndicator',
  component: StepIndicator,
  decorators: [withIntl],
};

export default meta;
type Story = StoryObj<typeof StepIndicator>;

export const Step1: Story = {
  args: {
    currentStep: 1,
  },
  name: 'Step 1 Active',
};

export const Step2: Story = {
  args: {
    currentStep: 2,
  },
  name: 'Step 2 Active',
};

export const Step3: Story = {
  args: {
    currentStep: 3,
  },
  name: 'Step 3 Active',
};

export const AllCompleted: Story = {
  args: {
    currentStep: 4,
  },
  name: 'All Steps Completed',
};

export const Usage = () => {
  return (
    <StoryBookNextIntlProvider>
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="mb-2 text-lg font-semibold">Step 1 Active</h3>
          <StepIndicator currentStep={1} />
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">Step 2 Active</h3>
          <StepIndicator currentStep={2} />
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">Step 3 Active</h3>
          <StepIndicator currentStep={3} />
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">All Steps Completed</h3>
          <StepIndicator currentStep={4} />
        </div>
      </div>
    </StoryBookNextIntlProvider>
  );
};
