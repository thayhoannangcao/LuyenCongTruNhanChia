import type { FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { ITextInputProps } from '../TextInput/TextInput';
import TextInput from '../TextInput/TextInput';
import type { IInputProps } from '../types/form';

const FormTextInput = <T extends FieldValues>({
  disabled,
  name,
  control,
  rules,
  className,
  defaultValue,
  showError = true,
  ...rest
}: ITextInputProps & IInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextInput
          className={className}
          disabled={disabled}
          required={!!rules?.required}
          {...field}
          {...rest}
          value={field.value || defaultValue}
          error={fieldState?.error?.message}
          showError={showError}
        />
      )}
    />
  );
};

export default FormTextInput;
