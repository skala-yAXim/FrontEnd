import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyReportList as DailyReportListType } from "@/types/reportType";
import { motion } from "framer-motion";
import Link from "next/link";

interface DailyReportListProps {
  reports: DailyReportListType[];
}

export function DailyReportList({ reports }: DailyReportListProps) {
  // 애니메이션 변수
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className='space-y-4'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {reports.map((report, index) => (
        <motion.div key={report.id} variants={itemVariants} custom={index}>
          <Link href={`/daily/${report.id}`} className='group block'>
            <Card className='relative overflow-hidden border transition-all max-h-32 duration-300 ease-out hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30 cursor-pointer bg-card/90'>
              {/* 왼쪽 액센트 바 */}
              <div className='absolute left-0 top-0 h-full w-1 bg-primary/20 transition-all duration-300 group-hover:w-2 group-hover:bg-primary' />

              {/* 배경 효과 */}
              <div className='absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <div className='absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div className='flex-1 space-y-2 pl-3'>
                    {/* 제목 */}
                    <CardTitle className='text-lg leading-tight line-clamp-2 transition-colors duration-200 group-hover:text-primary'>
                      {report.title}
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
              <CardContent className='pl-8'>
                <p className='text-muted-foreground text-sm line-clamp-1 transition-colors duration-200 group-hover:text-foreground/80'>
                  {report.preview || "보고서 내용이 없습니다."}
                </p>
              </CardContent>

              {/* 호버 시 나타나는 미묘한 그라데이션 오버레이 */}
              <div className='absolute inset-0 bg-gradient-to-r from-primary/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none' />
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
