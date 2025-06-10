// TODO: 리팩토링 완료 - 서버/클라이언트 컴포넌트 분리

"use client";

import PageHeader from "@/components/PageHeader";
import { DailyReportData } from "@/types/dailyReport";
import { useState } from "react";
import { DailyReportList } from "./_components/DailyReportList";
import { DailyReportPagination } from "./_components/DailyReportPagination";
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
  // 페이지네이션 로컬 state
  const [currentPage, setCurrentPage] = useState(1);

  // TODO: react-query 훅 구현 예정
  // const {
  //   data: reportsData,
  //   isLoading,
  //   error,
  //   refetch
  // } = useDailyReportsQuery(currentPage);

  // 임시 데이터 (react-query 구현 전까지)
  const reports: DailyReportData[] = mockDailyReports;
  const totalCount = reports.length;
  const totalPages = Math.ceil(totalCount / 10);
  const isLoading = false;
  const error = null;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        {totalCount === 0 ? (
          // 서버 컴포넌트 - 정적 빈 상태
          <EmptyState />
        ) : (
          <>
            {/* 서버 컴포넌트 - 통계 정보 */}
            <ReportStats totalCount={totalCount} sortOrder='latest' />

            {/* 서버 컴포넌트 - 보고서 목록 (props만 받아서 렌더링) */}
            <DailyReportList reports={reports} />

            {/* 클라이언트 컴포넌트 - 페이지네이션 (이벤트 처리 필요) */}
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
