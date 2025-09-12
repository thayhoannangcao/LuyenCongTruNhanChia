import { Popover } from '@radix-ui/react-popover';
import clsx from 'clsx';
import { CalendarDays as CalendarIcon } from 'lucide-react';
import { type ReactNode } from 'react';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { InputSize } from '@/src/types/app';
import FormLabel from '../common/FormLabel';
import type { CalendarProps } from './calendar';
import { Calendar } from './calendar';
import { TimePicker } from './TimePicker';
import type { DateRange, Matcher } from 'react-day-picker';
import {
  FORMAT_DATE,
  FORMAT_DATE_TIME,
  FORMAT_TIME,
} from '@/src/constants/dateFormat.constants';
import dayjs from 'dayjs';

export interface IDatePickerProps {
  inputSize?: InputSize;
  className?: string;
  label?: string | ReactNode;
  required?: boolean;
  error?: string;
  placeholder?: string | ReactNode;
  datePickerProps?: CalendarProps;
  showTime?: boolean;
  disabledDate?: Matcher | Matcher[];
  dateRangePickerProps?: {
    selected?: DateRange;
    onSelect?: (range: DateRange | undefined) => void;
  };
  type?: 'date' | 'time';
  styleType?: 'default' | 'outline';
}
const formatDate = (date?: Date | string, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};
const DatePicker = ({
  inputSize = 'lg',
  className,
  label,
  required,
  error,
  placeholder = 'YYYY-MM-DD HH:mm',
  showTime,
  datePickerProps,
  dateRangePickerProps,
  disabledDate,
  type = 'date',
  styleType = 'default',
}: IDatePickerProps) => {
  const { selected, onSelect } = dateRangePickerProps || {};

  const getTitle = () => {
    if (datePickerProps?.mode === 'single') {
      if (datePickerProps?.selected) {
        const format =
          type === 'time'
            ? FORMAT_TIME
            : showTime
              ? FORMAT_DATE_TIME
              : FORMAT_DATE;
        return formatDate(datePickerProps?.selected, format);
      } else {
        return (
          <span className="font-normal text-text-disabled">{placeholder}</span>
        );
      }
    }
    if (selected?.from) {
      if (selected.to) {
        return (
          <>
            {formatDate(selected.from)} ~ {formatDate(selected.to)}
          </>
        );
      } else {
        return formatDate(selected.from);
      }
    }
    return (
      <span className="font-normal text-text-disabled">{placeholder}</span>
    );
  };

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) {
      datePickerProps?.onSelect?.(date);
      return;
    }
    const now = new Date();
    const isToday =
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate();

    if (isToday) {
      // Round up to the next 15-minute step
      const minutes = now.getMinutes();
      const roundedMinutes = Math.ceil(minutes / 15) * 15;
      let hour = now.getHours();
      let minute = roundedMinutes;
      if (minute === 60) {
        hour += 1;
        minute = 0;
      }
      const withTime = new Date(date);
      withTime.setHours(hour, minute, 0, 0);
      datePickerProps?.onSelect?.(withTime);
    } else {
      // Set to 00:00 for other days
      const withTime = new Date(date);
      withTime.setHours(0, 0, 0, 0);
      datePickerProps?.onSelect?.(withTime);
    }
  };

  return (
    <div className={clsx('w-full', type === 'time' && 'w-fit min-w-[160px]')}>
      {!!label && (
        <div className="mb-2">
          <FormLabel label={label} required={required} />
        </div>
      )}

      <Popover>
        <PopoverTrigger
          className="w-full"
          disabled={!!datePickerProps?.disabled}
        >
          <div
            className={clsx(
              'flex w-full items-center rounded-lg bg-action-hover !p-0 !px-4 text-left !font-normal shadow-sm',
              inputSize === 'sm' && 'h-8 px-[13px] py-1 text-[13px]',
              inputSize === 'md' && 'h-9 px-[22px] py-[6px] text-sm',
              inputSize === 'lg' && 'h-[42px] px-[26px] py-2 text-[15px]',
              !datePickerProps?.selected && 'text-muted-foreground',
              !!datePickerProps?.disabled && 'cursor-default opacity-70',
              error && '!border-error-main border !outline-none',
              styleType === 'outline' &&
                'border border-outline-border bg-white hover:bg-other focus:border focus:border-action-active focus:bg-white',
              styleType === 'default' &&
                'border border-other bg-other hover:border-action-active focus:border focus:border-action-active',
              className
            )}
          >
            <div className="flex w-full flex-row-reverse items-center justify-between gap-2">
              <CalendarIcon className="h-4 w-4 text-text-disabled" />
              {getTitle()}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="!border-neutral-dark flex w-auto !rounded-lg bg-white p-0">
          {type == 'date' && 'single' && (
            <Calendar
              {...datePickerProps}
              initialFocus
              disabled={disabledDate}
              onSelect={handleSelectDate}
              className={clsx(
                'border-neutral-gray-light rounded-lg bg-white',
                className
              )}
            />
          )}
          {type == 'date' &&
            datePickerProps?.mode === 'range' &&
            dateRangePickerProps && (
              <Calendar
                {...datePickerProps}
                initialFocus
                defaultMonth={selected?.from}
                selected={selected}
                onSelect={onSelect}
                disabled={disabledDate}
                className={clsx(
                  'border-neutral-gray-light rounded-lg',
                  className
                )}
              />
            )}
          {(type === 'time' || showTime) &&
            datePickerProps?.mode === 'single' && (
              <TimePicker
                date={datePickerProps.selected as Date}
                setDate={
                  datePickerProps.onSelect as (date: Date | undefined) => void
                }
                disabledDate={disabledDate}
                className={clsx(type === 'time' && 'w-[160px]')}
              />
            )}
        </PopoverContent>
      </Popover>
      {error && (
        <div className="mt-2 text-xs font-normal text-error">{error}</div>
      )}
    </div>
  );
};

export default DatePicker;
