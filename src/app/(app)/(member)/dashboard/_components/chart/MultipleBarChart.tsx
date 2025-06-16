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
import { httpInterface } from "@/lib/api/httpInterface";
import { ChartData, DataItem } from "@/types/statisticsType";
import { useEffect, useState } from "react";
import { transformChartData } from "./_utils/TransformData";

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

const emptyChartData: ChartData = {
  email: [],
  git: [],
  docs: [],
  teams: [],
};

export function ChartBarMultiple() {
  const [chartData, setChartData] = useState<ChartData>(emptyChartData);

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await httpInterface.getStaticUser<DataItem[]>();
      const avgRawData = await httpInterface.getAvgStaticUser<DataItem[]>();
      const transformed = transformChartData(rawData, avgRawData);
      setChartData(transformed);
    };

    fetchData();
  }, []);

  const [filter, setFilter] = useState<"email" | "git" | "docs" | "teams">(
    "email"
  );

  const filteredData = chartData[filter];

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
