import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/src/utils/utils';
import type { InputSize } from '~/types/app';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    switchThumbSize?: InputSize;
    loading?: boolean;
  }
>(({ className, switchThumbSize, loading, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input peer inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      loading && 'cursor-wait opacity-50',
      className
    )}
    disabled={loading || props.disabled}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'bg-background pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        switchThumbSize === 'sm' && 'h-4 w-4',
        loading && 'flex items-center justify-center'
      )}
    >
      {loading && (
        <div className="border-primary h-3 w-3 animate-spin rounded-full border-2 border-t-transparent" />
      )}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
