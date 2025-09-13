import { Input } from 'antd';

export interface TextInputProps extends React.ComponentProps<typeof Input> {
  className?: string;
}

export default function TextInput({ className, ...props }: TextInputProps) {
  return <Input className={className} {...props} />;
}
