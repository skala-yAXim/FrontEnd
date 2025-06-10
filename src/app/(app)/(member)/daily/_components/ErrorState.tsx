"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ErrorStateProps {
  error: string;
  onClearError: () => void;
}

/**
 * 에러 상태 표시 컴포넌트
 * 클라이언트 컴포넌트 - onClick 이벤트 처리 필요
 */
export function ErrorState({ error, onClearError }: ErrorStateProps) {
  return (
    <Alert variant='destructive'>
      <AlertDescription className='flex items-center justify-between'>
        <span>{error}</span>
        <Button variant='ghost' size='sm' onClick={onClearError}>
          <X className='w-4 h-4' />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
