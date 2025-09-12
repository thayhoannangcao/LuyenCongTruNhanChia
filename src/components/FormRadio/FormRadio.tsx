import type { FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { IRadioProps } from '../Radio/Radio';
import Radio from '../Radio/Radio';
import type { IInputProps } from '../types/form';

const FormRadio = <T extends FieldValues>({
  name,
  control,
  errors,
  rules,
  defaultValue,
  showError = true,
  ...rest
}: IRadioProps & IInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <Radio
          {...rest}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
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

export default FormRadio;
