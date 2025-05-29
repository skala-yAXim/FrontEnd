import { create } from "zustand";
import { 
  DailyReport, 
  DailyReportListResponse,
  CreateDailyReportRequest,
  UpdateDailyReportRequest
} from "@/types/dailyReport";

interface DailyReportState {
  // 데이터
  reports: DailyReport[];
  currentReport: DailyReport | null;
  
  // 페이지네이션
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  
  // 로딩 상태
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  
  // 에러 상태
  error: string | null;
  
  // Actions
  setReports: (response: DailyReportListResponse) => void;
  setCurrentReport: (report: DailyReport | null) => void;
  addReport: (report: DailyReport) => void;
  updateReport: (report: DailyReport) => void;
  removeReport: (reportId: string) => void;
  
  // 페이지네이션
  setPage: (page: number) => void;
  
  // 로딩 상태
  setLoading: (loading: boolean) => void;
  setCreating: (creating: boolean) => void;
  setUpdating: (updating: boolean) => void;
  setDeleting: (deleting: boolean) => void;
  
  // 에러 상태
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // 리셋
  reset: () => void;
}

const initialState = {
  reports: [],
  currentReport: null,
  currentPage: 1,
  totalPages: 0,
  totalCount: 0,
  pageSize: 10, // 설계서에 따르면 10개씩 표시
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
};

export const useDailyReportStore = create<DailyReportState>((set, get) => ({
  ...initialState,
  
  setReports: (response) => 
    set({
      reports: response.reports,
      currentPage: response.pagination.currentPage,
      totalPages: response.pagination.totalPages,
      totalCount: response.pagination.totalCount,
      pageSize: response.pagination.pageSize,
      isLoading: false,
      error: null,
    }),
    
  setCurrentReport: (report) => 
    set({ currentReport: report }),
    
  addReport: (report) => 
    set((state) => ({
      reports: [report, ...state.reports],
      totalCount: state.totalCount + 1,
    })),
    
  updateReport: (updatedReport) => 
    set((state) => ({
      reports: state.reports.map((report) =>
        report.id === updatedReport.id ? updatedReport : report
      ),
      currentReport: state.currentReport?.id === updatedReport.id 
        ? updatedReport 
        : state.currentReport,
    })),
    
  removeReport: (reportId) => 
    set((state) => ({
      reports: state.reports.filter((report) => report.id !== reportId),
      currentReport: state.currentReport?.id === reportId 
        ? null 
        : state.currentReport,
      totalCount: Math.max(0, state.totalCount - 1),
    })),
    
  setPage: (page) => 
    set({ currentPage: page }),
    
  setLoading: (loading) => 
    set({ isLoading: loading }),
    
  setCreating: (creating) => 
    set({ isCreating: creating }),
    
  setUpdating: (updating) => 
    set({ isUpdating: updating }),
    
  setDeleting: (deleting) => 
    set({ isDeleting: deleting }),
    
  setError: (error) => 
    set({ error, isLoading: false }),
    
  clearError: () => 
    set({ error: null }),
    
  reset: () => 
    set(initialState),
}));

// 선택적으로 사용할 수 있는 셀렉터들
export const selectReports = (state: DailyReportState) => state.reports;
export const selectCurrentReport = (state: DailyReportState) => state.currentReport;
export const selectPagination = (state: DailyReportState) => ({
  currentPage: state.currentPage,
  totalPages: state.totalPages,
  totalCount: state.totalCount,
  pageSize: state.pageSize,
});
export const selectIsLoading = (state: DailyReportState) => state.isLoading;
