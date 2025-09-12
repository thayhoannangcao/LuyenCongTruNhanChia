import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import clsx from 'clsx';
import type { ReactNode } from 'react';

interface DropDownStateProps {
  trigger: ReactNode;
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  children?: ReactNode;
  align?: 'start' | 'center' | 'end';
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const DropDownState = ({
  trigger,
  className,
  side = 'bottom',
  children,
  align,
  isOpen,
  setIsOpen,
}: DropDownStateProps) => {
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className="[&[data-state=open]]:bg-transparent"
        asChild
      >
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align ?? 'start'}
        side={side}
        className={clsx('w-full border-none px-[10px] py-3', className)}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownState;
