"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
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
  useGetStaticsTeamWeek,
  useGetStaticsUserWeek,
} from "@/hooks/useDashboardQueries";
import { transformToTypeBasedChart } from "./_utils/TransformData";

export const description = "A multiple bar chart";

const chartConfig = {
  value: {
    label: "나의 활동량",
    color: "hsl(var(--chart-3))",
  },
  avg: {
    label: "조직 평균 활동량",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartBarMultiple() {
  const {
    data: rawData,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetStaticsUserWeek();
  const {
    data: avgRawData,
    isLoading: isLoadingAvg,
    isError: isErrorAvg,
  } = useGetStaticsTeamWeek();

  // 데이터 전처리
  const chartData =
    rawData && avgRawData ? transformToTypeBasedChart(rawData, avgRawData) : [];

  // 최대값 계산
  const calculateMaxValue = () => {
    if (!chartData.length) return 100;

    const allValues = chartData.flatMap(item => [item.value, item.avg]);
    const max = Math.max(...allValues);

    // 데이터의 정확한 최대값 사용 (약간의 여백만 추가)
    return max * 1.05; // 5% 여백 추가
  };

  const maxDomain = calculateMaxValue();

  // 로딩/에러 처리
  if (isLoadingUser || isLoadingAvg) {
    return (
      <Card className='border-1 overflow-hidden shadow-none h-full flex flex-col max-h-[500px]'>
        <CardHeader>
          <CardTitle>활동 유형별 비교</CardTitle>
          <CardDescription>유형별 활동량 비교 분석</CardDescription>
        </CardHeader>
        <CardContent className='flex-1 flex items-center justify-center'>
          <div className='text-muted-foreground'>로딩 중...</div>
        </CardContent>
      </Card>
    );
  }

  if (isErrorUser || isErrorAvg) {
    return (
      <Card className='border-1 overflow-hidden shadow-none h-full flex flex-col max-h-[500px]'>
        <CardHeader>
          <CardTitle>활동 유형별 비교</CardTitle>
          <CardDescription>유형별 활동량 비교 분석</CardDescription>
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
    <Card className='border-1 overflow-hidden shadow-none h-full flex flex-col max-h-[500px]'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>
          활동 유형별 비교
        </CardTitle>
        <CardDescription className='mt-1'>
          유형별 활동량 비교 분석
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1 flex justify-center'>
        <ChartContainer
          config={chartConfig}
          className='w-full flex-1 flex flex-col items-center'
        >
          <div
            className='w-full h-full flex-1 px-4 md:px-8 py-0 mx-auto'
            // style={{ maxHeight: "350px" }}
          >
            <ResponsiveContainer width='100%' height={400}>
              <ComposedChart
                layout='vertical'
                accessibilityLayer
                data={chartData}
                margin={{ top: 10, right: 20, bottom: 10, left: 10 }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey='type'
                  type='category'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  width={50}
                  fontSize={12}
                />
                <XAxis
                  type='number'
                  domain={[0, maxDomain]}
                  tickFormatter={value => Math.round(value).toString()}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                  fontSize={12}
                  ticks={[
                    0,
                    Math.round(maxDomain / 4),
                    Math.round(maxDomain / 2),
                    Math.round((maxDomain * 3) / 4),
                    Math.round(maxDomain),
                  ]}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator='dashed' />}
                />
                <Bar
                  dataKey='value'
                  name='나의 활동량'
                  fill='var(--color-value)'
                  radius={4}
                  layout='horizontal'
                  barSize={30}
                  maxBarSize={30}
                  minPointSize={5}
                />
                <Bar
                  dataKey='avg'
                  name='조직 평균 활동량'
                  fill='var(--color-avg)'
                  radius={4}
                  layout='horizontal'
                  barSize={30}
                  maxBarSize={30}
                  minPointSize={5}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
