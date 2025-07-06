"use client";

import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useGetStaticsTeamWeek } from "@/hooks/useTeamDashboardQueries";

export const description = "A pie chart with a legend";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
];

const chartConfig: Record<string, { label: string; color: string }> = {
  email: {
    label: "이메일",
    color: COLORS[0],
  },
  git: {
    label: "Git",
    color: COLORS[1],
  },
  docs: {
    label: "문서",
    color: COLORS[2],
  },
  teams: {
    label: "Team 협업",
    color: COLORS[3],
  },
  etc: {
    label: "기타",
    color: COLORS[4],
  },
};

export function ChartPieLegend() {
  const { data, isLoading, isError } = useGetStaticsTeamWeek();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chartData = data
    ? [
        { category: "teams", count: data.teams.post },
        {
          category: "git",
          count: Object.values(data.git).reduce(
            (acc: number, curr: number) => acc + curr,
            0
          ),
        },
        {
          category: "docs",
          count: Object.values(data.docs).reduce(
            (acc: number, curr: number) => acc + curr,
            0
          ),
        },
        {
          category: "email",
          count: Object.values(data.email).reduce(
            (acc: number, curr: number) => acc + curr,
            0
          ),
        },
      ].filter(item => item.count > 0)
    : [];

  const totalCount = chartData.reduce((acc, curr) => acc + curr.count, 0);

  const handlePieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const handlePieLeave = () => {
    setActiveIndex(null);
  };

  if (isLoading) {
    return (
      <Card className='flex flex-col flex-1 shadow-sm h-full'>
        <CardHeader>
          <CardTitle>로딩 중...</CardTitle>
        </CardHeader>
        <CardContent className='flex-1 flex items-center justify-center'>
          <div className='text-muted-foreground animate-pulse'>로딩 중...</div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className='flex flex-col flex-1 shadow-sm h-full'>
        <CardHeader>
          <CardTitle>데이터를 불러오는데 실패했습니다.</CardTitle>
        </CardHeader>
        <CardContent className='flex-1 flex items-center justify-center'>
          <div className='text-destructive'>
            데이터를 불러오는데 실패했습니다.
          </div>
        </CardContent>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card className='flex flex-col flex-1 shadow-sm h-full'>
        <CardHeader className='items-center pb-0'>
          <CardTitle className='text-lg font-semibold'>업무 동향</CardTitle>
          <CardDescription>활동 유형별 분포</CardDescription>
        </CardHeader>
        <CardContent className='flex-1 flex items-center justify-center'>
          <div className='text-muted-foreground text-center'>
            <p className='mb-2'>데이터가 없습니다</p>
            <p className='text-sm'>이번 주에 기록된 활동이 없습니다.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='flex flex-col flex-1 border-0 shadow-none bg-transparent h-full'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='text-lg font-semibold'>업무 동향</CardTitle>
        <CardDescription>활동 유형별 분포</CardDescription>
      </CardHeader>

      <CardContent className='flex-1 flex'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto w-full flex-1 flex flex-col'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={chartData}
                dataKey='count'
                nameKey='category'
                cx='50%'
                cy='50%'
                innerRadius='40%'
                outerRadius='65%'
                cornerRadius={2}
                labelLine={false}
                label={({ x, y, name, value }) => {
                  const percentage = Math.round((value / totalCount) * 100);
                  return percentage > 5 ? (
                    <text
                      x={x}
                      y={y}
                      fill='#fff'
                      textAnchor='middle'
                      dominantBaseline='central'
                      className='text-xs font-medium'
                    >
                      {percentage}%
                    </text>
                  ) : null;
                }}
                paddingAngle={2}
                animationBegin={0}
                animationDuration={800}
                onMouseEnter={handlePieEnter}
                onMouseLeave={handlePieLeave}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartConfig[entry.category].color}
                    stroke='hsl(var(--background))'
                    strokeWidth={2}
                    style={{
                      filter:
                        activeIndex === index
                          ? "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3))"
                          : "none",
                      opacity:
                        activeIndex === null || activeIndex === index ? 1 : 0.7,
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </Pie>

              <text
                x='50%'
                y='47%'
                textAnchor='middle'
                dominantBaseline='middle'
                className='font-semibold text-2xl text-muted-foreground'
              >
                {totalCount}건
              </text>

              {chartData.length > 0 && (
                <>
                  <text
                    x='50%'
                    y='40%'
                    textAnchor='middle'
                    dominantBaseline='middle'
                    className='text-xs text-muted-foreground'
                  >
                    총 활동
                  </text>
                  <text
                    x='50%'
                    y='50%'
                    textAnchor='middle'
                    dominantBaseline='middle'
                    className='text-sm font-medium'
                  >
                    {
                      chartConfig[
                        chartData.sort((a, b) => b.count - a.count)[0].category
                      ].label
                    }
                  </text>
                </>
              )}

              <ChartLegend
                content={
                  <ChartLegendContent nameKey='category' className='text-sm' />
                }
                className='flex-wrap gap-3 *:basis-auto *:justify-center'
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    nameKey='count'
                    formatter={(value, name) => {
                      const label = chartConfig[name as string]?.label || name;
                      const percentage = Math.round(
                        (Number(value) / totalCount) * 100
                      );
                      return `${label}: ${value}건 (${percentage}%)`;
                    }}
                    className='bg-background/95 backdrop-blur-sm border shadow-md p-2 rounded-md'
                  />
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-center gap-1 mt-0 pt-2 border-t border-border/50'>
        <div className='font-medium'>총 활동: {totalCount}건</div>
      </CardFooter>
    </Card>
  );
}
