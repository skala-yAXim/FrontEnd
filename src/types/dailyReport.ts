// Daily 보고서 관련 타입 정의

export interface DailyReport {
  id: string;
  title: string;
  content: string;
  date: string; // YYYY-MM-DD 형식
  author: {
    id: string;
    name: string;
    email: string;
  };
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface DailyReportListResponse {
  reports: DailyReport[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
  };
}

export interface CreateDailyReportRequest {
  title: string;
  content: string;
  date: string;
  tags?: string[];
}

export interface UpdateDailyReportRequest
  extends Partial<CreateDailyReportRequest> {
  id: string;
  status?: DailyReport["status"];
}

// 필터 및 정렬 옵션
export interface DailyReportFilters {
  status?: DailyReport["status"][];
  dateFrom?: string;
  dateTo?: string;
  author?: string;
  tags?: string[];
  search?: string;
}

export interface DailyReportSortOptions {
  field: "date" | "title" | "createdAt" | "updatedAt";
  direction: "asc" | "desc";
}
