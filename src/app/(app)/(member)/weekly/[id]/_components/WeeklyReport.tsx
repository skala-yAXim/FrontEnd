import { ReportLayout } from "@/components/reports/ReportLayout";
import { WeeklyReport as WeeklyReportType } from "@/types/weeklyReportType";
import NextWeekScheduleSection from "./NextWeekScheduleSection";
import { ReflectionSection } from "./ReflectionSection";
import { ReportContent } from "./ReportContent";
import { ReportHeader } from "./ReportHeader";

/**
 * 위클리 보고서 메인 컴포넌트
 * 서버 컴포넌트 - 하위 컴포넌트들을 조합
 */
export default function WeeklyReport({
  title,
  startDate,
  endDate,
  report,
}: WeeklyReportType) {
  const weeklyReport = report.weekly_report;
  const weeklyReflection = report.weekly_reflection;

  return (
    <ReportLayout>
      {/* 서버 컴포넌트 - 정적 헤더 */}
      <ReportHeader title={title} startDate={startDate} endDate={endDate} />

      {/* 프로젝트 정보 및 개요 */}
      {weeklyReport.map(report => {
        return (
          <div key={report.project_id} className='max-w-4xl mx-auto mb-6 p-6'>
            <div className='flex items-center gap-3 pb-6'>
              <div className='h-0.5 w-6 bg-muted-foreground/50'></div>
              <h3 className='text-lg font-bold text-foreground tracking-tight'>
                [{report.project_name}]
              </h3>
              <div className='flex-1 h-0.5 bg-muted-foreground/50'></div>
            </div>
            <div className='text-muted-foreground text-md mb-6'>
              프로젝트 기간: {report.project_period}
            </div>
            <div className='mb-6'>
              <h3 className='text-xl font-bold text-foreground mb-4'>개요</h3>
              <p className='text-foreground'>{report.summary}</p>
            </div>

            {/* 클라이언트 컴포넌트 - 인터랙티브 콘텐츠 */}
            <ReportContent contents={report.contents} />

            {/* 각 프로젝트별 차주 계획 추가 */}
            {report.next_week_schedule.length > 0 && (
              <div className='mt-8'>
                <h3 className='text-lg font-bold text-foreground mb-4'>
                  [{report.project_name}] 차주 계획
                </h3>
                <NextWeekScheduleSection
                  schedules={report.next_week_schedule}
                />
              </div>
            )}
          </div>
        );
      })}

      {/* 주간 회고 */}
      <div className='max-w-4xl mx-auto mb-8 p-6'>
        <h2 className='text-xl font-bold text-foreground mb-4'>
          {weeklyReflection.title}
        </h2>
        <ReflectionSection content={weeklyReflection.content} />
      </div>

      {/* 기존 차주 계획 섹션 제거*/}
    </ReportLayout>
  );
}
