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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetDashboardUser,
  useGetDashboardUserAvg,
} from "@/hooks/useDashboardQueries";
import { MultipleBarChartData } from "@/types/statisticsType";
import { useState } from "react";
import { transformToAvgChartData } from "./_utils/TransformData";

export const description = "A multiple bar chart";

const chartConfig = {
  email: {
    label: "Email",
    color: "hsl(var(--chart-3))",
  },
  git: {
    label: "Git",
    color: "hsl(var(--chart-3))",
  },
  docs: {
    label: "Docs",
    color: "hsl(var(--chart-3))",
  },
  teams: {
    label: "Teams",
    color: "hsl(var(--chart-3))",
  },
  avg: {
    label: "Average",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const emptyChartData: MultipleBarChartData = {
  email: [],
  git: [],
  docs: [],
  teams: [],
};

export function ChartBarMultiple() {
  // react-query로 데이터 패칭
  const {
    data: rawData,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetDashboardUser();
  const {
    data: avgRawData,
    isLoading: isLoadingAvg,
    isError: isErrorAvg,
  } = useGetDashboardUserAvg();

  // 데이터 전처리
  const chartData: MultipleBarChartData =
    rawData && avgRawData
      ? transformToAvgChartData(rawData, avgRawData)
      : emptyChartData;

  const [filter, setFilter] = useState<"email" | "git" | "docs" | "teams">(
    "email"
  );
  const filteredData = chartData[filter];

  // 로딩/에러 처리
  if (isLoadingUser || isLoadingAvg) {
    return (
      <Card className='border-1 overflow-hidden shadow-none h-full flex flex-col'>
        <CardHeader>
          <CardTitle>일일 업무 활동</CardTitle>
          <CardDescription>일별 활동량 비교 분석</CardDescription>
        </CardHeader>
        <CardContent className='flex-1 flex items-center justify-center'>
          <div className='text-muted-foreground'>로딩 중...</div>
        </CardContent>
      </Card>
    );
  }

  if (isErrorUser || isErrorAvg) {
    return (
      <Card className='border-1 overflow-hidden shadow-none h-full flex flex-col'>
        <CardHeader>
          <CardTitle>일일 업무 활동</CardTitle>
          <CardDescription>일별 활동량 비교 분석</CardDescription>
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
    <Card className='border-1 overflow-hidden shadow-none h-full flex flex-col'>
      <CardHeader className='flex justify-between items-center'>
        <div>
          <CardTitle className='text-lg font-semibold'>
            일별 활동 비교
          </CardTitle>
          <CardDescription className='mt-1'>
            일별 활동량 비교 분석
          </CardDescription>
        </div>
        <div className='flex justify-end items-center'>
          <div className='min-w-[160px]'>
            <Select
              value={filter}
              onValueChange={value => setFilter(value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent sideOffset={4} avoidCollisions={true}>
                <SelectItem value='email'>Email</SelectItem>
                <SelectItem value='git'>Git</SelectItem>
                <SelectItem value='docs'>Docs</SelectItem>
                <SelectItem value='teams'>Teams</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex-1 flex'>
        <ChartContainer
          config={chartConfig}
          className='w-full flex-1 flex flex-col'
        >
          <div className='w-full h-full flex-1 px-24'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart accessibilityLayer data={filteredData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='day'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={value => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator='dashed' />}
                />
                <Bar
                  dataKey={filter}
                  fill={`var(--color-${filter})`}
                  radius={4}
                />
                <Bar dataKey='avg' fill='var(--color-avg)' radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
