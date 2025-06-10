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
export function validateForm(form: ProjectCreateForm): {
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

  // 파일 첨부 검증
  if (form.files.length === 0) {
    errors.files = "최소 1개 이상의 파일을 첨부해주세요.";
  }

  return errors;
}
