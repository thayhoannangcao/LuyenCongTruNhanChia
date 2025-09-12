import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/radix-ui/dropdown-menu';
import { Skeleton } from '@/components/ui/radix-ui/skeleton';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
interface DropDownMenuItem {
  label: ReactNode;
  value?: string;
  shortcut?: string;
  disabled?: boolean;
  subMenu?: {
    items: { label: string; action?: () => void; icon?: ReactNode }[];
  };
  action?: () => void;
  icon?: ReactNode;
}

interface DropDownMenuProps {
  trigger?: ReactNode;
  label?: ReactNode;
  items?: DropDownMenuItem[];
  className?: string;
  classNameContent?: string;
  classNameTrigger?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  itemPreventDefault?: boolean;
  align?: 'start' | 'end' | 'center';
  alignOffset?: number;
  sideOffset?: number;
  footer?: ReactNode;
  onClose?: () => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  loading?: boolean;
}

const DropDownMenu = ({
  trigger,
  label,
  items,
  className,
  classNameContent,
  classNameTrigger,
  side = 'bottom',
  itemPreventDefault = false,
  align = 'start',
  alignOffset,
  sideOffset,
  footer,
  onClose,
  open,
  setOpen,
  loading = false,
}: DropDownMenuProps) => {
  return (
    <DropdownMenu
      open={open}
      onOpenChange={(open: boolean) => !open && onClose?.()}
    >
      {trigger && (
        <DropdownMenuTrigger
          className={classNameTrigger}
          onClick={() => setOpen?.(true)}
        >
          {trigger}
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className={clsx('w-full border-none px-[10px] py-3', className)}
        onPointerDownOutside={() => {
          setOpen?.(false);
        }}
      >
        {label && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            {/* <DropdownMenuSeparator /> */}
          </>
        )}
        <DropdownMenuGroup>
          {loading ? (
            <Skeleton className="mb-1 h-9 w-full" />
          ) : (
            items?.map((item, index) => (
              <Fragment key={index}>
                {item.subMenu ? (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      {item.icon}
                      {item.label}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {item.subMenu.items.map((subItem) => (
                          <DropdownMenuItem
                            key={subItem.label}
                            onClick={subItem.action}
                          >
                            {subItem.icon && <span>{subItem.icon}</span>}
                            {subItem.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ) : (
                  <DropdownMenuItem
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                      itemPreventDefault && e.preventDefault();
                      e.stopPropagation();
                      item.action?.();
                    }}
                    disabled={item.disabled}
                    className={clsx(
                      'h-9 cursor-pointer gap-[10px]',
                      classNameContent,
                      index === items.length - 1 ? '' : 'mb-1'
                    )}
                  >
                    {item.icon}
                    {item.label}
                    {item.shortcut && (
                      <DropdownMenuShortcut>
                        {item.shortcut}
                      </DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                )}
              </Fragment>
            ))
          )}
        </DropdownMenuGroup>
        {footer && <div className="mt-1">{footer}</div>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenu;
