import { TypographyMuted } from "@/components/typography/Typograhpy";
import { Separator } from "@/components/ui/separator";

interface ReportHeaderProps {
  title: string;
  summary?: string;
}

/**
 * 보고서 헤더 컴포넌트
 * 서버 컴포넌트 - 정적 제목과 요약 표시
 */
export function ReportHeader({ title, summary }: ReportHeaderProps) {
  // 제목에서 정보 추출
  const dateMatch = title.match(/(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : "";
  const nameMatch = title.match(/^(.+?)님의/);
  const name = nameMatch ? nameMatch[1] : "";

  return (
    <div className='bg-muted/20'>
      <div className='max-w-4xl mx-auto px-8 py-8'>
        {/* 보고서 제목 */}
        <div className='text-center mb-8'>
          <h1 className='text-2xl font-bold text-foreground tracking-tight mb-2'>
            {title}
          </h1>
        </div>

        {/* 보고서 정보 */}
        <div className='space-y-4 mb-6'>
          <div className='flex items-center'>
            <span className='text-lg font-semibold text-foreground min-w-[100px]'>
              {name ? `${name}님의` : ""} 데일리 보고서
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

        {/* 요약 */}
        {summary && (
          <div className='bg-muted/50 border-l-4 border-muted-foreground p-4 mb-6'>
            <h3 className='text-sm font-semibold text-muted-foreground mb-2'>
              업무 요약
            </h3>
            <TypographyMuted className='text-muted-foreground leading-relaxed'>
              {summary}
            </TypographyMuted>
          </div>
        )}
      </div>
      <Separator className='border-border' />
    </div>
  );
}
