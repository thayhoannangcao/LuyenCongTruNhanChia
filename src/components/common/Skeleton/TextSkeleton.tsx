import { Skeleton } from '@/components/ui/skeleton';
import clsx from 'clsx';

type TextSkeletonProps = {
  length?: number;
  className?: string;
};

const TextSkeleton = ({ length = 4, className }: TextSkeletonProps) => {
  return (
    <div className="space-y-2 py-2">
      {Array.from({ length: length }).map((_, index) => (
        <Skeleton key={index} className={clsx('h-6 w-full', className)} />
      ))}
    </div>
  );
};

export default TextSkeleton;
