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
    // if (cards.length <= 1) return;

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
    <div className='relative w-full mx-auto h-[200px] rounded-xl'>
      <Card
        className='@container/card from-primary/5 to-card dark:bg-card bg-gradient-to-t shadow-xs mx-h-[200px] rounded-xl'
        data-slot='card'
      >
        <div
          className={`transition-all duration-400
            ${isAnimating ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}
          `}
          style={{ willChange: "opacity, transform" }}
        >
          <CardHeader>
            <CardDescription>
              {card.badgeIcon}
              {card.title}
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>{card.badge}</Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='text-muted-foreground'>{card.subtext}</div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
