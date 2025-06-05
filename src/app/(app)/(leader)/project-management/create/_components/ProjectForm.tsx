"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ALLOWED_EXTENSIONS,
  ALLOWED_FILE_TYPES,
  MAX_DESCRIPTION_LENGTH,
  MAX_FILE_COUNT,
  MAX_FILE_SIZE,
  MAX_NAME_LENGTH,
} from "@/const/file";
import { ProjectCreateForm, ProjectFile } from "@/types/projectType";
import { AlertCircle } from "lucide-react";
import React from "react";
import { validateForm } from "../_utils/utils";
import { ConfirmDialog } from "./ConfirmDialog";
import { FileUpload } from "./FileUpload";

interface ProjectFormProps {
  onSubmit: (form: ProjectCreateForm) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function ProjectForm({
  onSubmit,
  onCancel,
  isSubmitting,
}: ProjectFormProps) {
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

  // 프로젝트명 변경
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_NAME_LENGTH) {
      handleFormChange("name", value);
    }
  };

  // 개요 변경
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (value.length <= MAX_DESCRIPTION_LENGTH) {
      handleFormChange("description", value);
    }
  };

  // 파일 선택 핸들러
  const handleFileSelect = (files: FileList | null) => {
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

  // 프로젝트 등록 요청
  const handleCreateRequest = () => {
    const formErrors = validateForm(form);
    if (Object.keys(formErrors).length === 0) {
      setShowConfirmCreate(true);
    } else {
      setErrors(formErrors);
    }
  };

  // 프로젝트 등록 확정
  const handleCreateConfirm = () => {
    onSubmit(form);
  };

  // 취소 요청
  const handleCancelRequest = () => {
    setShowConfirmCancel(true);
  };

  // 취소 확정
  const handleCancelConfirm = () => {
    onCancel();
  };

  // 확인 취소
  const handleDismissConfirm = () => {
    setShowConfirmCreate(false);
    setShowConfirmCancel(false);
  };

  const fileToDeleteInfo = form.files.find(f => f.id === fileToDelete);
  const isDialogOpen =
    showConfirmCreate || showConfirmCancel || fileToDelete !== null;

  return (
    <div className='space-y-6'>
      {/* 등록 확인 메시지 */}
      {showConfirmCreate && (
        <ConfirmDialog
          title='등록'
          message={`"${form.name}" 프로젝트를 등록하시겠습니까?`}
          onConfirm={handleCreateConfirm}
          onCancel={handleDismissConfirm}
        />
      )}

      {/* 취소 확인 메시지 */}
      {showConfirmCancel && (
        <ConfirmDialog
          title='취소'
          message='작성 중인 내용이 모두 사라집니다. 정말 취소하시겠습니까?'
          onConfirm={handleCancelConfirm}
          onCancel={handleDismissConfirm}
          variant='destructive'
        />
      )}

      {/* 파일 삭제 확인 메시지 */}
      {fileToDelete && fileToDeleteInfo && (
        <ConfirmDialog
          title='삭제'
          message={`"${fileToDeleteInfo.name}" 파일을 삭제하시겠습니까?`}
          onConfirm={handleFileDeleteConfirm}
          onCancel={handleFileDeleteCancel}
          variant='destructive'
        />
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
            {form.name.length}/{MAX_NAME_LENGTH}
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
      <FileUpload
        files={form.files}
        onFileSelect={handleFileSelect}
        onFileDelete={handleFileDeleteRequest}
        error={errors.files}
        disabled={isDialogOpen}
      />

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
          {form.description.length}/{MAX_DESCRIPTION_LENGTH}
        </div>
      </div>

      {/* 버튼 */}
      <div className='flex justify-end gap-3 pt-4'>
        <Button
          variant='outline'
          onClick={handleCancelRequest}
          disabled={isDialogOpen || isSubmitting}
        >
          취소
        </Button>
        <Button
          onClick={handleCreateRequest}
          disabled={isDialogOpen || isSubmitting}
        >
          {isSubmitting ? "등록 중..." : "프로젝트 등록"}
        </Button>
      </div>
    </div>
  );
}
