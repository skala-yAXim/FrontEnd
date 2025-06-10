"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "default" | "destructive";
}

export function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
  variant = "default",
}: ConfirmDialogProps) {
  return (
    <Alert variant={variant}>
      <AlertDescription>
        <div className='space-y-3'>
          <p>{message}</p>
          <div className='flex gap-2'>
            <Button size='sm' variant={variant} onClick={onConfirm}>
              {title}
            </Button>
            <Button size='sm' variant='outline' onClick={onCancel}>
              취소
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}
