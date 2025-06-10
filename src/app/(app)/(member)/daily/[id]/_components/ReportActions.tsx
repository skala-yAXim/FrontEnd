"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";

interface ReportActionsProps {
  onPdfDownload: () => void;
}

/**
 * 보고서 액션 버튼들
 * 클라이언트 컴포넌트 - 이벤트 처리 필요
 */
export function ReportActions({ onPdfDownload }: ReportActionsProps) {
  return (
    <div className='flex items-center justify-between p-6 pb-0'>
      <div className='flex items-center space-x-4'>
        <Link href='/daily'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            목록으로
          </Button>
        </Link>
        <div className='h-6 w-px bg-border' />
        <h1 className='text-lg font-semibold'>보고서 상세</h1>
      </div>

      <div className='flex items-center space-x-2'>
        <Button onClick={onPdfDownload} size='sm'>
          <Download className='mr-2 h-4 w-4' />
          PDF 다운로드
        </Button>
      </div>
    </div>
  );
}
