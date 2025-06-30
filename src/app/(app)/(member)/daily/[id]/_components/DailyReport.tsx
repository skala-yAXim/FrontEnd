import { DailyReportData } from "@/types/reportType";
import { ReportContent } from "./ReportContent";
import { ReportHeader } from "./ReportHeader";

/**
 * 데일리 보고서 메인 컴포넌트
 * 서버 컴포넌트 - 하위 컴포넌트들을 조합
 */
export default function DailyReport({ title, report }: DailyReportData) {
  return (
    <div className='min-h-screen bg-background w-full max-w-5xl rounded-lg mx-auto py-8 px-4 sm:px-6 lg:px-16'>
      {/* 헤더 */}
      <ReportHeader
        title={report.report_title}
        summary={report.daily_report?.summary}
      />

      {/* 업무 내용 */}
      {report.daily_report?.contents && (
        <ReportContent contents={report.daily_report.contents} />
      )}
    </div>
  );
}
