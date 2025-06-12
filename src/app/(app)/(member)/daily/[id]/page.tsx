"use client";

import { ReportActions } from "@/components/reports/ReportActions";
import { ReportError, ReportNotFound } from "@/components/reports/ReportError";
import { ReportSkeleton } from "@/components/reports/ReportSkeleton";
import { DailyReportData } from "@/types/reportType";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { mockDailyReports } from "../mock";
import DailyReport from "./_components/DailyReport";

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
    return <ReportSkeleton />;
  }

  if (error) {
    return <ReportError error={error} href='/daily' />;
  }

  if (!currentReport) {
    return <ReportNotFound href='/daily' />;
  }

  return (
    <div className='space-y-6'>
      {/* 클라이언트 컴포넌트 - 액션 버튼들 */}
      <ReportActions
        backHref='/daily'
        title='데일리 보고서 상세'
        onPdfDownload={handlePdfDownload}
      />

      {/* 서버 컴포넌트 - 보고서 내용 */}
      <DailyReport {...currentReport} />
    </div>
  );
}
