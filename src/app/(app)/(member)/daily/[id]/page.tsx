"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DailyReportData } from "@/types/reportType";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { mockDailyReports } from "../mock";
import DailyReport from "./_components/DailyReport";
import { ReportActions } from "./_components/ReportActions";

/**
 * MEM01M02 - 세부 보고서 페이지 (내용 부분만)
 * 설계서 기준: 데일리 보고서 선택 시 이동하는 상세 화면
 */
export default function DailyReportDetailPage() {
  const params = useParams();
  const reportId = params.id as string;

  const [currentReport, setCurrentReport] = useState<DailyReportData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: react-query 훅 구현 예정
  // const {
  //   data: reportData,
  //   isLoading,
  //   error,
  //   refetch
  // } = useDailyReportQuery(reportId);

  // TODO: API 연동 시 실제 데이터 fetch 로직 구현
  useEffect(() => {
    if (reportId) {
      setIsLoading(true);

      // 임시 데이터 (실제 구현에서는 API 호출)
      setTimeout(() => {
        const mockReport = mockDailyReports.find(
          report => report.id === Number(reportId)
        );
        if (!mockReport) {
          setError("보고서를 찾을 수 없습니다.");
          setIsLoading(false);
          return;
        }

        setCurrentReport(mockReport);
        setIsLoading(false);
      }, 1000);
    }
  }, [reportId]);

  // PDF 다운로드 핸들러
  const handlePdfDownload = async () => {
    try {
      // TODO: 실제 PDF 생성 API 호출
      alert("PDF 다운로드 기능이 구현될 예정입니다.");
    } catch (error) {
      console.error("PDF 다운로드 실패:", error);
    }
  };

  if (isLoading) {
    return (
      <div className='space-y-6 p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Skeleton className='h-8 w-24' />
            <Skeleton className='h-8 w-48' />
          </div>
          <Skeleton className='h-10 w-10 rounded-md' />
        </div>
        <Card>
          <CardContent className='space-y-4 p-6'>
            <Skeleton className='h-8 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
            <div className='space-y-3'>
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className='h-4 w-full' />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-6'>
        <Alert variant='destructive'>
          <AlertDescription>
            <div className='flex items-center justify-between'>
              <span>😵 {error}</span>
              <Link href='/daily'>
                <Button variant='outline' size='sm'>
                  목록으로 돌아가기
                </Button>
              </Link>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!currentReport) {
    return (
      <div className='p-6'>
        <Card>
          <CardContent className='flex flex-col items-center justify-center py-16'>
            <div className='text-6xl mb-4'>📄</div>
            <CardTitle className='mb-2'>보고서를 찾을 수 없습니다</CardTitle>
            <p className='text-muted-foreground mb-6 text-center'>
              요청하신 보고서가 존재하지 않거나 삭제되었습니다.
            </p>
            <Link href='/daily'>
              <Button>목록으로 돌아가기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* 클라이언트 컴포넌트 - 액션 버튼들 */}
      <ReportActions onPdfDownload={handlePdfDownload} />

      {/* 서버 컴포넌트 - 보고서 내용 */}
      <DailyReport {...currentReport} />
    </div>
  );
}
