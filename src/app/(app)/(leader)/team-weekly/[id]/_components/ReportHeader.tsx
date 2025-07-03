import { TeamWeeklyReportData } from "@/types/reportType";

export default function ReportHeader(report: TeamWeeklyReportData) {
  console.log(report);

  const dateMatch = report.title.match(/(\d{4}-\d{2}-\d{2})/);
  const date = report.endDate ? report.endDate.split("T")[0] : "";
  const nameMatch = report.title.match(/^(.+?)의/);
  const name = nameMatch ? nameMatch[1] : "";
  return (
    <div>
      <div className='max-w-4xl mx-auto px-8 py-4'>
        <div className='text-center mb-8'>
          <h1 className='text-2xl font-bold text-foreground tracking-tight mb-2'>
            팀 주간 업무 보고서
          </h1>
        </div>
      </div>

      <div className='space-y-4 mb-6'>
        <div className='flex items-center'>
          <span className='text-lg font-semibold text-foreground min-w-[100px]'>
            {name ? `${name} 팀의` : ""} 주간 보고서
          </span>
        </div>

        {date && (
          <div className='flex items-center'>
            <span className='text-muted-foreground min-w-[60px] font-medium'>
              일자:
            </span>
            <span className='text-foreground ml-2'>{date}</span>
          </div>
        )}
      </div>
    </div>
  );
}
