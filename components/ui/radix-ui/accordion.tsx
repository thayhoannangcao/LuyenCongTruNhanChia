import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown, CircleHelp, X } from 'lucide-react';
import * as React from 'react';
import { IoCaretDownOutline } from 'react-icons/io5';
import { cn } from '@/src/utils/utils';

export type RoleAccordionType =
  | 'section'
  | 'item'
  | 'radio-content'
  | 'default'
  | 'menu-bar'
  | 'label'
  | 'card';

export type ArrowIconAccordionType = 'chevron' | 'caret';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-outline-border rounded-[10px] border', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

interface IAccordionTriggerProps {
  numberOfValue?: number;
  tagHeaderHandleClick?: () => void;
  subContent?: React.ReactNode;
  extraContentTrigger?: React.ReactNode;
  arrowIconType?: ArrowIconAccordionType;
  role?: RoleAccordionType;
}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  IAccordionTriggerProps &
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(
  (
    {
      className,
      children,
      role,
      numberOfValue,
      tagHeaderHandleClick,
      subContent,
      extraContentTrigger,
      arrowIconType = 'caret',
      ...props
    },
    ref
  ) => (
    <AccordionPrimitive.Header
      className={cn(
        'flex flex-col [&[data-state=open]>div]:hidden',
        role === 'item' && '[&[data-state=open]]:bg-action-hover',
        role === 'default' && 'p-6',
        role === 'card' && 'px-6 pt-6',
        role === 'section' && 'p-3',
        role === 'menu-bar' && '!py-1.5 px-3',
        className
      )}
    >
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'text-text-primary [&[data-state=open]]:text-primary flex flex-1 items-center justify-between outline-none transition-all [&[data-state=open]>div:nth-of-type(2)>svg]:rotate-180',
          role === 'section' &&
            '[&[data-state=open]>div:nth-of-type(2)>svg]:text-primary flex-row-reverse justify-end gap-2',
          role === 'label' && '[&[data-state=open]]:text-text-primary',
          role === 'item' &&
            '[&[data-state=open]>div:nth-of-type(2)>svg]:text-primary',
          (role === 'default' || role === 'menu-bar' || role === 'card') &&
            '[&[data-state=open]]:text-text-primary',
          role === 'menu-bar' && 'rounded-lg',
          role !== 'section' &&
            role !== 'default' &&
            role !== 'label' &&
            role !== 'card' &&
            'hover:bg-action-hover p-3'
        )}
        {...props}
      >
        <div
          className={cn(
            'flex w-[calc(100%-75px)] items-center gap-1 text-base font-medium leading-[28px]',
            (role === 'default' || role === 'menu-bar' || role === 'card') &&
              'text-text-primary text-[20px] font-bold',
            role === 'menu-bar' && 'text-base font-normal',
            className
          )}
        >
          {children}
          {/* <CircleHelp
            className={cn(
              'h-5 w-5 text-text-disabled',
              (role === 'section' ||
                role === 'radio-content' ||
                role === 'default' ||
                role === 'menu-bar') &&
                'hidden'
            )}
          /> */}
        </div>
        <div className="flex items-center gap-2">
          {!!numberOfValue && (
            <div className="border-outline-border text-text-primary flex items-center gap-1 rounded-lg border px-2 text-sm">
              <span className="flex-1">{numberOfValue}</span>
              <span
                className="cursor-pointer text-[10px] transition-opacity hover:opacity-50"
                onClick={(e) => {
                  e.stopPropagation();
                  tagHeaderHandleClick && tagHeaderHandleClick();
                }}
              >
                <X className="h-3 w-3" />
              </span>
            </div>
          )}
          {extraContentTrigger && (
            <div onClick={(e) => e.stopPropagation()}>
              {extraContentTrigger}
            </div>
          )}
          {arrowIconType === 'caret' && (
            <IoCaretDownOutline
              className={cn(
                'text-text-disabled h-4 w-4 transition-transform duration-200',
                role === 'radio-content' && 'hidden',
                (role === 'default' ||
                  role === 'menu-bar' ||
                  role === 'card') &&
                  'text-text-primary'
              )}
            />
          )}
          {arrowIconType === 'chevron' && (
            <ChevronDown
              className={cn(
                'text-text-disabled h-4 w-4 transition-transform duration-200',
                role === 'radio-content' && 'hidden',
                (role === 'default' ||
                  role === 'menu-bar' ||
                  role === 'card') &&
                  'text-text-primary'
              )}
            />
          )}
        </div>
      </AccordionPrimitive.Trigger>
      <div className={cn(role === 'item' && !!numberOfValue && 'px-3 pb-3')}>
        {subContent}
      </div>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
    {...props}
  >
    <div className={className}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
