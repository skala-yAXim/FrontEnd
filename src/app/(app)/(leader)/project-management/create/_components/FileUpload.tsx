"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { MAX_FILE_COUNT } from "@/const/file";
import { ProjectFileReq } from "@/types/projectType";
import { AlertCircle, FileText, Upload, X } from "lucide-react";
import React from "react";
import { formatFileSize } from "../_utils/utils";

interface FileUploadProps {
  files: ProjectFileReq[];
  onFileSelect: (files: FileList | null) => void;
  onFileDelete: (fileId: string) => void;
  error?: string;
  disabled?: boolean;
  existingFilesCount?: number;
}

export function FileUpload({
  files,
  onFileSelect,
  onFileDelete,
  error,
  disabled,
  existingFilesCount = 0,
}: FileUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const totalFilesCount = files.length + existingFilesCount;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className='space-y-4'>
      {/* 파일 업로드 버튼 */}
      <div className='flex items-center gap-4'>
        <Button
          type='button'
          variant='outline'
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || totalFilesCount >= MAX_FILE_COUNT}
          className='flex items-center gap-2'
        >
          <Upload className='w-4 h-4' />
          파일 선택
        </Button>
        <p className='text-sm text-muted-foreground'>
          최대 {MAX_FILE_COUNT}개, 개당 50MB 이하, docx/xlsx/xls/txt 파일만 허용
        </p>
      </div>

      <input
        ref={fileInputRef}
        type='file'
        multiple
        accept='.docx,.xlsx,.xls,.txt'
        onChange={handleFileSelect}
        className='hidden'
      />

      {error && (
        <Alert variant='destructive'>
          <AlertCircle className='w-4 h-4' />
          <AlertDescription>
            <pre className='whitespace-pre-wrap text-sm'>{error}</pre>
          </AlertDescription>
        </Alert>
      )}

      {/* 첨부된 파일 목록 */}
      {files.length > 0 && (
        <div className='space-y-2'>
          <p className='text-sm font-medium'>
            새로 첨부한 파일 ({files.length}/
            {MAX_FILE_COUNT - existingFilesCount})
          </p>
          <div className='space-y-2'>
            {files.map(file => (
              <div
                key={file.id}
                className='flex items-center justify-between p-3 bg-muted/30 rounded-md'
              >
                <div className='flex items-center gap-3'>
                  <FileText className='w-4 h-4 text-blue-600' />
                  <div>
                    <p className='text-sm font-medium'>{file.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => onFileDelete(file.id)}
                  disabled={disabled}
                >
                  <X className='w-3 h-3' />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
