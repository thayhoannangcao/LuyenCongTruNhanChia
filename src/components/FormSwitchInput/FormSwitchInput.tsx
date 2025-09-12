import type { FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import SwitchInput from '../SwitchInput';
import type { ISwitchProps } from '../SwitchInput/SwitchInput';
import type { IInputProps } from '../types/form';

const FormSwitchInput = <T extends FieldValues>({
  name,
  control,
  errors,
  rules,
  defaultValue,
  showError = true,
  ...rest
}: ISwitchProps & IInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <SwitchInput
          {...rest}
          defaultValue={defaultValue}
          checked={value}
          onCheckedChange={onChange}
          required={!!rules?.required}
          error={
            showError && errors && errors[name] && errors[name]?.type
              ? (errors[name]?.message as string)
              : ''
          }
        />
      )}
    />
  );
};

export default FormSwitchInput;
