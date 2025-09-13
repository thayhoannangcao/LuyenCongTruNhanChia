import { Button } from 'antd';

export interface ButtonCommonProps extends React.ComponentProps<typeof Button> {
  className?: string;
}

export default function ButtonCommon({
  className,
  ...props
}: ButtonCommonProps) {
  return <Button className={className} {...props} />;
}
