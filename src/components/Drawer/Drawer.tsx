import {
  Drawer as DrawerBase,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { type ReactNode } from 'react';

interface DrawerCommonProps {
  trigger?: ReactNode;
  header: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  direction?: 'right' | 'top' | 'bottom' | 'left';
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const Drawer: React.FC<DrawerCommonProps> = ({
  trigger,
  header,
  children,
  footer,
  direction = 'right',
  isOpen,
  onClose,
  className,
}) => {
  return (
    <DrawerBase
      direction={direction}
      open={isOpen}
      onOpenChange={(open) => !open && onClose?.()}
    >
      {trigger && (
        <DrawerTrigger asChild>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex items-center gap-[10px]"
          >
            {trigger}
          </div>
        </DrawerTrigger>
      )}
      <DrawerContent
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          'w-3/5 max-w-[500px] bg-white shadow-md outline-none',
          className
        )}
      >
        <DrawerTitle className="hidden" />
        <DrawerHeader className="flex items-center justify-between border-b p-0 px-6 py-6">
          <div className="flex h-8 items-center gap-3 text-xl font-bold text-text-primary">
            {header}
          </div>
          <X
            className="cursor-pointer text-text-primary"
            size="24"
            onClick={() => {
              onClose?.();
            }}
          />
        </DrawerHeader>
        {children}
        {footer && <DrawerFooter className="px-6">{footer}</DrawerFooter>}
      </DrawerContent>
    </DrawerBase>
  );
};

export default Drawer;
