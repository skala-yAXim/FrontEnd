"use client";

import { ReportActions } from "@/components/reports/ReportActions";
import { ReportError, ReportNotFound } from "@/components/reports/ReportError";
import { ReportSkeleton } from "@/components/reports/ReportSkeleton";
import { WeeklyReportData } from "@/types/reportType";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { mockWeeklyReports } from "../mock";
import WeeklyReport from "./_components/WeeklyRepot";

/**
 * MEM01M02 - 위클리 보고서 상세 페이지
 * 설계서 기준: 위클리 보고서 선택 시 이동하는 상세 화면
 */
export default function WeeklyReportDetailPage() {
  const params = useParams();
  const reportId = params.id as string;

  const [currentReport, setCurrentReport] = useState<WeeklyReportData | null>(
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
  // } = useWeeklyReportQuery(reportId);

  // TODO: API 연동 시 실제 데이터 fetch 로직 구현
  useEffect(() => {
    if (reportId) {
      setIsLoading(true);

      // 임시 데이터 (실제 구현에서는 API 호출)
      setTimeout(() => {
        const mockReport = mockWeeklyReports.find(
          report => report.id === Number(reportId)
        );
        if (!mockReport) {
          setError("보고서를 찾을 수 없습니다.");
          setIsLoading(false);
          return;
        }

        setCurrentReport(mockReport as WeeklyReportData);
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
    return <ReportError error={error} href='/weekly' />;
  }

  if (!currentReport) {
    return <ReportNotFound href='/weekly' />;
  }

  return (
    <div className='space-y-6'>
      {/* 공통 ReportActions 컴포넌트 사용 */}
      <ReportActions
        backHref='/weekly'
        title='위클리 보고서 상세'
        onPdfDownload={handlePdfDownload}
      />

      {/* 위클리 보고서 내용 */}
      <WeeklyReport {...currentReport} />
    </div>
  );
}
