import { Skeleton } from '@/components/ui/skeleton';

function TimelineSkeleton() {
  return (
    <div className="w-full p-3">
      <div className="w-full text-center">
        <Skeleton className="h-5 w-[15%] !rounded-full bg-action-hover" />
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        <div className="flex flex-col items-center justify-center gap-1">
          <Skeleton className="h-8 w-8 !rounded-full bg-action-hover" />
          <Skeleton className="h-14 w-1 !rounded-full bg-action-hover" />
          <Skeleton className="h-8 w-8 !rounded-full bg-action-hover" />
        </div>
        <div className="grow">
          <div className="flex flex-col gap-5">
            <Skeleton className="h-20 w-full bg-action-hover" />
            <Skeleton className="h-20 w-full bg-action-hover" />
          </div>
        </div>
      </div>
      <div className="mt-7 w-full text-center">
        <Skeleton className="h-5 w-[15%] !rounded-full bg-action-hover" />
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        <div className="flex flex-col items-center justify-center gap-1">
          <Skeleton className="h-8 w-8 !rounded-full bg-action-hover" />
          <Skeleton className="h-14 w-1 !rounded-full bg-action-hover" />
          <Skeleton className="h-8 w-8 !rounded-full bg-action-hover" />
        </div>
        <div className="grow">
          <div className="flex flex-col gap-5">
            <Skeleton className="h-20 w-full bg-action-hover" />
            <Skeleton className="h-20 w-full bg-action-hover" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineSkeleton;
