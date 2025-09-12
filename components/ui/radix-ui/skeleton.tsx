import { cn } from '@/src/utils/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-action-hover animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
