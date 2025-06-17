import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

/**
 * 로딩 스켈레톤 컴포넌트
 * 서버 컴포넌트 - 정적인 로딩 UI
 */
export function LoadingSpinner() {
  const skeletonVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col'>
        {/* 헤더 스켈레톤 */}
        <div className='px-6 py-4 space-y-2'>
          <Skeleton className='h-8 w-48 bg-primary/5' />
          <Skeleton className='h-4 w-96 bg-primary/5' />
        </div>

        <div className='relative p-6 pt-0 space-y-4'>
          {/* 통계 스켈레톤 */}
          <div className='flex items-center justify-between mb-4'>
            <Skeleton className='h-5 w-32 bg-primary/5' />
            <Skeleton className='h-5 w-16 bg-primary/5 rounded-full' />
          </div>

          {/* 카드 스켈레톤 */}
          <div className='space-y-4'>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                initial='hidden'
                animate='visible'
                variants={skeletonVariants}
              >
                <Card className='overflow-hidden border shadow-sm'>
                  {/* 왼쪽 액센트 바 */}
                  <div className='absolute left-0 top-0 h-full w-1 bg-primary/10' />

                  <CardHeader className='pb-1.5 pt-3'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1 space-y-2 pl-3'>
                        <Skeleton className='h-6 w-3/4 bg-primary/5' />
                      </div>
                      <div className='flex items-center ml-4'>
                        <div className='p-2 rounded-full bg-muted/30'>
                          <Skeleton className='h-4 w-4 bg-primary/5 rounded-full' />
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className='pt-0 pb-3 pl-8'>
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-full bg-primary/5' />
                      <Skeleton className='h-4 w-2/3 bg-primary/5' />
                    </div>
                  </CardContent>

                  {/* 그라데이션 효과 */}
                  <div className='absolute inset-0 bg-gradient-to-r from-primary/[0.01] to-transparent pointer-events-none' />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* 페이지네이션 스켈레톤 */}
          <div className='flex justify-between items-center pt-4 mt-6'>
            <Skeleton className='h-8 w-32 bg-primary/5' />
            <div className='flex gap-1'>
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className='h-8 w-8 bg-primary/5 rounded-md' />
              ))}
            </div>
            <Skeleton className='h-8 w-32 bg-primary/5' />
          </div>
        </div>
      </div>
    </div>
  );
}
