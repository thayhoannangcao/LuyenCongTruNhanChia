'use client';

import * as React from 'react';
import type { DayPicker } from 'react-day-picker';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  mode?: 'single' | 'multiple' | 'range';
  selected?: Date | Date[];
  onSelect?: (date: Date | Date[] | undefined) => void;
};

export function Calendar({ ...props }) {
  const [date, setDate] = React.useState<Date>();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <div className="border-neutral-200 border-r pr-2 sm:flex">
      <CalendarComponent
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        {...props}
      />
    </div>
  );
}
