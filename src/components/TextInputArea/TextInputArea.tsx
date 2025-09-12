import type { InputSize } from '@/src/types/app';
import { clsx } from 'clsx';
import { forwardRef, type ReactNode } from 'react';
import FormLabel from '../common/FormLabel';

export interface ITextInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputSize?: InputSize;
  className?: string;
  classNameDivParent?: string;
  label?: string | ReactNode;
  helpText?: string;
  required?: boolean;
  error?: string;
  styleType?: 'default' | 'outline';
}

const TextInputArea = forwardRef<HTMLTextAreaElement, ITextInputProps>(
  (
    {
      inputSize = 'lg',
      className,
      helpText,
      label,
      error,
      styleType = 'default',
      ...props
    },
    ref
  ) => (
    <div className="flex h-full flex-col gap-2">
      {label && <FormLabel label={label} required={props?.required} />}
      <textarea
        ref={ref}
        {...props}
        className={clsx(
          'flex h-full min-h-[6rem] w-full rounded-lg bg-other p-[10px] text-sm shadow-sm outline-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-disabled focus:border disabled:cursor-not-allowed disabled:opacity-50',
          className,
          helpText,
          inputSize === 'sm' && 'text:1xs placeholder:text-1xs',
          inputSize === 'md' && 'text-xs placeholder:text-xs',
          inputSize === 'lg' && 'text-sm leading-6 placeholder:text-sm',
          error ? 'border !border-error' : 'border-action-active',
          styleType === 'outline' &&
            'border border-outline-border bg-white hover:bg-other focus:border focus:border-action-active focus:bg-white',
          styleType === 'default' &&
            'border border-other hover:border-action-active focus:border focus:border-action-active'
        )}
      />
      {error && (
        <div className="mt-1 text-xs font-normal text-error">{error}</div>
      )}
      {helpText && (
        <p className="mt-2 text-xs text-text-secondary">{helpText}</p>
      )}
    </div>
  )
);

TextInputArea.displayName = 'TextInputArea';

export default TextInputArea;
