"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";

// 카드에 들어갈 데이터 타입
type DashboardCard = {
  title: string;
  description: string;
  value: string;
  badge: string;
  badgeIcon?: React.ReactNode;
  trend: string;
  trendIcon?: React.ReactNode;
  subtext: string;
};

export function CarouselCard({ cards }: { cards: DashboardCard[] }) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // 카드가 1개일 때는 애니메이션 효과를 적용하지 않음
    if (cards.length <= 1) return;

    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % cards.length);
        setIsAnimating(false);
      }, 400); // 애니메이션 시간과 맞춤
    }, 8000);
    return () => clearInterval(timer);
  }, [cards.length]);

  const card = cards[index];

  return (
    <motion.div
      className='relative w-full mx-auto h-[200px] rounded-xl overflow-hidden'
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <Card
        className='@container/card h-full dark:bg-card border-1 overflow-hidden rounded-xl shadow-none'
        data-slot='card'
      >
        <AnimatePresence mode='wait'>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className='h-full flex flex-col'
          >
            <CardHeader className='pb-1'>
              <CardDescription className='flex items-center gap-2 text-sm font-medium'>
                <span className='flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary'>
                  {card.badgeIcon}
                </span>
                <span className='text-foreground/90'>{card.title}</span>
              </CardDescription>
              <CardTitle className='text-2xl font-bold tracking-tight tabular-nums @[250px]/card:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80'>
                {card.value}
              </CardTitle>
              <CardAction>
                <Badge
                  variant='outline'
                  className='bg-primary/5 hover:bg-primary/10 transition-colors border-primary/20 text-primary'
                >
                  {card.badge}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm mt-auto'>
              <div className='text-muted-foreground flex items-center gap-1.5'>
                <span className='inline-block w-2 h-2 rounded-full bg-primary/50'></span>
                {card.subtext}
              </div>
            </CardFooter>
          </motion.div>
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
