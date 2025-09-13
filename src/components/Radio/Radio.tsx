import { Radio } from 'antd';

export interface RadioCommonProps
  extends React.ComponentProps<typeof Radio.Group> {
  className?: string;
}

export default function RadioCommon({ className, ...props }: RadioCommonProps) {
  return <Radio.Group className={className} {...props} />;
}
