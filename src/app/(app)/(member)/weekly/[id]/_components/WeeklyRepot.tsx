import { WeeklyReportData } from "@/types/reportType";
import { ReflectionSection } from "../_components/ReflectionSection";
import { ReportContent } from "../_components/ReportContent";
import { ReportHeader } from "../_components/ReportHeader";

/**
 * 위클리 보고서 메인 컴포넌트
 * 서버 컴포넌트 - 하위 컴포넌트들을 조합
 */
export default function WeeklyReport({
  report_title,
  id,
  weekly_report,
  weekly_reflection,
}: WeeklyReportData) {
  return (
    <div className='space-y-6 max-w-6xl mx-auto'>
      {/* 서버 컴포넌트 - 정적 헤더 */}
      <ReportHeader title={report_title} summary={weekly_report?.summary} />

      {/* 클라이언트 컴포넌트 - 인터랙티브 콘텐츠 */}
      {weekly_report?.contents && (
        <ReportContent contents={weekly_report.contents} />
      )}

      {/* 서버 컴포넌트 - 정적 회고 */}
      {weekly_reflection?.content && (
        <ReflectionSection reflections={weekly_reflection} />
      )}
    </div>
  );
}
