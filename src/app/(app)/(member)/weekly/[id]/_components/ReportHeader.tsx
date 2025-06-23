interface ReportHeaderProps {
  title: string;
  startDate: string;
  endDate: string;
  summary?: string;
}

/**
 * 보고서 헤더 컴포넌트
 * 서버 컴포넌트 - 정적 제목과 요약 표시
 */
export function ReportHeader({ title, startDate, endDate }: ReportHeaderProps) {
  const nameMatch = title.match(/^(.+?)님의/);
  const name = nameMatch ? nameMatch[1] : "";

  return (
    <div className='bg-muted/20'>
      <div className='max-w-4xl mx-auto px-8 py-8'>
        <div className='text-center mb-8'>
          <h1 className='text-2xl font-bold text-foreground tracking-tight mb-2'>
            주간 업무 보고서
          </h1>
        </div>

        <div className='space-y-4 mb-6'>
          <div className='flex items-center'>
            <span className='text-lg font-semibold text-foreground min-w-[100px]'>
              {name ? `${name}님의` : ""} 위클리 보고서
            </span>
          </div>

          <div className='flex items-center'>
            <span className='text-muted-foreground min-w-[60px] font-medium'>
              기간:
            </span>
            <span className='text-foreground'>
              {startDate} ~ {endDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
