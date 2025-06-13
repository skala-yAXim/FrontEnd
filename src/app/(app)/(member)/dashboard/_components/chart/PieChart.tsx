"use client";

import { Cell, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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

export const description = "A pie chart with a legend";

// 색상 값을 직접 정의하여 사용
const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const chartData = [
  { category: "email", count: 275 },
  { category: "git", count: 200 },
  { category: "docs", count: 187 },
  { category: "teams", count: 173 },
  { category: "etc", count: 90 },
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
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>업무 동향</CardTitle>
        <CardDescription>2025년 5월 25일 ~ 6월 12일</CardDescription>
      </CardHeader>

      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[300px]'
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey='count'
              nameKey='category'
              cx='50%'
              cy='50%'
              labelLine={false}
              label={({ x, y, name, value }) => {
                return (
                  <text
                    x={x}
                    y={y}
                    fill='hsl(var(--muted-foreground))'
                    textAnchor='middle'
                    dominantBaseline='central'
                    className='text-xs font-medium'
                  >
                    {value}
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
              className='-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center'
            />
            <ChartTooltip
              content={<ChartTooltipContent nameKey='count' hideLabel />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className='flex-col items-center gap-1 text-sm pt-4'>
        <div className='font-medium'>총 방문자: {totalcount}명</div>
        <div className='text-muted-foreground'>이번 달 5.2% 증가 추세</div>
      </CardFooter> */}
    </Card>
  );
}
