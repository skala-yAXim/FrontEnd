// TODO: 리팩토링 완료 - 서버/클라이언트 컴포넌트 분리

"use client";

import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { DailyReportData } from "@/types/dailyReport";
import { DailyReportList } from "./_components/DailyReportList";
import { EmptyState } from "./_components/EmptyState";
import { ErrorState } from "./_components/ErrorState";
import { LoadingSpinner } from "./_components/LoadingSpinner";
import { ReportStats } from "./_components/ReportStats";
import { mockDailyReports } from "./mock";

/**
 * MEM01M01 - 개인 데일리 보고서 목록 (내용 부분만)
 * 설계서 기준: 개인 데일리 보고서 목록 표시 화면
 */
export default function DailyReportsPage() {
  // TODO: react-query 훅 구현 예정
  // const {
  //   data: reportsData,
  //   isLoading,
  //   error,
  //   refetch
  // } = useDailyReportsQuery(currentPage);

  // 임시 데이터 (react-query 구현 전까지)
  const reports: DailyReportData[] = mockDailyReports;
  const isLoading = false;
  const error = null;

  // 페이지네이션 훅 사용
  const pagination = usePagination({
    totalItems: reports.length,
    itemsPerPage: 5,
    initialPage: 1,
  });

  // 현재 페이지의 보고서들
  const paginatedReports = pagination.sliceData(reports);

  const clearError = () => {
    // TODO: react-query의 error reset 로직 구현 예정
    // refetch();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='space-y-6'>
      {/* 서버 컴포넌트 - 정적 헤더 */}
      <PageHeader
        title='데일리 보고서'
        description='자동으로 생성된 개인 데일리 보고서 목록입니다'
      />

      <div className='p-6 pt-0'>
        {/* 클라이언트 컴포넌트 - 에러 상태 (이벤트 처리 필요) */}
        {error && <ErrorState error={error} onClearError={clearError} />}

        {/* 메인 콘텐츠 */}
        {pagination.totalItems === 0 ? (
          // 서버 컴포넌트 - 정적 빈 상태
          <EmptyState />
        ) : (
          <>
            {/* 서버 컴포넌트 - 통계 정보 */}
            <ReportStats
              totalCount={pagination.totalItems}
              sortOrder='latest'
            />

            {/* 서버 컴포넌트 - 보고서 목록 (현재 페이지 데이터만 전달) */}
            <DailyReportList reports={paginatedReports} />

            {/* 공통 페이지네이션 컴포넌트 */}
            <Pagination
              currentPage={pagination.currentPage}
              totalItems={pagination.totalItems}
              itemsPerPage={pagination.itemsPerPage}
              onPageChange={pagination.handlePageChange}
              className='mt-6'
            />
          </>
        )}
      </div>
    </div>
  );
}
