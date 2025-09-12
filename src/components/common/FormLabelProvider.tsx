import type { ReactNode } from 'react';

export interface IFormLabel {
  className?: string;
  classNameWrapper?: string;
  label?: string | ReactNode;
  required?: boolean;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
  helperText?: string | ReactNode;
}

const FormLabelProvider = ({
  children,
  error,
  required,
  className,
  label,
  htmlFor,
  classNameWrapper,
  helperText,
}: IFormLabel) => {
  return (
    <div className={classNameWrapper}>
      {label && (
        <label
          htmlFor={htmlFor}
          className={`mb-2 flex items-center justify-start gap-2 text-sm text-text-primary ${className}`}
        >
          {label}
          {required && (
            <div className="h-[13px] rounded-[3px] bg-error px-[7.5px] text-center text-[7px] font-bold leading-[15px] text-white">
              必須
            </div>
          )}
        </label>
      )}
      {children}
      {helperText && (
        <div className="mt-2 text-xs font-normal text-text-secondary">
          {helperText}
        </div>
      )}
      {error && (
        <div className="mt-2 text-xs font-normal text-error">{error}</div>
      )}
    </div>
  );
};

export default FormLabelProvider;
