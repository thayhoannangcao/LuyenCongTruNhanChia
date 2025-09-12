import type { FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import DatePicker from '../DatePicker';
import type { ITextInputProps } from '../TextInput/TextInput';
import type { IDatePickerProps } from '../DatePicker/DatePicker';
import type { IInputProps } from '../types/form';

const FormDateInput = <T extends FieldValues>({
  name,
  control,
  errors,
  rules,
  datePickerProps,
  showError = true,
  ...rest
}: ITextInputProps & IInputProps<T> & IDatePickerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <DatePicker
          {...rest}
          datePickerProps={{
            ...datePickerProps,
            ...(datePickerProps?.mode === 'single' && {
              selected: value,
              onSelect: onChange,
            }),
          }}
          dateRangePickerProps={{
            ...(datePickerProps?.mode === 'range' && {
              selected: value,
              onSelect: onChange,
            }),
          }}
          required={!!rules?.required}
          error={
            showError && errors?.[name]?.type
              ? (errors[name]?.message as string)
              : ''
          }
        />
      )}
    />
  );
};

export default FormDateInput;
