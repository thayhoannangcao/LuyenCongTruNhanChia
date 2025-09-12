import {
  Avatar as AvatarBase,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/radix-ui/avatar';
import { Skeleton } from '@/components/ui/radix-ui/skeleton';
import { cn } from '@/src/utils/utils';
import Image from 'next/image';

type AvatarVariant = 'circle' | 'square' | 'rounded';

interface IAvatarProps {
  variant?: AvatarVariant;
  badge?: boolean;
  icon?: boolean;
  imageUrl?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Avatar = ({
  variant = 'circle',
  badge,
  imageUrl,
  name,
  size = 'small',
  className,
}: IAvatarProps) => {
  return (
    <div className="relative h-fit w-fit">
      <AvatarBase
        className={cn(
          'bg-sliver items-center justify-center',
          variant === 'square' && 'rounded-none',
          variant === 'rounded' && 'rounded',
          size === 'medium' && 'h-16 w-16',
          size === 'large' && 'h-20 w-20',
          className
        )}
      >
        {imageUrl ? (
          <>
            <AvatarImage src={imageUrl} alt={name || 'Avatar Default'} />
            <AvatarFallback
              className={cn(
                '',
                size === 'medium' && 'text-2xl',
                size === 'large' && 'mb-1 text-[40px] font-medium'
              )}
            >
              <Skeleton
                className={cn(
                  'h-10 w-10 rounded-full',
                  size === 'medium' && 'h-16 w-16',
                  size === 'large' && 'h-20 w-20'
                )}
              />
            </AvatarFallback>
          </>
        ) : (
          <>
            <AvatarFallback
              className={cn(
                'bg-sliver text-xl text-white',
                size === 'medium' && 'text-2xl',
                size === 'large' && 'mb-1 text-[40px] font-medium'
              )}
            >
              {name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </>
        )}
      </AvatarBase>

      {badge && (
        <div
          className={cn(
            'absolute',
            variant === 'circle'
              ? 'bottom-0 right-0'
              : 'bottom-[-4px] right-[-4px]'
          )}
        >
          <Image
            src="/badge-online.svg"
            alt="badge"
            width={12}
            height={12}
            priority
          />
        </div>
      )}
    </div>
  );
};

export default Avatar;
