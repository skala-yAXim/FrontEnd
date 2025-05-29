// Weekly Report 관련 타입 정의

export interface WeeklyReport {
  id: string;
  userId: string;
  weekNumber: number;        // 주차 (예: 21주차)
  year: number;             // 연도 (예: 2025)
  weekStartDate: string;    // 주 시작일 (ISO 8601)
  weekEndDate: string;      // 주 종료일 (ISO 8601)
  keyMetrics: string;       // 주요 업무 지표 (최대 1,000자)
  content?: string;         // AI 생성된 보고서 내용
  sources?: ReportSource[]; // 보고서 출처 정보
  status: WeeklyReportStatus;
  createdAt: string;        // ISO 8601
  updatedAt: string;        // ISO 8601
}

export interface WeeklyReportCreateRequest {
  weekNumber: number;
  year: number;
  weekStartDate: string;
  weekEndDate: string;
  keyMetrics: string;
}

export interface WeeklyReportUpdateRequest {
  keyMetrics?: string;
}

export interface ReportSource {
  id: string;
  type: 'git' | 'teams' | 'outlook' | 'manual';
  title: string;
  url?: string;
  timestamp: string;
  summary: string;
}

export enum WeeklyReportStatus {
  DRAFT = 'draft',           // 초안
  GENERATING = 'generating', // 생성 중
  COMPLETED = 'completed',   // 생성 완료
  ERROR = 'error'           // 오류 발생
}

// API 응답 타입들
export interface WeeklyReportListResponse {
  reports: WeeklyReport[];
  pagination: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };
}

export interface WeeklyReportResponse {
  report: WeeklyReport;
}

// 필터링 및 정렬 옵션
export interface WeeklyReportFilters {
  year?: number;
  status?: WeeklyReportStatus;
  startDate?: string;
  endDate?: string;
}

export interface WeeklyReportSortOptions {
  field: 'createdAt' | 'weekNumber' | 'year';
  direction: 'asc' | 'desc';
}

// 페이지네이션 파라미터
export interface PaginationParams {
  page: number;
  size: number;
}

// 주차 계산 유틸리티 타입
export interface WeekInfo {
  weekNumber: number;
  year: number;
  startDate: string;
  endDate: string;
}
