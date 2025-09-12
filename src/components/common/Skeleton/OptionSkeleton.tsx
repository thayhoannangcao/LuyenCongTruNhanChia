import { Skeleton } from '@/components/ui/skeleton';

type OptionSkeletonProps = {
  length?: number;
};

const OptionSkeleton = ({ length = 4 }: OptionSkeletonProps) => {
  return (
    <>
      {Array.from({ length: length }).map((_, index) => (
        <Skeleton key={index} className="m-2 h-8 w-[calc(100%-15px)]" />
      ))}
    </>
  );
};

export default OptionSkeleton;
