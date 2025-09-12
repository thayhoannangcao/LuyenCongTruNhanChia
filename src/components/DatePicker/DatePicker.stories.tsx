import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import type { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import DatePicker from './DatePicker';
import StoryBookNextIntlProvider from '../common/StoryBookNextIntlProvider';

export default {
  title: 'Common/DatePicker',
  component: DatePicker,
} as Meta<typeof DatePicker>;

type Story = StoryObj<typeof DatePicker>;

const DatePickerLargeComponent = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const handleSelect = (selectedDate: Date | Date[] | undefined) => {
    if (!Array.isArray(selectedDate)) {
      setDate(selectedDate);
    }
  };

  return (
    <div className="bg-neutral-white h-[300px] p-6">
      <DatePicker
        label="Label"
        datePickerProps={{
          selected: date,
          onSelect: handleSelect,
          mode: 'single',
        }}
      />
    </div>
  );
};

const DatePickerMediumComponent = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const handleSelect = (selectedDate: Date | Date[] | undefined) => {
    if (!Array.isArray(selectedDate)) {
      setDate(selectedDate);
    }
  };

  return (
    <div className="bg-neutral-white h-[300px] p-6">
      <DatePicker
        label="Label"
        datePickerProps={{
          selected: date,
          onSelect: handleSelect,
          mode: 'single',
        }}
        inputSize="md"
      />
    </div>
  );
};

const DatePickerSmallComponent = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const handleSelect = (selectedDate: Date | Date[] | undefined) => {
    if (!Array.isArray(selectedDate)) {
      setDate(selectedDate);
    }
  };

  return (
    <div className="bg-neutral-white h-[300px] p-6">
      <DatePicker
        label="Label"
        datePickerProps={{
          selected: date,
          onSelect: handleSelect,
          mode: 'single',
        }}
        inputSize="sm"
      />
    </div>
  );
};

const DateTimePickerComponent = () => {
  const [date, setDate] = React.useState<Date | (Date & Date[]) | undefined>(
    undefined
  );

  const handleSelect = (selectedDate: Date | Date[] | undefined) => {
    if (!Array.isArray(selectedDate)) {
      setDate(selectedDate);
    }
  };

  return (
    <div className="bg-neutral-white h-[500px] p-6">
      <StoryBookNextIntlProvider>
        <DatePicker
          label="Label"
          datePickerProps={{
            selected: date,
            onSelect: handleSelect,
            mode: 'single',
          }}
          showTime
        />
      </StoryBookNextIntlProvider>
    </div>
  );
};

const DateDisablePickerComponent = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const handleSelect = (selectedDate: Date | Date[] | undefined) => {
    if (!Array.isArray(selectedDate)) {
      setDate(selectedDate);
    }
  };

  return (
    <div className="bg-neutral-white h-[300px] p-6">
      <DatePicker
        label="Label"
        datePickerProps={{
          selected: date,
          onSelect: handleSelect,
          mode: 'single',
        }}
        disabledDate={{ before: new Date() }}
      />
    </div>
  );
};

const DateRangePickerComponent = () => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const handleRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  return (
    <div className="h-[300px] p-6">
      <DatePicker
        label="Label"
        datePickerProps={{
          mode: 'range',
        }}
        dateRangePickerProps={{
          selected: dateRange,
          onSelect: handleRangeSelect,
        }}
      />
    </div>
  );
};

export const DatePickerLarge: Story = {
  render: () => <DatePickerLargeComponent />,
};

export const DatePickerMedium: Story = {
  render: () => <DatePickerMediumComponent />,
};

export const DatePickerSmall: Story = {
  render: () => <DatePickerSmallComponent />,
};

export const DateTimePicker: Story = {
  render: () => <DateTimePickerComponent />,
};

export const DateDisablePicker: Story = {
  render: () => <DateDisablePickerComponent />,
};

export const DateRangePicker: Story = {
  render: () => <DateRangePickerComponent />,
};
