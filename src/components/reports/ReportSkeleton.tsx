import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function ReportSkeleton() {
  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Skeleton className='h-8 w-24' />
          <Skeleton className='h-8 w-48' />
        </div>
        <Skeleton className='h-10 w-10 rounded-md' />
      </div>
      <Card>
        <CardContent className='space-y-4 p-6'>
          <Skeleton className='h-8 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
          <div className='space-y-3'>
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className='h-4 w-full' />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
