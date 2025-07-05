"use client";

import { containerVariants, itemVariants } from "@/const/animate";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import TeamComment from "./_components/TeamComment";
import { TeamSectionCards } from "./_components/TeamSectionCards";
import { ChartBarMultiple } from "./_components/chart/MultipleBarChart";
import { ChartPieLegend } from "./_components/chart/PieChart";
import { ChartBarStacked } from "./_components/chart/StackedBarChart";

export default function TeamDashboardPage() {
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
          className='z-10 px-4 lg:px-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TeamComment />
        </motion.div>

        <div className='flex flex-col gap-6 px-2 md:px-4 lg:px-6'>
          <motion.div
            variants={itemVariants}
            className='z-10 mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className='flex flex-col lg:flex-row gap-6 w-full min-h-[350px]'>
              <div className='w-full lg:w-3/5 bg-background/50 rounded-lg p-2 border-1'>
                <TeamSectionCards />
              </div>
              <div className='w-full lg:w-2/5 bg-background/50 rounded-lg p-2 border-1'>
                <ChartPieLegend />
              </div>
            </div>
          </motion.div>
        </div>

        <div className='relative flex flex-col gap-6 px-2 md:px-4 lg:px-6'>
          <motion.div
            className='absolute inset-0 pointer-events-none z-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 1 }}
          />

          <motion.div
            variants={itemVariants}
            className='z-10 mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className='flex flex-col lg:flex-row gap-6 w-full min-h-[400px]'>
              <div className='w-full lg:w-1/2 bg-background/50 rounded-lg p-2 border-1'>
                <ChartBarStacked />
              </div>
              <div className='w-full lg:w-1/2 bg-background/50 rounded-lg p-2 border-1'>
                <ChartBarMultiple />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
