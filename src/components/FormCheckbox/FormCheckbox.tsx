import type { FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Checkbox } from '../Checkbox';
import type { ICheckboxProps } from '../Checkbox/Checkbox';
import type { IInputProps } from '../types/form';

const FormCheckbox = <T extends FieldValues>({
  name,
  control,
  rules,
  onChange,
  ...rest
}: ICheckboxProps & IInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Checkbox
          {...rest}
          value={rest.value}
          checked={field.value}
          onChange={(e) => {
            onChange?.(e.valueOf());
            field.onChange(e);
          }}
          error={fieldState?.error?.message}
        />
      )}
    />
  );
};

export default FormCheckbox;
