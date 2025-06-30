import { ProjectReportItem, TeamWeeklyReportData } from "@/types/reportType";
import { HighlightsCard } from "./HighlightsCards";

const getProgressColor = (progress: number) => {
  if (progress <= 30) return "bg-red-500";
  if (progress <= 70) return "bg-yellow-500";
  return "bg-green-500";
};

export default function TeamWeeklyReportDetail({
  reportJson,
}: TeamWeeklyReportData) {
  const renderProjectItem = (item: ProjectReportItem, index: number) => (
    <div key={index} className='mb-12'>
      <h3 className='text-xl font-bold text-gray-800 mb-2'>
        [{item.project_name}]
      </h3>
      <div className='w-full h-px bg-gray-300 my-4' />

      <p className='text-gray-700 mb-6 px-3 leading-relaxed'>{item.summary}</p>

      <div className='flex items-center mb-6 px-3'>
        <span className='text-sm font-medium text-gray-700 mr-4 whitespace-nowrap'>
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

      {reportJson.team_weekly_report.map((item, index) =>
        renderProjectItem(item, index)
      )}
    </div>
  );
}
