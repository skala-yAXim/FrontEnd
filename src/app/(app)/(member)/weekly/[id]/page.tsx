"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

// 임시 데이터 타입
interface WeeklyReportDetail {
  id: string;
  year: number;
  month: number;
  week: number;
}

// 임시 더미 데이터
const getDummyReport = (id: string): WeeklyReportDetail | null => {
  const reports: WeeklyReportDetail[] = [
    { id: "1", year: 2025, month: 5, week: 3 },
    { id: "2", year: 2025, month: 5, week: 2 },
    { id: "3", year: 2025, month: 5, week: 1 },
    { id: "4", year: 2025, month: 4, week: 4 },
    { id: "5", year: 2025, month: 4, week: 3 },
  ];

  return reports.find(report => report.id === id) || null;
};

// 월 이름 변환 함수
const getMonthName = (month: number): string => {
  return `${month}월`;
};

export default function WeeklyReportDetailPage() {
  const router = useRouter();
  const params = useParams();
  const reportId = params.id as string;

  const [report, setReport] = React.useState<WeeklyReportDetail | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // 더미 데이터 로딩 시뮬레이션
    setTimeout(() => {
      const foundReport = getDummyReport(reportId);
      setReport(foundReport);
      setIsLoading(false);
    }, 500);
  }, [reportId]);

  const handleGoBack = () => {
    router.push("/weekly");
  };

  if (isLoading) {
    return (
      <div className='flex justify-center'>
        <div className='text-center py-12'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-muted-foreground'>로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className='flex justify-center'>
        <div className='w-full max-w-2xl'>
          <div>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={handleGoBack}
                    className='flex items-center gap-1'
                  >
                    <ArrowLeft className='w-4 h-4' />
                    뒤로가기
                  </Button>
                  <CardTitle>보고서를 찾을 수 없습니다</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className='text-center py-8'>
              <FileText className='w-16 h-16 text-muted-foreground mx-auto mb-4' />
              <h3 className='text-lg font-semibold mb-2'>
                보고서를 찾을 수 없습니다
              </h3>
              <p className='text-muted-foreground mb-6'>
                요청하신 위클리 보고서가 존재하지 않습니다.
              </p>
              <Button onClick={handleGoBack}>목록으로 돌아가기</Button>
            </CardContent>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-4xl'>
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleGoBack}
                  className='flex items-center gap-1'
                >
                  <ArrowLeft className='w-4 h-4' />
                  뒤로가기
                </Button>
                <CardTitle className='flex items-center gap-3'>
                  <Calendar className='w-6 h-6 text-primary' />
                  {report.year}년 {getMonthName(report.month)} {report.week}주차
                  보고서
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* 연도 */}
              <div className='p-6 bg-muted/50 rounded-lg'>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-primary mb-2'>
                    {report.year}
                  </div>
                  <div className='text-sm text-muted-foreground'>연도</div>
                </div>
              </div>

              {/* 월 */}
              <div className='p-6 bg-muted/50 rounded-lg'>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-primary mb-2'>
                    {getMonthName(report.month)}
                  </div>
                  <div className='text-sm text-muted-foreground'>월</div>
                </div>
              </div>

              {/* 주차 */}
              <div className='p-6 bg-muted/50 rounded-lg'>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-primary mb-2'>
                    {report.week}주차
                  </div>
                  <div className='text-sm text-muted-foreground'>주차</div>
                </div>
              </div>
            </div>

            {/* 추가 정보 영역 (필요시 확장 가능) */}
            <div className='mt-8 pt-6 border-t'>
              <div className='text-center text-muted-foreground'>
                <FileText className='w-12 h-12 mx-auto mb-3 opacity-50' />
                <p className='text-sm'>
                  {report.year}년 {getMonthName(report.month)} {report.week}
                  주차에 대한 상세한 보고서 내용이 여기에 표시됩니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
