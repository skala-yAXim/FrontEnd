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
import { useState } from "react";

export const description = "A multiple bar chart";

const allChartData = {
  email: [
    { day: "FRI", email: 10, avg: 6 },
    { day: "SAT", email: 0, avg: 0 },
    { day: "SUN", email: 0, avg: 0.3 },
    { day: "MON", email: 12, avg: 20 },
    { day: "TUE", email: 14, avg: 12 },
    { day: "WED", email: 17, avg: 7 },
    { day: "THU", email: 19, avg: 4 },
  ],
  git: [
    { day: "FRI", git: 10, avg: 8 },
    { day: "SAT", git: 0, avg: 0 },
    { day: "SUN", git: 0, avg: 0 },
    { day: "MON", git: 13, avg: 10 },
    { day: "TUE", git: 8, avg: 9 },
    { day: "WED", git: 6, avg: 7 },
    { day: "THU", git: 9, avg: 8 },
  ],
  docs: [
    { day: "FRI", docs: 3, avg: 2.5 },
    { day: "SAT", docs: 0, avg: 0 },
    { day: "SUN", docs: 0, avg: 0 },
    { day: "MON", docs: 2, avg: 2 },
    { day: "TUE", docs: 3, avg: 3 },
    { day: "WED", docs: 4, avg: 3.5 },
    { day: "THU", docs: 3, avg: 3 },
  ],
  teams: [
    { day: "FRI", teams: 5, avg: 4 },
    { day: "SAT", teams: 0, avg: 0 },
    { day: "SUN", teams: 0, avg: 0 },
    { day: "MON", teams: 6, avg: 5 },
    { day: "TUE", teams: 9, avg: 7 },
    { day: "WED", teams: 6, avg: 6 },
    { day: "THU", teams: 10, avg: 8 },
  ],
};

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

export function ChartBarMultiple() {
  const [filter, setFilter] = useState<"email" | "git" | "docs" | "teams">(
    "email"
  );

  const filteredData = allChartData[filter];

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
