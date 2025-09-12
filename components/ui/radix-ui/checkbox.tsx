import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import * as React from 'react';

import { cn } from '~/lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, checked, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-5 w-5 shrink-0 overflow-hidden rounded-[6px] border border-secondary border-opacity-[0.23] text-white',
      'focus-visible:border-primary focus-visible:shadow-custom-primary focus-visible:outline-none',
      'hover:border-primary hover:bg-primary hover:bg-opacity-[0.08]',
      'disabled:cursor-not-allowed disabled:border-secondary disabled:border-opacity-[0.12] disabled:bg-secondary disabled:bg-opacity-[0.04]',
      'data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:bg-opacity-[0.08] data-[state=indeterminate]:text-primary',
      'data-[state=indeterminate]:hover:border-primary-light data-[state=indeterminate]:hover:bg-primary-light data-[state=indeterminate]:hover:text-white',
      'data-[state=indeterminate]:disabled:border-secondary data-[state=indeterminate]:disabled:border-opacity-[0.12] data-[state=indeterminate]:disabled:bg-secondary data-[state=indeterminate]:disabled:bg-opacity-[0.04] data-[state=indeterminate]:disabled:text-secondary data-[state=indeterminate]:disabled:text-opacity-[0.12]',
      'data-[state=checked]:border-primary data-[state=checked]:border-opacity-[0.12] data-[state=checked]:bg-primary',
      'data-[state=checked]:hover:border-primary-light data-[state=checked]:hover:bg-primary-light',
      'data-[state=checked]:disabled:border-secondary data-[state=checked]:disabled:border-opacity-[0.12] data-[state=checked]:disabled:bg-secondary data-[state=checked]:disabled:bg-opacity-[0.04] data-[state=checked]:disabled:text-secondary data-[state=checked]:disabled:text-opacity-[0.12]',
      className
    )}
    checked={checked}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        'text-current flex h-full w-full items-center justify-center'
      )}
    >
      {checked === 'indeterminate' ? <Minus /> : <Check />}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
