import { Checkbox } from 'antd';

export interface CheckboxProps extends React.ComponentProps<typeof Checkbox> {
  className?: string;
}

export default function CheckboxCommon({ className, ...props }: CheckboxProps) {
  return <Checkbox className={className} {...props} />;
}
