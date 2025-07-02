import { ReactNode } from "react";

interface ReportLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * 공통 보고서 레이아웃 컴포넌트
 * Framework First: 모든 보고서에서 재사용 가능한 통일된 디자인
 * 데일리 보고서와 정확히 동일한 스타일 적용
 */
export function ReportLayout({ children, className = "" }: ReportLayoutProps) {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-4'>
      <div
        className={`bg-white dark:bg-gray-800 w-full max-w-5xl rounded-lg mx-auto py-8 px-4 sm:px-6 lg:px-16 shadow-lg ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
