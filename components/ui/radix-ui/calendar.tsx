import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ja } from 'date-fns/locale';

// Set dayjs plugin
dayjs.extend(utc);
dayjs.extend(timezone);

// Set default timezone

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      captionLayout="dropdown"
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'relative',
        dropdowns: 'font-medium mb-4',
        months_dropdown: 'text-right [&>option]:text-xs bg-white',
        years_dropdown: '[&>option]:text-xs bg-white',
        month_caption: 'text-left',
        caption_label: 'hidden',
        nav: 'absolute top-1 right-0 flex items-center',
        chevron: 'w-4 h-4',
        head_cell:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        weekday: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full font-medium'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal rounded-full'
        ),
        day_button: 'h-9 w-9 p-0 font-normal rounded-full',
        selected: cn(
          'bg-primary hover:!bg-primary-light !text-white h-9 w-9 p-0 font-normal rounded-full'
        ),
        range_start: 'day-range-start',
        range_end: 'day-range-end',
        today:
          'bg-accent text-accent-foreground rounded-full transition-colors',
        outside: 'aria-selected:text-white opacity-50 transition-opacity',
        range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground transition-colors',
        hidden: 'invisible',
        disabled: '!opacity-50 hover:!bg-transparent',

        ...classNames,
      }}
      locale={ja}
      today={dayjs().toDate()}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
