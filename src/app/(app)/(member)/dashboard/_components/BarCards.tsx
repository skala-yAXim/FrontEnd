"use client";

import { motion } from "framer-motion";
import { ChartBarStacked } from "./chart/StackedBarChart";

export function BarCards() {
  return (
    <div className='grid grid-cols-1 w-full gap-6 lg:px-0 px-2'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className='border-1 overflow-hidden shadow-none h-full flex flex-col bg-background/50 rounded-lg p-2'>
          <div className='flex-1 flex flex-col'>
            <ChartBarStacked />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
