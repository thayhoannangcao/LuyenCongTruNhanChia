import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/radix-ui/dropdown-menu';
import clsx from 'clsx';
import type { ReactNode } from 'react';

interface DropDownMenuEmptyProps {
  trigger: ReactNode;
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'end' | 'center';
  children?: ReactNode;
}

const DropDownMenuEmpty = ({
  trigger,
  className,
  side = 'bottom',
  align = 'start',
  children,
}: DropDownMenuEmptyProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        className={clsx('w-full border-none px-[10px] py-3', className)}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenuEmpty;
