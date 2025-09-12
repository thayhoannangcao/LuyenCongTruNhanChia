import { clsx } from 'clsx';
import type { ReactNode } from 'react';

const ColorStyle = {
  default: 'bg-none text-text-primary',
  primary: 'bg-primary text-white',
  error: 'bg-error text-white',
};

const VariantStyle = {
  standard:
    'h-5 rounded-[64px_64px] p-[0px_6.5px] absolute left-[35%] top-0 -translate-y-[40%]',
  dot: 'h-1.5 w-1.5 rounded-full absolute right-0 top-0 translate-x-[100%]',
};

interface IBadgeProps {
  icon?: ReactNode;
  label?: string | ReactNode;
  color?: 'default' | 'primary' | 'error';
  className?: string;
  variant?: 'standard' | 'dot';
}

function Badge({
  icon,
  label,
  color = 'default',
  className,
  variant = 'standard',
}: IBadgeProps) {
  return (
    <div className={clsx('relative inline-block')}>
      {icon && <span className="h-6 w-6">{icon}</span>}
      <div
        className={clsx(
          ColorStyle[color],
          'inline-flex items-center text-xs',
          VariantStyle[variant],
          className
        )}
      >
        {label}
      </div>
    </div>
  );
}

export default Badge;
