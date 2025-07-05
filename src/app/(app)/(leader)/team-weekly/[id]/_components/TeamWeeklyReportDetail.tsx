import { ProjectReportItem, TeamWeeklyReportData } from "@/types/reportType";
import { HighlightsCard } from "./HighlightsCards";

const getProgressColor = (progress: number) => {
  if (progress <= 30) return "bg-red-500";
  if (progress <= 70) return "bg-yellow-500";
  return "bg-green-500";
};

const ProgressLegend = () => (
  <div className='flex items-center gap-6 mb-4 px-3'>
    <span className='text-sm font-medium text-black'>진행도 범례:</span>
    <div className='flex items-center gap-4'>
      <div className='flex items-center gap-1'>
        <div className='w-4 h-4 bg-red-500 rounded'></div>
        <span className='text-xs text-gray-600'>(0-30%)</span>
      </div>
      <div className='flex items-center gap-1'>
        <div className='w-4 h-4 bg-yellow-500 rounded'></div>
        <span className='text-xs text-gray-600'>(31-70%)</span>
      </div>
      <div className='flex items-center gap-1'>
        <div className='w-4 h-4 bg-green-500 rounded'></div>
        <span className='text-xs text-gray-600'>(71-100%)</span>
      </div>
    </div>
  </div>
);

export default function TeamWeeklyReportDetail({
  reportJson,
}: TeamWeeklyReportData) {
  const renderProjectItem = (item: ProjectReportItem, index: number) => (
    <div key={index} className='mb-12'>
      <h3 className='text-xl font-bold text-gray-800 mb-2'>
        [{item.project_name}]
      </h3>
      <div className='flex items-start gap-3 px-4 py-4 border-t border-gray-300'>
        <span className='text-black font-medium mt-1'>•</span>
        <p className='text-black leading-relaxed'>{item.summary}</p>
      </div>

      {/* 프로젝트별 차주 계획 - 이 부분을 summary 다음에 추가 */}
      {item.next_week_schedule.length > 0 && (
        <div className='mb-6'>
          <h4 className='text-lg font-medium mb-3 px-4'>차주 계획</h4>
          <div className='space-y-2 ml-4'>
            {item.next_week_schedule.map((schedule, index) => (
              <div key={index} className='flex items-start gap-3 px-4'>
                <span className='text-black font-medium mt-1'>•</span>
                <div className='flex-1'>
                  <div className='flex justify-between items-start mb-1'>
                    <p className='text-black font-medium leading-relaxed'>
                      {schedule.task_name}
                    </p>
                    <span className='text-sm text-gray-500 ml-4 whitespace-nowrap'>
                      {schedule.start_date} ~ {schedule.end_date}
                    </span>
                  </div>
                  <p className='text-black text-sm leading-relaxed'>
                    {schedule.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ProgressLegend />

      <div className='flex items-center mb-6 px-3'>
        <span className='text-sm font-medium text-black mr-4 whitespace-nowrap'>
          프로젝트 진행도
        </span>

        <div className='relative flex-1 h-4 bg-gray-200 rounded-full mx-4 w-full max-w-[600px] overflow-hidden'>
          <div
            className={`h-4 rounded-full transition-all duration-500 ${getProgressColor(item.team_progress_overview.overall_progress)}`}
            style={{
              width: `${item.team_progress_overview.overall_progress}%`,
            }}
          ></div>
        </div>

        <span className='text-sm font-medium text-gray-700 whitespace-nowrap'>
          {item.team_progress_overview.overall_progress}%
        </span>
      </div>

      <div className='grid grid-cols-1 gap-6'>
        {item.highlights.map((highlight, index) => (
          <HighlightsCard key={index} highlight={highlight} />
        ))}
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-muted/20 py-12 px-4 sm:px-6 lg:px-12'>
      <h2 className='text-2xl font-bold mb-8'>팀 업무 상세</h2>
      {/* 팀 회고 섹션 - 코리안 보고서 스타일 */}
      {reportJson.team_weekly_reflection.content.length > 0 && (
        <div className='mb-12'>
          <h3 className='text-xl font-semibold mb-4 border-b border-gray-300 pb-2'>
            주간 리뷰
          </h3>
          <div className='space-y-2 ml-4'>
            {reportJson.team_weekly_reflection.content.map((item, index) => (
              <div key={index} className='flex items-start gap-3'>
                <span className='text-black font-medium mt-1'>•</span>
                <p className='text-black leading-relaxed'>{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {reportJson.team_weekly_report.map((item, index) =>
        renderProjectItem(item, index)
      )}
    </div>
  );
}
