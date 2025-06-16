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

  if (isErrorUser || isErrorAvg) {
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
    <Card>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <div>
            <CardTitle>일일 업무 활동</CardTitle>
            <CardDescription>{`${filter.toUpperCase()} 활동`}</CardDescription>
          </div>
          <div className='w-[160px]'>
            <Select
              value={filter}
              onValueChange={value => setFilter(value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='email'>Email</SelectItem>
                <SelectItem value='git'>Git</SelectItem>
                <SelectItem value='docs'>Docs</SelectItem>
                <SelectItem value='teams'>Teams</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
            <Bar dataKey={filter} fill={`var(--color-${filter})`} radius={4} />
            <Bar dataKey='avg' fill='var(--color-avg)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 leading-none font-medium'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
