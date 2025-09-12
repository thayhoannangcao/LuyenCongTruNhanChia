import type { SwitchProps } from '@radix-ui/react-switch';
import clsx from 'clsx';
import type { ReactNode, RefAttributes } from 'react';
import { Switch } from '@/components/ui/switch';
import type { InputSize } from '@/src/types/app';
import FormLabel from '../common/FormLabel';

export interface ISwitchProps
  extends Omit<SwitchProps, 'ref'>,
    RefAttributes<HTMLButtonElement> {
  inputSize?: InputSize;
  className?: string;
  label?: string | ReactNode;
  formLabel?: string | ReactNode;
  required?: boolean;
  error?: string;
  name?: string;
  loading?: boolean;
}

const SwitchInput = ({
  inputSize = 'md',
  className,
  label,
  formLabel,
  error,
  name,
  ...props
}: ISwitchProps) => {
  return (
    <div className="">
      {formLabel && <FormLabel label={formLabel} required={props?.required} />}
      <div className="flex items-center space-x-2">
        <Switch
          {...props}
          id={`switch-` + name}
          className={clsx(
            'data-[state=checked]:!bg-primary-main h-6 w-10',
            className,
            inputSize === 'lg' &&
              'h-7 w-12 !border-[4px] data-[state=checked]:!border-[7px]',
            inputSize === 'sm' && 'h-5 w-10'
          )}
          switchThumbSize={inputSize}
        />
        <label
          htmlFor={`switch-` + name}
          className={clsx(
            'text-sm text-text-primary',
            !props?.disabled && 'cursor-pointer'
          )}
        >
          {label}
        </label>
      </div>
      {error && (
        <div className="text-error-main mt-1 text-xs font-normal">{error}</div>
      )}
    </div>
  );
};

export default SwitchInput;
