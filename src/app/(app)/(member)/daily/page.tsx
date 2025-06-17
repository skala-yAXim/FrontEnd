// TODO: 리팩토링 완료 - 서버/클라이언트 컴포넌트 분리

"use client";

import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { useGetDailyReports } from "@/hooks/useUserDailyQueries";
import { useServerPagination } from "../../../../hooks/useServerPagination";
import { DailyReportList } from "./_components/DailyReportList";
import { EmptyState } from "./_components/EmptyState";
import { LoadingSpinner } from "./_components/LoadingSpinner";
import { ReportStats } from "./_components/ReportStats";

/**
 * MEM01M01 - 개인 데일리 보고서 목록 (내용 부분만)
 * 설계서 기준: 개인 데일리 보고서 목록 표시 화면
 */
export default function DailyReportsPage() {
  // 페이지네이션 훅 사용
  const pagination = useServerPagination({
    initialPage: 0,
    initialSize: 7,
    initialSort: "createdAt,desc",
  });

  const {
    data: dailyReportsData,
    isLoading,
    isError,
  } = useGetDailyReports(pagination.pageRequest);

  const dailyReports = dailyReportsData?.content || [];
  const totalItems = dailyReportsData?.totalElements || 0;
  const totalPages = dailyReportsData?.totalPages || 0;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='space-y-6'>
      {/* 서버 컴포넌트 - 정적 헤더 */}
      <PageHeader
        title='데일리 보고서'
        description='지난 데일리 보고서들을 확인하고 새로운 보고서를 자동으로 생성할 수 있습니다.

'
      />

      <div className='p-6 pt-0'>
        {totalItems === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* 서버 컴포넌트 - 통계 정보 */}
            <ReportStats totalCount={totalItems} sortOrder='latest' />

            {/* 서버 컴포넌트 - 보고서 목록 (현재 페이지 데이터만 전달) */}
            <DailyReportList reports={dailyReports} />

            {/* 공통 페이지네이션 컴포넌트 */}
            <Pagination
              {...pagination.getPaginationProps(totalItems)}
              showPageInfo={true}
              showResultInfo={true}
              className='mt-6'
            />
          </>
        )}
      </div>
    </div>
  );
}
