"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
// ✅ 로컬 복사본 사용 (짧은 경로)
import { ChartBarMultiple } from "./chart/MultipleBarChart";
import { ChartBarStacked } from "./chart/StackedBarChart";

export function TeamBarCards() {
  return (
    <div className='grid grid-cols-1 w-full gap-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 lg:px-0 px-2'>
      <motion.div
        className='col-span-2'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.01 }}
      >
        <Card className='border-1 overflow-hidden shadow-none'>
          <div className='px-4'>
            <ChartBarStacked /> {/* 로컬 복사본 */}
          </div>
        </Card>
      </motion.div>

      <motion.div
        className='col-span-2'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.01 }}
      >
        <Card className='border-1 overflow-hidden shadow-none'>
          <div className='px-4'>
            <ChartBarMultiple /> {/* 로컬 복사본 */}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
