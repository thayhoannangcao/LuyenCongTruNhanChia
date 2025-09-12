import { Checkbox as CheckboxInput } from '@/components/ui/checkbox';
import { cn } from '@/src/utils/utils';
import type { InputSize } from '@/src/types/app';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import FormLabel from '../common/FormLabel';

export interface ICheckboxProps {
  size?: InputSize;
  className?: string;
  checked?: boolean | 'indeterminate';
  onChange?: (check: boolean | string) => void;
  onChangeValue?: (value?: string) => void;
  disabled?: boolean;
  defaultChecked?: boolean;
  label?: string | ReactNode;
  value?: string;
  error?: string;
  subLabel?: string;
  classNameLabel?: string;
}

const Checkbox = ({
  className,
  value,
  checked,
  label,
  disabled,
  onChange,
  onChangeValue,
  error,
  defaultChecked,
  subLabel,
  classNameLabel,
}: ICheckboxProps) => {
  return (
    <div className={clsx('flex flex-col', className)}>
      <div className="items-top flex gap-3">
        <CheckboxInput
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          id={value}
          onCheckedChange={(e) => {
            onChange?.(e.valueOf());
            onChangeValue?.(e.valueOf() ? value : undefined);
          }}
        />

        <div className="grid gap-[2px] leading-none">
          {label && (
            <FormLabel
              label={label}
              htmlFor={value}
              className={cn(
                'text-text-primary !mb-0 cursor-pointer text-opacity-[0.87]',
                disabled && 'text-link-water',
                error && 'text-error',
                classNameLabel
              )}
            />
          )}
          {subLabel && (
            <p
              className={cn(
                'text-raven text-xs leading-5 tracking-wide',
                disabled && 'text-link-water'
              )}
            >
              {subLabel}
            </p>
          )}
        </div>
      </div>

      {error && <p className="text-error mt-1 text-xs font-normal">{error}</p>}
    </div>
  );
};

export default Checkbox;
