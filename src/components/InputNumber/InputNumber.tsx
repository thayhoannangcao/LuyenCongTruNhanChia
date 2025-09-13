import { InputNumber, InputNumberProps } from 'antd';

export interface InputNumberCommonProps
  extends React.ComponentProps<typeof InputNumber> {
  className?: string;
}

export default function InputNumberCommon({
  className,
  ...props
}: InputNumberCommonProps) {
  return <InputNumber className={className} {...props} />;
}
