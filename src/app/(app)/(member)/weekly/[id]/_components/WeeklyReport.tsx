import { ReportLayout } from "@/components/reports/ReportLayout";
import type { WeeklyReport } from "@/types/weeklyReportType";
import NextWeekScheduleSection from "./NextWeekScheduleSection";
import { ReflectionSection } from "./ReflectionSection";
import { ReportContent } from "./ReportContent";
import { ReportHeader } from "./ReportHeader";

/**
 * 위클리 보고서 메인 컴포넌트
 * 서버 컴포넌트 - 하위 컴포넌트들을 조합
 */
interface WeeklyReportProps {
  report: WeeklyReport;
}

export default function WeeklyReport({ report }: WeeklyReportProps) {
  const weeklyTitle = report.report.report_title;
  const weeklyReport = report.report.weekly_report;
  const weeklyReflection = report.report.weekly_reflection;

  return (
    <ReportLayout>
      {/* 서버 컴포넌트 - 정적 헤더 */}
      <ReportHeader
        title={report.title}
        startDate={report.startDate}
        endDate={report.endDate}
      />

      {!weeklyReport || weeklyReport.length === 0 ? (
        <div className='max-w-4xl mx-auto mb-6 p-6 text-center'>
          <p className='text-muted-foreground'>
            주간 보고서 데이터가 없습니다.
          </p>
        </div>
      ) : (
        // 기존 map 로직 (변수명 충돌 방지)
        weeklyReport?.map(projectReport => {
          return (
            <div
              key={projectReport.project_id}
              className='max-w-4xl mx-auto mb-6 p-6'
            >
              <div className='flex items-center gap-3 pb-6'>
                <div className='h-0.5 w-6 bg-muted-foreground/50'></div>
                <h3 className='text-lg font-bold text-foreground tracking-tight'>
                  [{projectReport.project_name}]
                </h3>
                <div className='flex-1 h-0.5 bg-muted-foreground/50'></div>
              </div>
              <div className='text-foreground text-md mb-6'>
                프로젝트 기간: {projectReport.project_period}
              </div>
              <div className='mb-6'>
                <h3 className='text-xl font-bold text-foreground mb-4'>개요</h3>
                <p className='text-foreground'>{projectReport.summary}</p>
              </div>

              {/* 클라이언트 컴포넌트 - 인터랙티브 콘텐츠 */}
              <ReportContent contents={projectReport.contents} />

              {/* 각 프로젝트별 차주 계획 추가 */}
              {projectReport.next_week_schedule?.length > 0 && (
                <div className='mt-8'>
                  <h3 className='text-lg font-bold text-foreground mb-4'>
                    [{projectReport.project_name}] 차주 계획
                  </h3>
                  <NextWeekScheduleSection
                    schedules={projectReport.next_week_schedule}
                  />
                </div>
              )}
            </div>
          );
        })
      )}

      {/* 주간 회고 */}
      <div className='max-w-4xl mx-auto mb-8 p-6'>
        <h2 className='text-xl font-bold text-foreground mb-4'>
          {weeklyReflection?.title || "주간 회고 및 개선점"}
        </h2>
        <ReflectionSection content={weeklyReflection?.content || []} />
      </div>

      {/* 기존 차주 계획 섹션 제거*/}
    </ReportLayout>
  );
}
