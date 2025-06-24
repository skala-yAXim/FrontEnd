"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetDashboardTeam } from "@/hooks/useTeamDashboardQueries";
import { StackedBarChartData } from "@/types/statisticsType";
import { aggregateToWeekdayChart } from "./_utils/TransformData";

export const description = "A stacked bar chart with a legend";

const chartConfig = {
  email: {
    label: "Email",
    color: "hsl(var(--chart-1))",
  },
  git: {
    label: "Git",
    color: "hsl(var(--chart-2))",
  },
  docs: {
    label: "Docs",
    color: "hsl(var(--chart-3))",
  },
  teams: {
    label: "Teams",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function ChartBarStacked() {
  const { data: dashboardUser, isLoading, isError } = useGetDashboardTeam();

  // 데이터 전처리
  const chartData: StackedBarChartData[] = dashboardUser
    ? aggregateToWeekdayChart(dashboardUser)
    : [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>일일 업무 활동</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-center h-40 text-muted-foreground'>
            로딩 중...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>일일 업무 활동</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-center h-40 text-destructive'>
            데이터를 불러오는데 실패했습니다.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='mt-0 border-0 shadow-none bg-transparent'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>주간 활동 요약</CardTitle>
        <CardDescription>일주일 간의 활동 유형별 통계</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='day'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey='email'
              stackId='a'
              fill='var(--color-email)'
              radius={[0, 0, 4, 4]}
            />
            <Bar dataKey='git' stackId='a' fill='var(--color-git)' />
            <Bar dataKey='docs' stackId='a' fill='var(--color-docs)' />
            <Bar
              dataKey='teams'
              stackId='a'
              fill='var(--color-teams)'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
