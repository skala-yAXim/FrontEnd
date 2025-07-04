"use client";

import { containerVariants, itemVariants } from "@/const/animate";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChartBarMultiple } from "./_components/chart/MultipleBarChart";
import { TeamBarCards } from "./_components/TeamBarcards";
import TeamComment from "./_components/TeamComment";
import { TeamSectionCards } from "./_components/TeamSectionCards";

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
          className='z-10 mb-6 px-4 lg:px-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TeamComment />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className='z-10 mb-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TeamSectionCards />
        </motion.div>

        <div className='relative flex flex-col gap-6 px-2 md:px-4 lg:px-6'>
          <motion.div
            className='absolute inset-0 pointer-events-none z-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 1 }}
          />

          <motion.div variants={itemVariants} className='z-10'>
            <TeamBarCards />
          </motion.div>

          <motion.div
            className='z-10 w-full flex-1'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <ChartBarMultiple />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
