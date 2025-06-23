"use client";

import { ReportActions } from "@/components/reports/ReportActions";
import { ReportError } from "@/components/reports/ReportError";
import { ReportSkeleton } from "@/components/reports/ReportSkeleton";
import { useGetMemberWeeklyReport } from "@/hooks/useMemberWeeklyQueries";
import { useParams } from "next/navigation";
import MemberWeeklyReport from "./_components/MemberWeeklyReport";

export default function MemberWeeklyReportDetailPage() {
  const reportId = useParams().id as string;
  const {
    data: reportData,
    isLoading,
    isError,
  } = useGetMemberWeeklyReport(Number(reportId));

  const handlePdfDownload = () => {
    alert("PDF 다운로드 기능이 구현될 예정입니다.");
  };

  if (isLoading) return <ReportSkeleton />;
  if (isError)
    return <ReportError error={isError.toString()} href='/manager-weekly' />;
  if (!reportData) {
    return (
      <div className='flex flex-col items-center justify-center py-12 space-y-4'>
        <div className='text-lg font-medium text-gray-900'>
          보고서를 찾을 수 없습니다
        </div>
        <div className='text-sm text-gray-500'>
          요청하신 보고서가 존재하지 않거나 접근 권한이 없습니다.
        </div>
        <a
          href='/manager-weekly'
          className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
        >
          목록으로 돌아가기
        </a>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <ReportActions
        backHref='/manager-weekly'
        title='팀원 위클리 보고서 상세'
        onPdfDownload={handlePdfDownload}
      />
      <MemberWeeklyReport report={reportData.report} />
    </div>
  );
}
