"use client";

import { ReportActions } from "@/components/reports/ReportActions";
import { ReportError, ReportNotFound } from "@/components/reports/ReportError";
import { ReportSkeleton } from "@/components/reports/ReportSkeleton";
import { useGetUserWeeklyReport } from "@/hooks/useUserWeeklyQueries";
import { WeeklyReport as WeeklyReportType } from "@/types/weeklyReportType";
import { useParams } from "next/navigation";
import WeeklyReport from "./_components/WeeklyReport";

export default function WeeklyReportDetailPage() {
  const params = useParams();
  const reportId = params.id as string;

  const { data, isLoading, isError } = useGetUserWeeklyReport(Number(reportId));

  // PDF 다운로드 핸들러
  const handlePdfDownload = async () => {
    try {
      // TODO: 실제 PDF 생성 API 호출
      alert("PDF 다운로드 기능이 구현될 예정입니다.");
    } catch (error) {
      console.error("PDF 다운로드 실패:", error);
    }
  };

  if (isLoading) {
    return <ReportSkeleton />;
  }

  if (isError) {
    return <ReportError error={isError.toString()} href='/weekly' />;
  }

  if (!data) {
    return <ReportNotFound href='/weekly' />;
  }

  return (
    <div className='space-y-6'>
      {/* 공통 ReportActions 컴포넌트 사용 */}
      <ReportActions
        backHref='/weekly'
        title='위클리 보고서 상세'
        onPdfDownload={handlePdfDownload}
      />

      {/* 위클리 보고서 내용 */}
      <WeeklyReport {...(data as WeeklyReportType)} />
    </div>
  );
}
