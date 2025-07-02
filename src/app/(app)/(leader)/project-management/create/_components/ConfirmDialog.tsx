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
            <Button
              size='sm'
              variant={variant}
              onClick={onConfirm}
              className={
                variant === "destructive"
                  ? "bg-red-500 hover:bg-red-600 text-white hover:text-white"
                  : ""
              }
            >
              네
            </Button>
            <Button
              size='sm'
              variant='outline'
              onClick={onCancel}
              className='hover:bg-transparent hover:text-inherit'
            >
              아니오
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}
