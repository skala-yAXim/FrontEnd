"use client";

import { ReportActions as CommonReportActions } from "@/components/reports/ReportActions";

interface ReportActionsProps {
  onPdfDownload: () => void;
}

/**
 * 데일리 보고서 액션 버튼들
 * 공통 ReportActions 컴포넌트를 래핑
 */
export function ReportActions({ onPdfDownload }: ReportActionsProps) {
  return (
    <CommonReportActions
      backHref='/daily'
      title='데일리 보고서 상세'
      onPdfDownload={onPdfDownload}
    />
  );
}
