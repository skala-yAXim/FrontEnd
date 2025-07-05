"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetStaticsUserWeek } from "@/hooks/useDashboardQueries";
import { DashboardCard, getFilteredCards } from "@/utils/dashboardUtilFunc";

// 개별 카드 컴포넌트
function StatCard({ card }: { card: DashboardCard }) {
  return (
    <div className='border-0 overflow-hidden rounded-xl shadow-none h-full '>
      <CardHeader className='pb-1'>
        <CardDescription className='flex items-center gap-2 pb-3 text-sm font-medium'>
          <span className='flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary'>
            {card.badgeIcon}
          </span>
          <span className='text-foreground/90'>{card.title}</span>
        </CardDescription>
        <CardTitle className='text-xl font-semibold tabular-num bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80'>
          {card.value}
        </CardTitle>
      </CardHeader>
    </div>
  );
}

export function SectionCards() {
  const { data, isLoading, isError } = useGetStaticsUserWeek();

  if (isLoading) {
    return (
      <div className='grid grid-cols-3 gap-4 px-4 h-full'>
        {[...Array(9)].map((_, i) => (
          <div key={i} className='h-[120px] rounded-xl overflow-hidden'>
            <Card className='h-full border-0 shadow-md bg-gradient-to-br from-background to-muted/30'>
              <CardHeader className='pb-0'>
                <Skeleton className='h-4 w-24 mb-2' />
                <Skeleton className='h-8 w-16 mb-2' />
                <Skeleton className='h-6 w-10' />
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className='px-4 h-full flex items-center'>
        <Card className='border-0 bg-destructive/10 text-destructive w-full'>
          <CardHeader>
            <CardTitle>데이터를 불러올 수 없습니다</CardTitle>
            <CardDescription className='text-destructive/80'>
              잠시 후 다시 시도해주세요
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // 유틸 함수를 사용하여 기타 문서를 제외한 카드 데이터 가져오기
  const filteredCards = getFilteredCards(data);

  return (
    <Card className='border-0 bg-transparent shadow-none h-full flex flex-col'>
      <CardHeader className='pb-0'>
        <CardTitle className='px-4'>업무 현황</CardTitle>
      </CardHeader>
      <div className='grid grid-cols-3 gap-x-1 gap-y-8 px-4 lg:px-6 shadow-none flex-1'>
        {filteredCards.map((card, index) => (
          <StatCard key={index} card={card} />
        ))}
      </div>
    </Card>
  );
}
