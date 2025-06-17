"use client";

import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BarCards } from "./_components/BarCards";
import { ChartPieLegend } from "./_components/chart/PieChart";
import { SectionCards } from "./_components/SectionCards";

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.3,
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
    <div className='flex flex-1 flex-col'>
      <motion.div
        className='@container/main flex flex-1 flex-col'
        initial='hidden'
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className='z-10 mb-6'>
          <PageHeader
            title='대시보드'
            description='지난 일주일 간의 활동 요약 및 통계'
          />
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
            variants={itemVariants}
            className='z-10 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-lg lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2'
          >
            <motion.div
              className='col-span-1'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card className='border-0 overflow-hidden bg-gradient-to-br from-background to-muted/30 shadow-lg'>
                <div className='p-4'>
                  <ChartPieLegend />
                </div>
              </Card>
            </motion.div>
            {/* <ChartPieLegend /> */}
          </motion.div>

          <motion.div variants={itemVariants} className='px-4 lg:px-6 z-10'>
            {/* <ChartAreaInteractive /> */}
          </motion.div>

          {/* <DataTable data={data} /> */}
        </div>
      </motion.div>
    </div>
  );
}
