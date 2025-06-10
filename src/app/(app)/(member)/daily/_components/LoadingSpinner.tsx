import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * 로딩 스켈레톤 컴포넌트
 * 서버 컴포넌트 - 정적인 로딩 UI
 */
export function LoadingSpinner() {
  return (
    <div className='space-y-6 p-6'>
      {/* 헤더 스켈레톤 */}
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-8 w-48' />
          <Skeleton className='h-4 w-96' />
        </div>
        <Skeleton className='h-10 w-10 rounded-md' />
      </div>

      {/* 카드 스켈레톤 */}
      <div className='space-y-4'>
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className='h-6 w-3/4' />
              <Skeleton className='h-4 w-1/2' />
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-2/3' />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
