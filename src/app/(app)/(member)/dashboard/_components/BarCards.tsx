"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  //   CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardAction } from "@/components/ui/card-action";
import { motion } from "framer-motion";
import { ChartBarMultiple } from "./chart/MultipleBarChart";
import { ChartBarStacked } from "./chart/StackedBarChart";

export function BarCards() {
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
            <ChartBarStacked />
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
            <ChartBarMultiple />
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

// 사용 예시 (기존 코드에 맞게 조정하세요)
export function ExampleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>카드 제목</CardTitle>
        <CardDescription>카드 설명 텍스트입니다.</CardDescription>
      </CardHeader>
      <CardAction>
        <Button variant='outline' size='sm'>
          취소
        </Button>
        <Button size='sm'>확인</Button>
      </CardAction>
      <CardFooter>
        <p>카드 푸터 영역입니다.</p>
      </CardFooter>
    </Card>
  );
}
