// TODO: 리팩토링 (use client 남발, 더미 데이터 사용)

"use client";

import PageHeader from "@/components/PageHeader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDailyReportStore } from "@/store/dailyReportStore";
import { useEffect } from "react";
import { DailyReportList } from "./components/DailyReportList";
import { DailyReportPagination } from "./components/DailyReportPagination";

/**
 * MEM01M01 - 개인 데일리 보고서 목록 (내용 부분만)
 * 설계서 기준: 개인 데일리 보고서 목록 표시 화면
 */
export default function DailyReportsPage() {
  const {
    reports,
    totalCount,
    isLoading,
    error,
    currentPage,
    totalPages,
    setPage,
    clearError,
  } = useDailyReportStore();

  // TODO: API 연동 시 실제 데이터 fetch 로직 구현
  useEffect(() => {
    // 임시 데이터 로딩 시뮬레이션
    // fetchDailyReports(currentPage);
  }, [currentPage]);

  // 에러 처리
  useEffect(() => {
    if (error) {
      console.error("Daily Reports Error:", error);
    }
  }, [error]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (isLoading) {
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

  return (
    <div className='space-y-6'>
      <PageHeader
        title='데일리 보고서'
        description='자동으로 생성된 개인 데일리 보고서 목록입니다'
      />
      <div className='p-6 pt-0'>
        {/* 에러 상태 */}
        {error && (
          <Alert variant='destructive'>
            <AlertDescription className='flex items-center justify-between'>
              <span>{error}</span>
              <Button variant='ghost' size='sm' onClick={clearError}>
                ✕
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* 메인 콘텐츠 */}
        {totalCount === 0 ? (
          <Card>
            <CardContent className='flex flex-col items-center justify-center py-16'>
              <CardTitle className='mb-2'>
                아직 생성된 데일리 보고서가 없습니다.
              </CardTitle>
              <p className='text-muted-foreground mb-6 text-center max-w-md'>
                데일리 보고서는 자동으로 생성됩니다. 잠시 후 다시 확인해보세요.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* 결과 요약 */}
            <div className='flex items-center justify-between'>
              <p className='text-sm text-muted-foreground'>
                총 <span className='font-semibold'>{totalCount}</span>개의
                보고서
              </p>

              {/* 정렬 정보 */}
              <Badge variant='secondary' className='text-xs'>
                최신순
              </Badge>
            </div>

            {/* 보고서 목록 */}
            <DailyReportList reports={reports} />

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <DailyReportPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
