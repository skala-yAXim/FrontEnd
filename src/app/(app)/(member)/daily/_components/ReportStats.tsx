import { Badge } from "@/components/ui/badge";

interface ReportStatsProps {
  totalCount: number;
  sortOrder?: "latest" | "oldest";
}

/**
 * 보고서 통계 표시 컴포넌트
 * 서버 컴포넌트 - props를 받아 정적으로 렌더링
 */
export function ReportStats({
  totalCount,
  sortOrder = "latest",
}: ReportStatsProps) {
  return (
    <div className='flex items-center justify-between mb-4'>
      <p className='text-sm text-muted-foreground'>
        총 <span className='font-semibold'>{totalCount}</span>개의 보고서
      </p>

      <Badge variant='secondary' className='text-xs'>
        {sortOrder === "latest" ? "최신순" : "과거순"}{" "}
      </Badge>
    </div>
  );
}
