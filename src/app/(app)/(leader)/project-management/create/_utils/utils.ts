import { ProjectCreateForm } from "@/types/projectType";

// 파일 크기 포맷팅
export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// 폼 검증
export function validateForm(
  form: ProjectCreateForm,
  isEditMode: boolean = false
): {
  [key: string]: string;
} {
  const errors: { [key: string]: string } = {};

  // 프로젝트명 검증
  if (!form.name.trim()) {
    errors.name = "프로젝트명을 입력해주세요.";
  }

  // 시작 날짜 검증
  if (!form.startDate) {
    errors.startDate = "시작 날짜를 선택해주세요.";
  }

  // 종료 날짜 검증
  if (!form.endDate) {
    errors.endDate = "종료 날짜를 선택해주세요.";
  } else if (form.startDate && form.endDate < form.startDate) {
    errors.endDate = "종료 날짜는 시작 날짜보다 이후여야 합니다.";
  }

  // 파일 첨부 검증 (수정 모드에서는 파일 검증 건너뛰기)
  if (!isEditMode) {
    const existingFilesCount = form.existingFiles?.length || 0;
    const newFilesCount = form.files.length;
    const deletedFilesCount = form.deleteFileIds.length;

    // 삭제되지 않은 기존 파일 수 계산
    const remainingExistingFilesCount = existingFilesCount - deletedFilesCount;

    // 총 파일 수 = 남아있는 기존 파일 + 새 파일
    const totalFilesCount = remainingExistingFilesCount + newFilesCount;

    if (totalFilesCount === 0) {
      errors.files = "최소 1개 이상의 파일을 첨부해주세요.";
    }
  } else {
    // 수정 모드에서는 기존 파일을 모두 삭제하고 새 파일도 없는 경우에만 검증
    const existingFilesCount = form.existingFiles?.length || 0;
    const newFilesCount = form.files.length;
    const deletedFilesCount = form.deleteFileIds.length;

    // 모든 기존 파일이 삭제되고 새 파일도 없는 경우
    if (
      existingFilesCount > 0 &&
      deletedFilesCount === existingFilesCount &&
      newFilesCount === 0
    ) {
      errors.files = "최소 1개 이상의 파일을 첨부해주세요.";
    }
  }

  return errors;
}
