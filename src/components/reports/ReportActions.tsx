"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";

interface ReportActionsProps {
  /** 목록으로 돌아갈 경로 */
  backHref: string;
  /** 목록 버튼 텍스트 (기본값: "목록으로") */
  backButtonText?: string;
  /** 페이지 제목 (기본값: "보고서 상세") */
  title?: string;
  /** PDF 다운로드 핸들러 */
  onPdfDownload?: () => void;
  /** PDF 버튼 텍스트 (기본값: "PDF 다운로드") */
  pdfButtonText?: string;
  /** 추가 액션 버튼들 */
  additionalActions?: React.ReactNode;
  /** 커스텀 클래스명 */
  className?: string;
}

/**
 * 보고서 액션 버튼들 (공통 컴포넌트)
 * 클라이언트 컴포넌트 - 이벤트 처리 필요
 */
export function ReportActions({
  backHref,
  backButtonText = "목록으로",
  title = "보고서 상세",
  onPdfDownload,
  pdfButtonText = "PDF 다운로드",
  additionalActions,
  className = "",
}: ReportActionsProps) {
  return (
    <div className={`flex items-center justify-between p-6 pb-0 ${className}`}>
      <div className='flex items-center space-x-4'>
        <Link href={backHref}>
          <Button
            variant='outline'
            size='sm'
            className='hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200 hover:cursor-pointer'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            {backButtonText}
          </Button>
        </Link>
        <div className='h-6 w-px bg-border' />
        <h1 className='text-lg font-semibold'>{title}</h1>
      </div>

      <div className='flex items-center space-x-2 hover:cursor-pointer'>
        {additionalActions}
        {onPdfDownload && ( // 👈 조건부 렌더링 추가
          <Button onClick={onPdfDownload} size='sm'>
            <Download className='mr-2 h-4 w-4' />
            {pdfButtonText}
          </Button>
        )}
      </div>
    </div>
  );
}
