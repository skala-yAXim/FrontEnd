import { MemberWeeklyReportData } from "@/types/reportType";
import { WeeklyReflectionSection } from "./WeeklyReflectionSection";
import { WeeklyReportContent } from "./WeeklyReportContent";
import { WeeklyReportHeader } from "./WeeklyReportHeader";

/**
 * 팀원 위클리 보고서 메인 컴포넌트
 * 서버 컴포넌트 - 하위 컴포넌트들을 조합
 */

interface MemberWeeklyReportProps {
  report: MemberWeeklyReportData["report"];
}

export default function MemberWeeklyReport({
  report,
}: MemberWeeklyReportProps) {
  return (
    <div className='space-y-6 max-w-6xl mx-auto'>
      <WeeklyReportHeader
        title={report.report_title}
        summary={report.weekly_report?.summary}
      />

      {report.weekly_report?.contents && (
        <WeeklyReportContent contents={report.weekly_report.contents} />
      )}

      {report.weekly_reflection && (
        <WeeklyReflectionSection reflections={report.weekly_reflection} />
      )}
    </div>
  );
}
