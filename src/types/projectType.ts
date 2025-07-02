export interface Project {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  progress: number;
}

// 프로젝트 등록 폼 인터페이스
export interface ProjectCreateForm {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  files: ProjectFileReq[];
}

// 첨부 파일 인터페이스
export interface Files {
  id: number;
  createdAt: string;
  updatedAt: string;
  originalFileName: string;
  fileUrl: string;
  fileSize: string;
}

export interface ProjectFileReq {
  id: string;
  name: string;
  size: number;
  type: string;
  file: Files;
}

// 에러 타입
export interface FormErrors {
  [key: string]: string;
}

export type ProjectStatus = "PLANNING" | "IN_PROGRESS" | "COMPLETED";

export interface ProjectResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  startDate: string; // ISO 8601 날짜 문자열
  endDate: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  files: Files[];
}
