import { Skeleton } from '@/components/ui/skeleton';

function StepperSkeleton() {
  return (
    <div className="w-full p-3">
      <div className="mt-4 flex items-center justify-center gap-3">
        <div className="flex flex-col items-center justify-center gap-1">
          <Skeleton className="h-10 w-60 !rounded-full bg-action-hover" />
          <Skeleton className="h-14 w-1 !rounded-full bg-action-hover" />
          <Skeleton className="h-10 w-60 !rounded-full bg-action-hover" />
          <Skeleton className="h-14 w-1 !rounded-full bg-action-hover" />
          <Skeleton className="h-10 w-60 !rounded-full bg-action-hover" />
        </div>
      </div>
    </div>
  );
}

export default StepperSkeleton;
