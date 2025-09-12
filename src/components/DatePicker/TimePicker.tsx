'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import clsx from 'clsx';
import type { Matcher } from 'react-day-picker';

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
  disabledDate?: Matcher | Matcher[];
}

export function TimePicker({
  date,
  setDate,
  className,
  disabledDate,
}: TimePickerProps) {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const timeSlots = React.useMemo(() => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        slots.push({
          hour,
          minute,
          formatted: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        });
      }
    }
    return slots;
  }, []);

  const selectedTime = React.useMemo(() => {
    if (!date) return null;
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
    };
  }, [date]);

  const handleTimeChange = (hour: number, minute: number) => {
    const newDate = new Date(date || new Date());
    newDate.setHours(hour);
    newDate.setMinutes(minute);
    newDate.setSeconds(0);
    setDate(newDate);
  };

  React.useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const viewport = scrollArea.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (!viewport) return;
      viewport.scrollTop += event.deltaY;
    };

    scrollArea.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      scrollArea.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Custom matcher function to replace deprecated isMatch
  const isDisabled = React.useCallback(
    (slotDate: Date): boolean => {
      if (!disabledDate) return false;

      const checkMatcher = (matcher: Matcher, testDate: Date): boolean => {
        // Boolean
        if (typeof matcher === 'boolean') {
          return matcher;
        }

        // Function
        if (typeof matcher === 'function') {
          return matcher(testDate);
        }

        // Date
        if (matcher instanceof Date) {
          return testDate.toDateString() === matcher.toDateString();
        }

        // Array of dates
        if (Array.isArray(matcher)) {
          return matcher.some((m) => checkMatcher(m, testDate));
        }

        // DateRange
        if (matcher && typeof matcher === 'object' && 'from' in matcher) {
          const { from, to } = matcher as { from?: Date; to?: Date };
          if (from && to) {
            return testDate >= from && testDate <= to;
          }
          if (from) {
            return testDate >= from;
          }
          if (to) {
            return testDate <= to;
          }
        }

        // DateBefore
        if (matcher && typeof matcher === 'object' && 'before' in matcher) {
          const { before } = matcher as { before: Date };
          return testDate < before;
        }

        // DateAfter
        if (matcher && typeof matcher === 'object' && 'after' in matcher) {
          const { after } = matcher as { after: Date };
          return testDate > after;
        }

        // DateInterval
        if (
          matcher &&
          typeof matcher === 'object' &&
          'before' in matcher &&
          'after' in matcher
        ) {
          const { before, after } = matcher as { before: Date; after: Date };
          return testDate > after && testDate < before;
        }

        // DayOfWeek
        if (matcher && typeof matcher === 'object' && 'dayOfWeek' in matcher) {
          const { dayOfWeek } = matcher as { dayOfWeek: number[] };
          return dayOfWeek.includes(testDate.getDay());
        }

        return false;
      };

      // Handle single matcher or array of matchers
      if (Array.isArray(disabledDate)) {
        return disabledDate.some((matcher) => checkMatcher(matcher, slotDate));
      } else {
        return checkMatcher(disabledDate, slotDate);
      }
    },
    [disabledDate]
  );

  return (
    <div>
      <div className="p-4 text-center text-sm">時間選択</div>
      <ScrollArea
        ref={scrollAreaRef}
        className={clsx('h-60 min-w-[120px] px-4', className)}
      >
        <div className="flex flex-col gap-1 pb-2">
          {timeSlots.map((slot, index) => {
            const isSelected =
              selectedTime &&
              selectedTime.hour === slot.hour &&
              selectedTime.minute === slot.minute;

            // Build a date for this slot
            const slotDate = new Date(
              date?.getFullYear() ?? new Date().getFullYear(),
              date?.getMonth() ?? new Date().getMonth(),
              date?.getDate() ?? new Date().getDate(),
              slot.hour,
              slot.minute
            );

            const disabled = isDisabled(slotDate);
            const displayTime = `${slot.hour}:${slot.minute.toString().padStart(2, '0')}`;

            return (
              <Button
                key={index}
                className={clsx(
                  'h-8 justify-center rounded-md text-sm',
                  isSelected
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 font-normal aria-selected:opacity-100'
                )}
                variant={isSelected ? 'default' : 'ghost'}
                onClick={() => handleTimeChange(slot.hour, slot.minute)}
                disabled={disabled}
              >
                {displayTime}
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
