import type { FieldValues } from 'react-hook-form';
import { useController, useWatch } from 'react-hook-form';
import ComboboxInput from '../SelectInput';
import type { ISelectInputProps } from '../SelectInput/ComboboxInput';
import type { IInputProps } from '../types/form';

const FormSelectInput = <T extends FieldValues>({
  disabled,
  name,
  control,
  rules,
  defaultValues,
  showError = true,
  helperText,
  required,
  ...rest
}: Omit<ISelectInputProps, 'onSelected'> & IInputProps<T>) => {
  const {
    field: { onChange },
    fieldState,
  } = useController({
    name,
    control,
  });

  const value = useWatch({ name, control }) as
    | (string | undefined)[]
    | string
    | undefined;

  const currentValues = (
    value && rest.mode === 'multiple'
      ? Array.isArray(value)
        ? value
        : [value]
      : [value]
  ).filter((item): item is string => item !== undefined);

  return (
    <ComboboxInput
      {...rest}
      disabled={disabled}
      defaultValues={defaultValues}
      required={required ?? !!rules?.required}
      error={showError ? fieldState?.error?.message : ''}
      values={currentValues}
      onSelected={onChange}
      helperText={helperText}
    />
  );
};

export default FormSelectInput;
