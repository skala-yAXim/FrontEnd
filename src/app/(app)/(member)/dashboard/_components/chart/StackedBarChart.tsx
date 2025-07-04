"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";

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
import { useGetDashboardUser } from "@/hooks/useDashboardQueries";
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
  const { data: dashboardUser, isLoading, isError } = useGetDashboardUser();

  // 데이터 전처리
  const chartData: StackedBarChartData[] = dashboardUser
    ? aggregateToWeekdayChart(dashboardUser)
    : [];

  if (isLoading) {
    return (
      <Card className='border-1 overflow-hidden shadow-none h-full flex flex-col'>
        <CardHeader>
          <CardTitle>일일 업무 활동</CardTitle>
          <CardDescription>일주일 간의 활동 유형별 통계</CardDescription>
        </CardHeader>
        <CardContent className='flex-1 flex items-center justify-center'>
          <div className='text-muted-foreground'>로딩 중...</div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className='border-1 overflow-hidden shadow-none h-full flex flex-col'>
        <CardHeader>
          <CardTitle>일일 업무 활동</CardTitle>
          <CardDescription>일주일 간의 활동 유형별 통계</CardDescription>
        </CardHeader>
        <CardContent className='flex-1 flex items-center justify-center'>
          <div className='text-destructive'>
            데이터를 불러오는데 실패했습니다.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='border-0 overflow-hidden shadow-none h-full flex flex-col'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>주간 활동 요약</CardTitle>
        <CardDescription className='mt-1'>
          일주일 간의 활동 유형별 통계
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1 flex justify-center'>
        <ChartContainer
          config={chartConfig}
          className='w-full flex-1 flex flex-col items-center'
        >
          <div
            className='w-full h-full flex-1 px-4 md:px-8 py-0 mx-auto'
            style={{ maxWidth: "900px" }}
          >
            <ResponsiveContainer width='100%' height='90%'>
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{ top: 10, right: 20, bottom: 20, left: 10 }}
                barGap={2}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='day'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  fontSize={12}
                  tickFormatter={value => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey='email'
                  stackId='a'
                  name='Email'
                  fill='var(--color-email)'
                  radius={[0, 0, 4, 4]}
                  minPointSize={3}
                />
                <Bar
                  dataKey='git'
                  stackId='a'
                  name='Git'
                  fill='var(--color-git)'
                  radius={[0, 0, 0, 0]}
                  minPointSize={3}
                />
                <Bar
                  dataKey='docs'
                  stackId='a'
                  name='Docs'
                  fill='var(--color-docs)'
                  radius={[0, 0, 0, 0]}
                  minPointSize={3}
                />
                <Bar
                  dataKey='teams'
                  stackId='a'
                  name='Teams'
                  fill='var(--color-teams)'
                  radius={[4, 4, 0, 0]}
                  minPointSize={3}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ChartLegend>
            <ChartLegendContent />
          </ChartLegend>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
