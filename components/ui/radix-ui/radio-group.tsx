import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { cn } from '@/src/utils/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, orientation, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        'gap-2',
        orientation === 'horizontal' && 'flex flex-wrap',
        orientation === 'vertical' && 'flex flex-col',
        className
      )}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, disabled, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'border-secondary text-primary peer aspect-square h-4 w-4 overflow-hidden rounded-full border border-opacity-[0.23]',
        'focus-visible:border-primary focus-visible:shadow-custom-primary focus-visible:outline-none',
        'hover:border-primary hover:bg-primary hover:bg-opacity-[0.08]',
        'disabled:border-secondary disabled:bg-secondary disabled:cursor-not-allowed disabled:border-opacity-[0.12] disabled:bg-opacity-[0.04]',
        'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:bg-opacity-[0.08]',
        'data-[state=checked]:disabled:border-secondary data-[state=checked]:disabled:bg-secondary data-[state=checked]:disabled:border-opacity-[0.12] data-[state=checked]:disabled:bg-opacity-[0.04]',
        className
      )}
      disabled={disabled}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex h-full w-full items-center justify-center">
        <div
          className={cn(
            'bg-primary h-2 w-2 rounded-full',
            disabled && 'bg-secondary bg-opacity-[0.12]'
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
