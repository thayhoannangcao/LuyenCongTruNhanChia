import type { FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import TextInputArea from '../TextInputArea';
import type { ITextInputProps } from '../TextInputArea/TextInputArea';
import type { IInputProps } from '../types/form';

const FormTextInputArea = <T extends FieldValues>({
  disabled,
  name,
  control,
  errors,
  rules,
  className,
  defaultValue,
  ...rest
}: ITextInputProps & IInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextInputArea
          className={className}
          disabled={disabled}
          defaultValue={defaultValue}
          required={!!rules?.required}
          {...field}
          {...rest}
          error={
            errors && errors[name] && errors[name]?.type
              ? (errors[name]?.message as string)
              : ''
          }
        />
      )}
    />
  );
};

export default FormTextInputArea;
