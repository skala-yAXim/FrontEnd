"use client";

import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { containerVariants, itemVariants } from "@/const/animate";
import { useGetDailyReports } from "@/hooks/useUserDailyQueries";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useServerPagination } from "../../../../hooks/useServerPagination";
import { DailyReportList } from "./_components/DailyReportList";
import { EmptyState } from "./_components/EmptyState";
import { LoadingSpinner } from "./_components/LoadingSpinner";
import { ReportStats } from "./_components/ReportStats";

/**
 * MEM01M01 - 개인 데일리 보고서 목록 (내용 부분만)
 * 설계서 기준: 개인 데일리 보고서 목록 표시 화면
 */
export default function DailyReportsPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 페이지네이션 훅 사용
  const pagination = useServerPagination({
    initialPage: 0,
    initialSize: 7,
    initialSort: "createdAt,desc",
  });

  const {
    data: dailyReportsData,
    isLoading,
    isError,
  } = useGetDailyReports(pagination.pageRequest);

  const dailyReports = dailyReportsData?.content || [];
  const totalItems = dailyReportsData?.totalElements || 0;
  const totalPages = dailyReportsData?.totalPages || 0;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='flex flex-1 flex-col'>
      <motion.div
        className='@container/main flex flex-1 flex-col'
        initial='hidden'
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className='z-10'>
          <PageHeader
            title='데일리 보고서'
            description='지난 데일리 보고서들을 확인하고 새로운 보고서를 자동으로 생성할 수 있습니다.'
          />
        </motion.div>

        <motion.div variants={itemVariants} className='relative p-6 pt-0'>
          {/* 배경 효과 */}
          <motion.div
            className='absolute inset-0 pointer-events-none z-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 1 }}
          />

          {totalItems === 0 ? (
            <motion.div variants={itemVariants}>
              <EmptyState />
            </motion.div>
          ) : (
            <>
              <motion.div variants={itemVariants} className='z-10'>
                <ReportStats totalCount={totalItems} sortOrder='latest' />
              </motion.div>

              <motion.div variants={itemVariants} className='z-10'>
                <DailyReportList reports={dailyReports} />
              </motion.div>

              <motion.div variants={itemVariants} className='z-10 mt-6'>
                <Pagination
                  {...pagination.getPaginationProps(totalItems)}
                  showPageInfo={true}
                  showResultInfo={true}
                />
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
