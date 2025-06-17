import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
    <motion.div
      className='flex items-center justify-between mb-5 p-2 px-3 bg-card/60 border border-border/40 rounded-lg shadow-sm'
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='flex items-center gap-2'>
        <div className='flex items-center justify-center w-8 h-8 rounded-full bg-primary/10'>
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-primary'
          >
            <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'></path>
            <rect x='8' y='2' width='8' height='4' rx='1' ry='1'></rect>
          </svg>
        </div>
        <p className='text-sm'>
          총 <span className='font-semibold text-foreground'>{totalCount}</span>
          개의 보고서
        </p>
      </div>

      <Badge
        variant='secondary'
        className='text-xs bg-primary/10 hover:bg-primary/20 text-primary border-primary/20'
      >
        {sortOrder === "latest" ? "최신순" : "과거순"}{" "}
      </Badge>
    </motion.div>
  );
}
