import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search } from 'lucide-react';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { IoCaretDownOutline } from 'react-icons/io5';
import TextInput from '../TextInput';
import TruncateText from '../TruncateText';
import clsx from 'clsx';

interface DropDownMenuItem {
  label: ReactNode;
  value?: string;
  labelDisplay?: string;
  disabled?: boolean;
  action?: () => void;
}

interface DropDownMenuProps {
  trigger?: ReactNode;
  label?: ReactNode;
  items: DropDownMenuItem[];
  footer?: ReactNode;
  showSearch?: boolean;
  placeHolderSearch?: string;
  searchValue?: string;
  onSearchValueChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedValue?: string;
  onSelectedValueChange?: (value: string) => void;
  defaultValue?: string;
  className?: string;
  triggerClassName?: string;
  variant?: 'main' | 'inherit';
  onClose?: () => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  align?: 'start' | 'end' | 'center';
  classNameItem?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

const DropDownMenuSelect = ({
  trigger,
  label,
  items = [],
  footer,
  showSearch = true,
  placeHolderSearch = 'Search...',
  searchValue,
  onSearchValueChange,
  selectedValue,
  onSelectedValueChange,
  defaultValue,
  className,
  triggerClassName,
  variant = 'inherit',
  onClose,
  open,
  setOpen,
  align = 'start',
  classNameItem,
  disabled,
  icon,
}: DropDownMenuProps) => {
  const selectedValueDisplay = items.find(
    (item) => item.value === selectedValue
  )?.labelDisplay;

  return (
    <DropdownMenu open={open} onOpenChange={(open) => !open && onClose?.()}>
      <DropdownMenuTrigger
        onClick={() => setOpen?.(true)}
        className={clsx(
          'cursor-pointer',
          variant === 'main' &&
            'bg-primary !text-white hover:bg-primary-light [&[data-state=open]]:!bg-primary-light',
          variant === 'inherit' &&
            'rounded-[5px] bg-secondary-default text-text-primary hover:bg-secondary-default-hover [&[data-state=open]]:!bg-secondary-default-hover',
          triggerClassName,
          disabled && 'pointer-events-none opacity-50'
        )}
      >
        <div
          className={clsx(
            'flex h-8 px-[14px] text-center text-sm font-medium shadow-none'
          )}
        >
          <div className="flex w-full items-center gap-2">
            {icon && icon}
            {trigger && (
              <div className="flex-1 whitespace-nowrap">
                {selectedValueDisplay ? (
                  <TruncateText
                    text={selectedValueDisplay}
                    className="max-w-[70px] items-center truncate text-sm"
                    TooltipProps={{
                      children: (
                        <div className="bg-secondary-light px-2 py-1 text-sm text-white">
                          {selectedValueDisplay}
                        </div>
                      ),
                    }}
                  />
                ) : (
                  trigger
                )}
              </div>
            )}
            <IoCaretDownOutline />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className={clsx('w-[320px] border-none px-[10px] py-3', className)}
        onPointerDownOutside={() => {
          setOpen?.(false);
        }}
      >
        {label && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {showSearch && (
          <div className="w-full pb-3">
            <TextInput
              placeholder={placeHolderSearch}
              startIcon={<Search className="text-text-secondary" />}
              className="!rounded-[10px]"
              value={searchValue}
              inputSize="sm"
              onChange={onSearchValueChange}
              styleType="outline"
            />
          </div>
        )}
        <DropdownMenuRadioGroup
          className="max-h-[156px] w-full overflow-y-auto"
          value={selectedValue}
          onValueChange={onSelectedValueChange}
          defaultValue={defaultValue}
        >
          {items.map((item, index) => (
            <Fragment key={item.value ?? index}>
              <DropdownMenuRadioItem
                onClick={(e) => {
                  e.stopPropagation();
                  item.action?.();
                }}
                disabled={item.disabled}
                className={clsx(
                  'my-1 flex min-h-[36px] cursor-pointer items-center justify-between px-3 py-1.5 hover:bg-action-selected',
                  selectedValue === item.value && 'bg-body-background',
                  classNameItem
                )}
                value={item.value as string}
              >
                {item.label}
              </DropdownMenuRadioItem>
            </Fragment>
          ))}
        </DropdownMenuRadioGroup>
        {footer && (
          <div>
            <DropdownMenuSeparator className="mx-[6px] mb-0 mt-3" />
            <div className="flex justify-end pt-3">{footer}</div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenuSelect;
