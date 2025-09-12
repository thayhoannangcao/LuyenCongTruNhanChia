import { Button as ButtonBase } from '@/components/ui/radix-ui/button';
import { clsx } from 'clsx';
import { forwardRef, type ReactNode } from 'react';
import LoadingIcon from '../common/LoadingIcon';

export type ButtonVariant =
  | 'link'
  | 'main'
  | 'default'
  | 'outline'
  | 'inherit'
  | 'destructive'
  | 'secondary'
  | 'ghost';
export type ButtonSize = 'default' | 'sm' | 'md' | 'lg' | 'icon';
export type ButtonType = 'submit' | 'reset' | 'button';

export interface IButtonProps {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  title?: string | ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disable?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  type?: ButtonType;
  children?: ReactNode;
  form?: string;
}

const Button = forwardRef<HTMLButtonElement, Readonly<IButtonProps>>(
  (
    {
      onClick,
      className,
      icon,
      loading = false,
      disable = false,
      iconPosition,
      size = 'md',
      title,
      type = 'button',
      variant = 'main',
      children,
      form,
    },
    ref
  ) => (
    <ButtonBase
      ref={ref}
      type={type}
      className={clsx('text-center font-medium', className)}
      size={size}
      onClick={onClick}
      disabled={disable || loading}
      variant={variant}
      role="div"
      form={form}
    >
      <div
        className={clsx(
          '-mt-[1.5px] flex w-fit justify-center',
          !loading && 'hidden'
        )}
      >
        <LoadingIcon
          className={clsx(
            variant === 'outline' && '!text-primary',
            variant === 'ghost' && '!text-text-primary',
            variant === 'link' && '!text-primary',
            variant === 'inherit' && '!text-text-primary',
            variant === 'main' && '!text-white',
            variant === 'default' && '!text-primary',
            variant === 'destructive' && '!text-destructive-foreground'
          )}
        />
      </div>
      <div
        className={clsx(
          !!icon && 'flex items-center gap-2',
          iconPosition === 'right' && 'w-full flex-row-reverse justify-between'
        )}
      >
        {icon}
        {title || children}
      </div>
    </ButtonBase>
  )
);

Button.displayName = 'Button';

export default Button;
