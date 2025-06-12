import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyReportData } from "@/types/reportType";
import Link from "next/link";

interface DailyReportListProps {
  reports: DailyReportData[];
}

export function DailyReportList({ reports }: DailyReportListProps) {
  return (
    <div className='space-y-4'>
      {reports.map(report => (
        <Link
          key={report.id}
          href={`/daily/${report.id}`}
          className='group block'
        >
          <Card className='relative overflow-hidden border transition-all duration-300 ease-out hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30 cursor-pointer'>
            {/* 왼쪽 액센트 바 */}
            <div className='absolute left-0 top-0 h-full w-1 bg-primary/20 transition-all duration-300 group-hover:w-2 group-hover:bg-primary' />

            <CardHeader className='pb-1.5 pt-3'>
              <div className='flex items-start justify-between'>
                <div className='flex-1 space-y-2 pl-3'>
                  {/* 제목 */}
                  <CardTitle className='text-lg leading-tight line-clamp-2 transition-colors duration-200 group-hover:text-primary'>
                    {report.report_title}
                  </CardTitle>
                </div>

                {/* 화살표 아이콘 */}
                <div className='flex items-center ml-4'>
                  <div className='p-2 rounded-full bg-muted/50 text-muted-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:translate-x-1'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <polyline points='9,18 15,12 9,6'></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* 간단한 내용 미리보기 */}
            <CardContent className='pt-0 pb-3 pl-8'>
              <p className='text-muted-foreground text-sm line-clamp-2 transition-colors duration-200 group-hover:text-foreground/80'>
                {report.daily_report?.summary}
              </p>
            </CardContent>

            {/* 호버 시 나타나는 미묘한 그라데이션 오버레이 */}
            <div className='absolute inset-0 bg-gradient-to-r from-primary/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none' />
          </Card>
        </Link>
      ))}
    </div>
  );
}
