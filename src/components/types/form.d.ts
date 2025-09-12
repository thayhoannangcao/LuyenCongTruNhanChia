import type {
  Control,
  FieldErrors,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

export interface IInputProps<T extends FieldValues> {
  disabled?: boolean;
  name: Path<T>;
  errors?: FieldErrors<T>;
  control?: Control<T>;
  rules?: RegisterOptions<T>;
  className?: string;
  showError?: boolean;
}

export type TSelectOption = {
  value: string;
  label: string | ReactNode;
  displayValue?: string | ReactNode;
  displayLabel?: string | ReactNode;
  disabled?: boolean;
  subLabel?: string;
  subContent?: ReactNode;
};
