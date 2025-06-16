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
import { httpInterface } from "@/lib/api/httpInterface";
import { DataItem, StackedBarChartData } from "@/types/statisticsType";
import { useEffect, useState } from "react";
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

const emptyChartData: StackedBarChartData[] = [];

export function ChartBarStacked() {
  const [chartData, setChartData] =
    useState<StackedBarChartData[]>(emptyChartData);

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await httpInterface.getStaticUser<DataItem[]>();
      const transformed = aggregateToWeekdayChart(rawData);
      setChartData(transformed);
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>일일 업무 활동</CardTitle>
        <CardDescription>2025년 5월 25일 ~ 6월 12일</CardDescription>
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
