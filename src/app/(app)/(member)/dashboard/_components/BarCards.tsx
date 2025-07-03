"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChartPieLegend } from "./chart/PieChart";
import { ChartBarStacked } from "./chart/StackedBarChart";

export function BarCards() {
  return (
    <div className='grid grid-cols-1 w-full gap-6 @xl/main:grid-cols-2 lg:px-0 px-2'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className='border-1 overflow-hidden shadow-none h-full flex flex-col'>
          <div className='flex-1 flex flex-col'>
            <ChartBarStacked />
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className='border-1 overflow-hidden shadow-none h-full flex flex-col'>
          <div className='flex-1 flex flex-col'>
            <ChartPieLegend />
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
