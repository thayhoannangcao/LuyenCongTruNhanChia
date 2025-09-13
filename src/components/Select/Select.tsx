import { Select } from 'antd';

export interface SelectCommonProps extends React.ComponentProps<typeof Select> {
  className?: string;
}

export default function SelectCommon({
  className,
  ...props
}: SelectCommonProps) {
  return <Select className={className} {...props} />;
}
