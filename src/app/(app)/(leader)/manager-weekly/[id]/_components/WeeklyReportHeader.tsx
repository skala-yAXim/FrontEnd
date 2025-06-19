import {
  TypographyH1,
  TypographyMuted,
} from "@/components/typography/Typograhpy";
import { Separator } from "@/components/ui/separator";

interface WeeklyReportHeaderProps {
  title: string;
  summary?: string;
}

/**
 * 보고서 헤더 컴포넌트
 * 서버 컴포넌트 - 정적 제목과 요약 표시
 */
export function WeeklyReportHeader({
  title,
  summary,
}: WeeklyReportHeaderProps) {
  return (
    <>
      <div className='space-y-2 flex flex-col gap-2 items-center p-4'>
        <TypographyH1>{title}</TypographyH1>
        <TypographyMuted>{summary}</TypographyMuted>
      </div>
      <Separator />
    </>
  );
}
