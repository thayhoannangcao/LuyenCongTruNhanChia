import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import Tag from '../Tag/Tag';
import { X } from 'lucide-react';

export type Status =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'save';

const StatusStyle = {
  success: '!bg-success-outlined-hover !text-success-main',
  info: '!bg-info-outlined-hover !text-info',
  warning: '!bg-warning-outlined-hover !text-warning',
  danger: '!bg-error-outlined-hover !text-error-contained-hover',
  primary: '!bg-primary-outlined-hover !text-primary-contained-hover',
  save: '!bg-action-selected !text-text-secondary',
};

interface ITagStatusProps {
  label?: string | ReactNode;
  status?: Status;
  size?: 'sm' | 'md';
  className?: string;
  icon?: boolean;
  onRemove?: () => void;
}

function TagStatus({
  label,
  status = 'success',
  size = 'md',
  className,
  icon = false,
  onRemove,
}: ITagStatusProps) {
  return (
    <Tag
      label={label}
      size={size}
      className={clsx(
        'rounded-[4px] px-2 py-1',
        StatusStyle[status],
        size === 'md' && 'h-[30px]',
        className
      )}
      icon={icon && <X className={clsx('h-full w-full')} />}
      onRemove={onRemove}
    />
  );
}

export default TagStatus;
