"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSpinnerProps {
  count?: number;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  count = 3,
  className = "",
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index}>
          <CardContent className='p-6'>
            <div className='space-y-4'>
              {/* 헤더 영역 */}
              <div className='flex items-center justify-between'>
                <div className='space-y-2'>
                  <Skeleton className='h-6 w-32' />
                  <Skeleton className='h-4 w-24' />
                </div>
                <Skeleton className='h-6 w-16' />
              </div>

              {/* 내용 영역 */}
              <div className='space-y-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-3/4' />
              </div>

              {/* 액션 버튼 영역 */}
              <div className='flex items-center justify-between pt-2'>
                <div className='flex space-x-2'>
                  <Skeleton className='h-8 w-20' />
                  <Skeleton className='h-8 w-16' />
                </div>
                <Skeleton className='h-4 w-16' />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// 간단한 스피너
export const SimpleSpinner: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
    </div>
  );
};

// 페이지 로딩
export const PageLoading: React.FC = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
        <p className='text-muted-foreground'>로딩 중...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
