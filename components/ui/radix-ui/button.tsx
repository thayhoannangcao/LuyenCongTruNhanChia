import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'leading-none box-border inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary-light',
        main: 'bg-primary text-white shadow hover:bg-primary-light',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'bg-white text-primary border border-primary shadow-none rounded-md hover:opacity-80',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'shadow-none text-text-primary hover:bg-secondary-default-hover',
        link: 'text-primary underline-offset-4 hover:underline',
        inherit:
          'bg-secondary-default text-text-primary hover:bg-secondary-default-hover focus:bg-secondary-default-hover',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-7 px-[10px] py-0.5 text-[13px] [&_svg]:size-4',
        md: 'h-8 rounded-md px-3 text-sm font-medium [&_svg]:size-5',
        lg: 'h-10 px-[26px] px-6 text-[15px] [&_svg]:size-6',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
