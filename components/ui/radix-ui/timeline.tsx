import * as React from 'react';
import { cn } from '@/lib/utils';
import clsx from 'clsx';

interface TimelineItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  horizontal?: boolean;
}

const Timeline = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol ref={ref} className={cn('flex w-full flex-col', className)} {...props} />
));
Timeline.displayName = 'Timeline';

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn('relative flex w-6 flex-col px-6', className)}
      {...props}
    />
  )
);
TimelineItem.displayName = 'TimelineItem';

const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean;
    classNameConnector?: string;
  }
>(({ classNameConnector, active, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'absolute left-[40px] top-7 flex h-[calc(100%-32px)] w-[3px] flex-grow rounded-[20px] bg-body-background',
      active && 'bg-primary',
      classNameConnector
    )}
    {...props}
  />
));
TimelineConnector.displayName = 'TimelineConnector';

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('item-center flex w-full gap-2', className)}
    {...props}
  />
));
TimelineContent.displayName = 'TimelineContent';

const TimelineSubContent = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { disabled?: boolean }
>(({ children, disabled, ...props }, ref) => (
  <h3
    ref={ref}
    className={clsx('flex-1 font-medium', disabled && 'text-text-disabled')}
    {...props}
  >
    {children}
  </h3>
));
TimelineSubContent.displayName = 'CardContent';

const TimelineIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean;
    disabled?: boolean;
    classNameIcon?: string;
  }
>(({ classNameIcon, active, disabled, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center rounded-full text-text-secondary',
      active && 'text-primary',
      disabled && 'text-text-disabled',
      classNameIcon
    )}
    {...props}
  />
));
TimelineIcon.displayName = 'TimelineIcon';

const TimelineHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex justify-center pb-3 pl-8', className)}
    {...props}
  />
));
TimelineHeader.displayName = 'TimelineHeader';
export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineContent,
  TimelineSubContent,
  TimelineIcon,
  TimelineHeader,
};
