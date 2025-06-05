export interface Project {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
}

// 프로젝트 등록 폼 인터페이스
export interface ProjectCreateForm {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  files: ProjectFile[];
}

// 첨부 파일 인터페이스
export interface ProjectFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

// 에러 타입
export interface FormErrors {
  [key: string]: string;
}
