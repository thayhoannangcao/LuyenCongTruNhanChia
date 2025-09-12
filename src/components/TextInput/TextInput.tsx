import type { InputSize } from '@/lib/types';
import clsx from 'clsx';
import { forwardRef, type ReactNode } from 'react';
import { LuX } from 'react-icons/lu';
import FormLabel from '../common/FormLabel';

export interface ITextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  inputSize?: InputSize | 'xs';
  className?: string;
  label?: string | ReactNode;
  helpText?: string;
  classNameInputIcon?: string;
  required?: boolean;
  error?: string;
  onClear?: () => void;
  showError?: boolean;
  variant?: 'vertical' | 'horizontal';
  classNameForm?: string;
  styleType?: 'default' | 'outline';
}

const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
  (
    {
      startIcon,
      endIcon,
      inputSize = 'lg',
      className,
      label,
      helpText,
      error,
      onClear,
      showError = true,
      variant = 'vertical',
      classNameForm,
      classNameInputIcon,
      styleType = 'default',
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (
        typeof props.maxLength === 'number' &&
        value.length > props.maxLength
      ) {
        e.target.value = value.slice(0, props.maxLength);
      }

      props.onChange?.(e);
    };
    return (
      <div
        className={clsx(
          variant === 'horizontal' && 'flex items-baseline gap-3',
          classNameForm
        )}
      >
        {label && (
          <FormLabel
            label={label}
            required={props?.required}
            className={clsx(
              error && 'text-error',
              variant === 'vertical' && 'mb-2'
            )}
          />
        )}
        <div className={clsx(variant === 'horizontal' && 'w-full flex-1')}>
          <div className="relative w-full">
            {startIcon && (
              <div
                className={clsx(
                  'absolute top-1/2 hidden -translate-y-1/2',
                  !!startIcon && 'left-[10px] !block'
                )}
              >
                {startIcon}
              </div>
            )}
            {endIcon && (
              <div
                className={clsx(
                  'absolute top-1/2 hidden -translate-y-1/2',
                  !!endIcon && 'right-[10px] !block'
                )}
              >
                {endIcon}
              </div>
            )}
            {onClear && props?.value && (
              <div
                className="absolute right-4 top-1/2 block -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  onClear?.();
                }}
              >
                <LuX className="text-text-secondary" />
              </div>
            )}
            <input
              ref={ref}
              {...props}
              onChange={handleChange}
              className={clsx(
                'bg-other text-text-primary file:text-foreground placeholder:text-text-disabled flex w-full rounded-[8px] px-3 py-1 text-sm shadow-sm transition-colors duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                className,
                inputSize === 'xl' && 'h-[48px] !text-base',
                inputSize === 'lg' && 'h-[42px]',
                inputSize === 'md' && 'h-9',
                inputSize === 'sm' && 'h-8',
                !!startIcon && classNameInputIcon
                  ? classNameInputIcon
                  : !!startIcon && 'pl-9',
                (!!endIcon || onClear) && classNameInputIcon
                  ? classNameInputIcon
                  : (!!endIcon || onClear) && 'pr-10',
                error
                  ? 'focus-visible:none !border-error !border !outline-none'
                  : 'border-action-active',
                styleType === 'outline' &&
                  'border-outline-border hover:bg-other focus:border-action-active border bg-white focus:border focus:bg-white',
                styleType === 'default' &&
                  'border-other hover:border-action-active focus:border-action-active border focus:border'
              )}
            />
          </div>
          {!!error && showError && (
            <div className="text-error mt-2 text-wrap text-xs font-normal">
              {error}
            </div>
          )}

          {helpText && (
            <p className="text-text-secondary mt-2 text-xs">{helpText}</p>
          )}
        </div>
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
