'use client';

import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radix-ui/radio-group';
import { cn } from '@/src/utils/utils';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import FormLabel from '../common/FormLabel';
import type { TSelectOption } from '../types/form';

export interface IRadioProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  label?: string | ReactNode;
  orientation?: 'horizontal' | 'vertical';
  options: TSelectOption[];
  error?: string;
  className?: string;
  classNameItem?: string;
  classNameRadio?: string;
}

const Radio = ({
  defaultValue,
  value,
  onChange,
  orientation = 'vertical',
  label,
  required,
  options,
  error,
  disabled,
  className,
  classNameItem,
  classNameRadio,
}: Readonly<IRadioProps>) => {
  return (
    <div className={cn('w-fit', className)}>
      {label && (
        <FormLabel label={label} required={required} className="mb-2" />
      )}
      <RadioGroup
        className="gap-3"
        defaultValue={defaultValue}
        value={value}
        onValueChange={(e: string) => onChange && onChange(e.valueOf())}
        orientation={orientation}
        disabled={disabled}
      >
        {options.map((option) => (
          <div key={option.value}>
            <div className={clsx('flex items-start gap-2', classNameItem)}>
              <RadioGroupItem
                className={clsx('mt-[3px]', classNameRadio)}
                value={option.value}
                id={option.value}
                disabled={option.disabled}
              />

              <div className="grid flex-1 gap-[2px] leading-none">
                <FormLabel
                  htmlFor={option.value}
                  label={option.label}
                  className={cn(
                    '!mb-0 cursor-pointer self-start',
                    disabled || option.disabled ? '!text-link-water' : ''
                  )}
                />

                {option.subLabel && (
                  <p
                    className={cn(
                      'text-raven text-xs leading-5 tracking-wide',
                      disabled || option.disabled ? 'text-link-water' : ''
                    )}
                  >
                    {option.subLabel}
                  </p>
                )}
              </div>
            </div>
            <div
              className={cn(
                'transition-all duration-300',
                value === option.value
                  ? 'max-h-screen opacity-100'
                  : 'max-h-0 overflow-hidden opacity-0'
              )}
            >
              {option.subContent}
            </div>
          </div>
        ))}
      </RadioGroup>
      {error && (
        <div className="text-error mt-1 text-xs font-normal">{error}</div>
      )}
    </div>
  );
};

export default Radio;
