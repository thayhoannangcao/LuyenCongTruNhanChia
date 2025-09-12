import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  Dialog as DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

type size = 'sm' | 'md' | 'lg' | 'xl';

interface IDialogCommonProps {
  title?: string | ReactNode;
  trigger?: ReactNode;
  description?: string | ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  isOpen?: boolean;
  preventOutside?: boolean;
  size?: size;
  onClose?: () => void;
  className?: string;
  customClassNameContent?: string;
  sidebarDialog?: ReactNode;
}

const Dialog = ({
  title,
  description,
  trigger,
  children,
  footer,
  isOpen,
  onClose,
  size = 'md',
  className,
  preventOutside,
  sidebarDialog,
  customClassNameContent,
}: IDialogCommonProps) => {
  return (
    <DialogRoot open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={clsx(
          'max-h-[90vh]',
          size === 'sm' && 'w-[300px]',
          size === 'md' && 'w-[600px]',
          size === 'lg' && 'w-[700px]',
          size === 'xl' && 'w-[870px]',
          className
        )}
        onInteractOutside={(e) => {
          if (preventOutside) {
            e.preventDefault();
          }
        }}
      >
        <div className={clsx('flex w-full max-w-full', customClassNameContent)}>
          {sidebarDialog && (
            <div className="-mb-[25px] -ml-[25px] -mt-[25px] pr-6">
              {sidebarDialog}
            </div>
          )}
          <div className="h-full w-full flex-1 space-y-6">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <DialogTitle
                  className={clsx(
                    'text-text-primary',
                    size === 'sm' && 'text-base font-normal',
                    size === 'md' && 'text-xl font-bold',
                    size === 'lg' && 'text-2xl font-bold',
                    size === 'xl' && 'text-[28px] font-semibold'
                  )}
                >
                  {title}
                </DialogTitle>
                <DialogClose className="rounded-sm ring-offset-background transition-opacity focus:outline-none focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                  <Cross2Icon
                    className={clsx(
                      'text-text-primary',
                      size === 'xl' && 'h-6 w-6',
                      size === 'lg' && 'h-5 w-5',
                      size === 'md' && 'h-6 w-6',
                      size === 'sm' && 'h-4 w-4'
                    )}
                  />
                </DialogClose>
              </div>
              <DialogDescription hidden={!description}>
                {description}
              </DialogDescription>
            </DialogHeader>
            {children}
            {!!footer && <DialogFooter>{footer}</DialogFooter>}
          </div>
        </div>
      </DialogContent>
    </DialogRoot>
  );
};

export default Dialog;
