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
    <div className='space-y-6 bg-muted rounded-2xl'>
      {/* 공통 ReportActions 컴포넌트 사용 */}
      <ReportActions backHref='/weekly' title='위클리 보고서 상세' />

      {/* 위클리 보고서 내용 - 새로운 interface에 맞게 수정 */}
      <WeeklyReport report={data as WeeklyReportType} />
    </div>
  );
}
