"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// 월별 주차 계산 함수
const getWeeksInMonth = (year: number, month: number): number => {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const firstWeekDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  // 첫 주가 불완전한 주인지 확인
  const weeksCount = Math.ceil((daysInMonth + firstWeekDay) / 7);
  return weeksCount;
};

// 현재 월별 주차 계산
const getCurrentMonthWeek = (): {
  year: number;
  month: number;
  week: number;
} => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  // 해당 월의 첫 번째 날
  const firstDay = new Date(year, month - 1, 1);
  const firstWeekDay = firstDay.getDay();

  // 현재 날짜가 몇 번째 주인지 계산
  const week = Math.ceil((date + firstWeekDay) / 7);

  return { year, month, week };
};

export default function CreateWeeklyReportPage() {
  const router = useRouter();

  // 현재 연월주차로 초기화
  const currentInfo = getCurrentMonthWeek();
  const [formData, setFormData] = useState({
    year: currentInfo.year,
    month: currentInfo.month,
    week: currentInfo.week,
  });

  const handleGoBack = () => {
    router.push("/weekly");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 임시로 목록 페이지로 이동
    router.push("/weekly");
  };

  // 현재 연도 기준으로 연도 옵션 생성
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);

  // 월 옵션 생성 (1-12월)
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  // 선택된 연도/월에 따른 주차 옵션 생성
  const maxWeeks = getWeeksInMonth(formData.year, formData.month);
  const weekOptions = Array.from({ length: maxWeeks }, (_, i) => i + 1);

  // 월이 변경될 때 주차 초기화
  const handleMonthChange = (month: number) => {
    setFormData(prev => ({
      ...prev,
      month,
      week: 1, // 월이 바뀌면 1주차로 초기화
    }));
  };

  // 월 이름 변환
  const getMonthName = (month: number): string => {
    return `${month}월`;
  };

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-2xl'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Button
                variant='ghost'
                size='sm'
                onClick={handleGoBack}
                className='flex items-center gap-1 hover:cursor-pointer'
              >
                <ArrowLeft className='w-4 h-4' />
                뒤로가기
              </Button>
              <CardTitle className='flex items-center gap-2'>
                <Calendar className='w-5 h-5' />
                위클리 보고서 생성
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* 연도 선택 */}
            <div className='space-y-2'>
              <Label htmlFor='year'>연도</Label>
              <select
                id='year'
                value={formData.year}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    year: parseInt(e.target.value),
                  }))
                }
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
              >
                {yearOptions.map(year => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
            </div>

            {/* 월 선택 */}
            <div className='space-y-2'>
              <Label htmlFor='month'>월</Label>
              <select
                id='month'
                value={formData.month}
                onChange={e => handleMonthChange(parseInt(e.target.value))}
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
              >
                {monthOptions.map(month => (
                  <option key={month} value={month}>
                    {getMonthName(month)}
                  </option>
                ))}
              </select>
            </div>

            {/* 주차 선택 */}
            <div className='space-y-2'>
              <Label htmlFor='week'>주차</Label>
              <select
                id='week'
                value={formData.week}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    week: parseInt(e.target.value),
                  }))
                }
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
              >
                {weekOptions.map(week => (
                  <option key={week} value={week}>
                    {week}주차
                  </option>
                ))}
              </select>
            </div>

            {/* 주차 설명 */}
            <div className='text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg'>
              <p>
                💡 {formData.year}년 {getMonthName(formData.month)}에는 총{" "}
                {maxWeeks}주차까지 있습니다.
              </p>
            </div>

            {/* 미리보기 */}
            <div className='p-4 bg-muted/50 rounded-lg'>
              <div className='text-center'>
                <div className='text-lg font-semibold text-primary mb-1'>
                  {formData.year}년 {getMonthName(formData.month)}{" "}
                  {formData.week}주차 위클리 보고서
                </div>
                <div className='text-sm text-muted-foreground'>
                  생성될 보고서 제목
                </div>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className='flex gap-4 pt-4'>
              <Button type='submit' className='flex-1'>
                <Plus className='w-4 h-4 mr-2' />
                보고서 생성
              </Button>
              <Button type='button' variant='outline' onClick={handleGoBack}>
                취소
              </Button>
            </div>
          </form>
        </CardContent>
      </div>
    </div>
  );
}
