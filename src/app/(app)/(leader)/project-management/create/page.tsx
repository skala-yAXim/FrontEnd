// TODO: API 연동 필요 (프로젝트 등록, 파일 업로드)
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, X, Upload, FileText, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

// 프로젝트 등록 폼 인터페이스
interface ProjectCreateForm {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  files: ProjectFile[];
}

// 첨부 파일 인터페이스
interface ProjectFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

// 허용되는 파일 확장자
const ALLOWED_FILE_TYPES = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
  "application/vnd.ms-excel", // xls
  "text/plain", // txt
];

const ALLOWED_EXTENSIONS = [".docx", ".xlsx", ".xls", ".txt"];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_FILE_COUNT = 5;

export default function ProjectCreatePage() {
  const router = useRouter();

  // 폼 상태
  const [form, setForm] = React.useState<ProjectCreateForm>({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    files: [],
  });

  // 확인 상태
  const [showConfirmCreate, setShowConfirmCreate] = React.useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = React.useState(false);
  const [fileToDelete, setFileToDelete] = React.useState<string | null>(null);

  // 에러 상태
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  // 파일 입력 ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // 폼 값 변경 핸들러
  const handleFormChange = (
    field: keyof Omit<ProjectCreateForm, "files">,
    value: string
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));

    // 에러 클리어
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // 프로젝트명 변경 (100자 제한)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 100) {
      handleFormChange("name", value);
    }
  };

  // 개요 변경 (1000자 제한)
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      handleFormChange("description", value);
    }
  };

  // 파일 선택 핸들러
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: ProjectFile[] = [];
    const newErrors: string[] = [];

    // 파일 개수 확인
    if (form.files.length + files.length > MAX_FILE_COUNT) {
      newErrors.push(`파일은 최대 ${MAX_FILE_COUNT}개까지 첨부할 수 있습니다.`);
    }

    Array.from(files).forEach(file => {
      // 파일 형식 확인
      const isValidType =
        ALLOWED_FILE_TYPES.includes(file.type) ||
        ALLOWED_EXTENSIONS.some(ext => file.name.toLowerCase().endsWith(ext));

      if (!isValidType) {
        newErrors.push(
          `${file.name}: 허용되지 않는 파일 형식입니다. (docx, xlsx, xls, txt만 허용)`
        );
        return;
      }

      // 파일 크기 확인
      if (file.size > MAX_FILE_SIZE) {
        newErrors.push(`${file.name}: 파일 크기가 50MB를 초과합니다.`);
        return;
      }

      // 중복 파일명 확인
      if (form.files.some(f => f.name === file.name)) {
        newErrors.push(
          `${file.name}: 동일한 이름의 파일이 이미 첨부되어 있습니다.`
        );
        return;
      }

      newFiles.push({
        id: `file-${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        file,
      });
    });

    if (newErrors.length > 0) {
      setErrors(prev => ({ ...prev, files: newErrors.join("\n") }));
    } else {
      setForm(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles],
      }));
      setErrors(prev => ({ ...prev, files: "" }));
    }

    // 파일 input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 파일 삭제 요청
  const handleFileDeleteRequest = (fileId: string) => {
    setFileToDelete(fileId);
  };

  // 파일 삭제 확정
  const handleFileDeleteConfirm = () => {
    if (fileToDelete) {
      setForm(prev => ({
        ...prev,
        files: prev.files.filter(f => f.id !== fileToDelete),
      }));
      setFileToDelete(null);
    }
  };

  // 파일 삭제 취소
  const handleFileDeleteCancel = () => {
    setFileToDelete(null);
  };

  // 폼 검증
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name.trim()) {
      newErrors.name = "프로젝트명은 필수 입력 항목입니다.";
    }

    if (!form.startDate) {
      newErrors.startDate = "시작 날짜는 필수 입력 항목입니다.";
    }

    if (!form.endDate) {
      newErrors.endDate = "종료 날짜는 필수 입력 항목입니다.";
    }

    if (form.startDate && form.endDate && form.startDate >= form.endDate) {
      newErrors.endDate = "종료 날짜는 시작 날짜보다 늦어야 합니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 프로젝트 등록 요청
  const handleCreateRequest = () => {
    if (validateForm()) {
      setShowConfirmCreate(true);
    }
  };

  // 프로젝트 등록 확정
  const handleCreateConfirm = () => {
    // TODO: API 호출 - 프로젝트 등록
    console.log("프로젝트 등록:", form);

    // 등록 완료 후 목록 페이지로 이동
    router.push("/project-management");
  };

  // 취소 요청
  const handleCancelRequest = () => {
    setShowConfirmCancel(true);
  };

  // 취소 확정
  const handleCancelConfirm = () => {
    router.push("/project-management");
  };

  // 확인 취소
  const handleDismissConfirm = () => {
    setShowConfirmCreate(false);
    setShowConfirmCancel(false);
  };

  // 파일 크기 포맷팅
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const fileToDeleteInfo = form.files.find(f => f.id === fileToDelete);

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <Card className='w-full max-w-none'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Plus className='w-5 h-5' />
            프로젝트 정보 등록
          </CardTitle>
        </CardHeader>

        <CardContent className='space-y-6'>
          {/* 등록 확인 메시지 */}
          {showConfirmCreate && (
            <Alert>
              <AlertDescription>
                <div className='space-y-3'>
                  <p>
                    <strong>"{form.name}"</strong> 프로젝트를 등록하시겠습니까?
                  </p>
                  <div className='flex gap-2'>
                    <Button size='sm' onClick={handleCreateConfirm}>
                      등록
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={handleDismissConfirm}
                    >
                      취소
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* 취소 확인 메시지 */}
          {showConfirmCancel && (
            <Alert variant='destructive'>
              <AlertDescription>
                <div className='space-y-3'>
                  <p>
                    작성 중인 내용이 모두 사라집니다. 정말 취소하시겠습니까?
                  </p>
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      variant='destructive'
                      onClick={handleCancelConfirm}
                    >
                      취소
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={handleDismissConfirm}
                    >
                      계속 작성
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* 파일 삭제 확인 메시지 */}
          {fileToDelete && fileToDeleteInfo && (
            <Alert variant='destructive'>
              <AlertDescription>
                <div className='space-y-3'>
                  <p>
                    <strong>"{fileToDeleteInfo.name}"</strong> 파일을
                    삭제하시겠습니까?
                  </p>
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      variant='destructive'
                      onClick={handleFileDeleteConfirm}
                    >
                      삭제
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={handleFileDeleteCancel}
                    >
                      취소
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* 프로젝트명 */}
          <div className='space-y-2'>
            <Label htmlFor='name' className='text-base font-semibold'>
              프로젝트명 <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='name'
              placeholder='프로젝트명을 입력해주세요'
              value={form.name}
              onChange={handleNameChange}
              className={errors.name ? "border-red-500" : ""}
            />
            <div className='flex justify-between'>
              {errors.name && (
                <p className='text-sm text-red-500 flex items-center gap-1'>
                  <AlertCircle className='w-3 h-3' />
                  {errors.name}
                </p>
              )}
              <p className='text-sm text-muted-foreground ml-auto'>
                {form.name.length}/100
              </p>
            </div>
          </div>

          {/* 기간 설정 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='startDate' className='text-base font-semibold'>
                시작 날짜 <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='startDate'
                type='date'
                value={form.startDate}
                onChange={e => handleFormChange("startDate", e.target.value)}
                max={form.endDate || undefined}
                className={errors.startDate ? "border-red-500" : ""}
              />
              {errors.startDate && (
                <p className='text-sm text-red-500 flex items-center gap-1'>
                  <AlertCircle className='w-3 h-3' />
                  {errors.startDate}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='endDate' className='text-base font-semibold'>
                종료 날짜 <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='endDate'
                type='date'
                value={form.endDate}
                onChange={e => handleFormChange("endDate", e.target.value)}
                min={form.startDate || undefined}
                className={errors.endDate ? "border-red-500" : ""}
              />
              {errors.endDate && (
                <p className='text-sm text-red-500 flex items-center gap-1'>
                  <AlertCircle className='w-3 h-3' />
                  {errors.endDate}
                </p>
              )}
            </div>
          </div>

          {/* 파일 첨부 */}
          <div className='space-y-4'>
            <Label className='text-base font-semibold'>관련 파일 첨부</Label>

            {/* 파일 업로드 버튼 */}
            <div className='flex items-center gap-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => fileInputRef.current?.click()}
                disabled={form.files.length >= MAX_FILE_COUNT}
                className='flex items-center gap-2'
              >
                <Upload className='w-4 h-4' />
                파일 선택
              </Button>
              <p className='text-sm text-muted-foreground'>
                최대 {MAX_FILE_COUNT}개, 개당 50MB 이하, docx/xlsx/xls/txt
                파일만 허용
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

            {errors.files && (
              <Alert variant='destructive'>
                <AlertCircle className='w-4 h-4' />
                <AlertDescription>
                  <pre className='whitespace-pre-wrap text-sm'>
                    {errors.files}
                  </pre>
                </AlertDescription>
              </Alert>
            )}

            {/* 첨부된 파일 목록 */}
            {form.files.length > 0 && (
              <div className='space-y-2'>
                <p className='text-sm font-medium'>
                  첨부된 파일 ({form.files.length}/{MAX_FILE_COUNT})
                </p>
                <div className='space-y-2'>
                  {form.files.map(file => (
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
                        onClick={() => handleFileDeleteRequest(file.id)}
                        disabled={fileToDelete !== null}
                      >
                        <X className='w-3 h-3' />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 개요 */}
          <div className='space-y-2'>
            <Label htmlFor='description' className='text-base font-semibold'>
              프로젝트 개요
            </Label>
            <Textarea
              id='description'
              placeholder='프로젝트에 대한 개요를 입력해주세요...'
              value={form.description}
              onChange={handleDescriptionChange}
              className='min-h-[150px] resize-none'
            />
            <div className='flex justify-end text-sm text-muted-foreground'>
              {form.description.length}/1000
            </div>
          </div>

          {/* 버튼 */}
          <div className='flex justify-end gap-3 pt-4'>
            <Button
              variant='outline'
              onClick={handleCancelRequest}
              disabled={
                showConfirmCreate || showConfirmCancel || fileToDelete !== null
              }
            >
              취소
            </Button>
            <Button
              onClick={handleCreateRequest}
              disabled={
                showConfirmCreate || showConfirmCancel || fileToDelete !== null
              }
            >
              프로젝트 등록
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
