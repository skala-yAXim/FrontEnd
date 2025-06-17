import { DailyReportData } from "@/types/reportType";
import { ReflectionSection } from "./ReflectionSection";
import { ReportContent } from "./ReportContent";
import { ReportHeader } from "./ReportHeader";

/**
 * 데일리 보고서 메인 컴포넌트
 * 서버 컴포넌트 - 하위 컴포넌트들을 조합
 */
export default function DailyReport({ title, report }: DailyReportData) {
  return (
    <div className='space-y-6 max-w-6xl mx-auto'>
      {/* 서버 컴포넌트 - 정적 헤더 */}
      <ReportHeader
        title={report.report_title}
        summary={report.daily_report?.summary}
      />

      {/* 클라이언트 컴포넌트 - 인터랙티브 콘텐츠 */}
      {report.daily_report?.contents && (
        <ReportContent contents={report.daily_report.contents} />
      )}

      {/* 서버 컴포넌트 - 정적 회고 */}
      {report.daily_reflection?.contents && (
        <ReflectionSection reflections={report.daily_reflection} />
      )}
    </div>
  );
}
