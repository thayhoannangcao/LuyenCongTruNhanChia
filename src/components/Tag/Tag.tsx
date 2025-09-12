import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import TruncateText from '../TruncateText';

const SizeStyle = {
  sm: 'h-6 py-[3px] px-1 rounded-lg',
  md: 'h-8 py-1 px-1 rounded-[10px]',
  lg: 'h-10 py-2 px-2 rounded-[12px]',
};

const IconStyle = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

interface ITagProps {
  label?: string | ReactNode;
  icon?: string | ReactNode;
  iconLeft?: string | ReactNode;
  onRemove?: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: 'main' | 'outline';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
}

function Tag({
  label,
  icon,
  iconLeft,
  onRemove,
  variant = 'main',
  className,
  size = 'md',
  active = false,
}: Readonly<ITagProps>) {
  return (
    <div className="flex overflow-hidden">
      <div
        className={clsx(
          'inline-flex w-full items-center gap-[6px] text-[13px]',
          variant === 'main' &&
            (active
              ? 'bg-primary text-white'
              : 'bg-body-background text-text-primary'),
          variant === 'outline' &&
            (active
              ? 'border border-primary bg-white text-primary'
              : 'border border-outline-border bg-white text-text-primary'),
          SizeStyle[size],
          className
        )}
      >
        {iconLeft && <div className={clsx(IconStyle[size])}>{iconLeft}</div>}
        <div className="w-[80%] flex-1">
          <TruncateText
            text={label as string}
            className="grow truncate"
            TooltipProps={{
              children: (
                <div className="break-words bg-secondary-light px-2 py-1 text-sm text-white">
                  {label}
                </div>
              ),
            }}
          />
        </div>
        {icon && (
          <div
            className={clsx(
              'cursor-pointer transition-opacity hover:opacity-50',
              IconStyle[size]
            )}
            onClick={onRemove}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tag;
