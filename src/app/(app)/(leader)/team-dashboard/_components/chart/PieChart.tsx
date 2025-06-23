"use client";

import { Cell, Pie, PieChart } from "recharts";

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

// 색상 값을 직접 정의하여 사용
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

  if (isLoading) {
    return (
      <Card className='flex flex-col'>
        <CardHeader>
          <CardTitle>로딩 중...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className='flex flex-col'>
        <CardHeader>
          <CardTitle>데이터를 불러오는데 실패했습니다.</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className='flex flex-col border-0 shadow-none bg-transparent'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='text-lg font-semibold'>업무 동향</CardTitle>
        <CardDescription>활동 유형별 분포</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className='mx-auto'>
          <PieChart>
            <Pie
              data={chartData}
              dataKey='count'
              nameKey='category'
              cx='50%'
              cy='50%'
              labelLine={false}
              label={({ x, y, name, value }) => {
                const percentage = Math.round((value / totalCount) * 100);
                return (
                  <text
                    x={x}
                    y={y}
                    fill='hsl(var(--muted-foreground))'
                    textAnchor='middle'
                    dominantBaseline='central'
                    className='text-xs font-medium'
                  >
                    {percentage}%
                  </text>
                );
              }}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfig[entry.category].color}
                />
              ))}
            </Pie>

            <ChartLegend
              content={<ChartLegendContent nameKey='category' />}
              className='-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center mt-4'
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey='count'
                  formatter={(value, name) => {
                    const label = chartConfig[name as string]?.label || name;
                    return `${label}: ${value}건`;
                  }}
                />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-center gap-1'>
        <div className='font-medium'>총 활동: {totalCount}건</div>
      </CardFooter>
    </Card>
  );
}
