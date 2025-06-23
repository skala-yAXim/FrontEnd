"use client";

import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { containerVariants, itemVariants } from "@/const/animate";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BarCards } from "./_components/BarCards";
import { ChartPieLegend } from "./_components/chart/PieChart";
import { SectionCards } from "./_components/SectionCards";
import UserComment from "./_components/UserComment";

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className='flex flex-1 flex-col'>
      <motion.div
        className='@container/main flex flex-1 flex-col'
        initial='hidden'
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          className='z-10'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PageHeader
            title='대시보드'
            description='지난 일주일 간의 활동 요약 및 통계'
          />
        </motion.div>

        <motion.div
          className='z-10 mb-6 px-4 lg:px-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <UserComment />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className='z-10 mb-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionCards />
        </motion.div>

        <div className='relative flex flex-col gap-6 px-2 md:px-4 lg:px-6'>
          <motion.div
            className='absolute inset-0 pointer-events-none z-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 1 }}
          />

          <motion.div variants={itemVariants} className='z-10'>
            <BarCards />
          </motion.div>

          <motion.div
            className='z-10 grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-2'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ scale: 1.01 }}
          >
            <Card className='border-1 overflow-hidden shadow-none'>
              <div className='px-4'>
                <ChartPieLegend />
              </div>
            </Card>
          </motion.div>

          {/* <DataTable data={data} /> */}
        </div>
      </motion.div>
    </div>
  );
}
