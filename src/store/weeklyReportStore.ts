import { create } from 'zustand';
import {
  WeeklyReport,
  WeeklyReportCreateRequest,
  WeeklyReportUpdateRequest,
  WeeklyReportFilters,
  WeeklyReportSortOptions,
  PaginationParams,
  WeeklyReportStatus,
} from '@/types/weeklyReport';
import { weeklyReportService } from '@/services/weeklyReportService';

interface WeeklyReportState {
  // 데이터
  reports: WeeklyReport[];
  currentReport: WeeklyReport | null;
  
  // 페이지네이션
  pagination: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };
  
  // 필터 및 정렬
  filters: WeeklyReportFilters;
  sort: WeeklyReportSortOptions;
  
  // 상태
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  
  // Actions
  fetchReports: (page?: number) => Promise<void>;
  fetchReport: (id: string) => Promise<void>;
  createReport: (data: WeeklyReportCreateRequest) => Promise<WeeklyReport>;
  updateReport: (id: string, data: WeeklyReportUpdateRequest) => Promise<WeeklyReport>;
  deleteReport: (id: string) => Promise<void>;
  downloadPDF: (id: string) => Promise<void>;
  regenerateReport: (id: string) => Promise<void>;
  
  // 필터 및 정렬
  setFilters: (filters: Partial<WeeklyReportFilters>) => void;
  setSort: (sort: WeeklyReportSortOptions) => void;
  resetFilters: () => void;
  
  // 상태 관리
  setLoading: (loading: boolean) => void;
  setSubmitting: (submitting: boolean) => void;
  setError: (error: string | null) => void;
  clearCurrentReport: () => void;
  reset: () => void;
}

const initialFilters: WeeklyReportFilters = {};

const initialSort: WeeklyReportSortOptions = {
  field: 'createdAt',
  direction: 'desc',
};

const initialPagination = {
  page: 1,
  size: 10,
  total: 0,
  totalPages: 0,
};

export const useWeeklyReportStore = create<WeeklyReportState>((set, get) => ({
  // 초기 상태
  reports: [],
  currentReport: null,
  pagination: initialPagination,
  filters: initialFilters,
  sort: initialSort,
  isLoading: false,
  isSubmitting: false,
  error: null,

  // 보고서 목록 조회
  fetchReports: async (page = 1) => {
    set({ isLoading: true, error: null });
    
    try {
      const { pagination: currentPagination, filters, sort } = get();
      const paginationParams: PaginationParams = {
        page,
        size: currentPagination.size,
      };

      const response = await weeklyReportService.getWeeklyReports(
        paginationParams,
        filters,
        sort
      );

      set({
        reports: response.reports,
        pagination: response.pagination,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '보고서 목록을 불러오는데 실패했습니다.',
        isLoading: false,
        reports: [],
      });
    }
  },

  // 보고서 상세 조회
  fetchReport: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await weeklyReportService.getWeeklyReport(id);
      set({
        currentReport: response.report,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '보고서를 불러오는데 실패했습니다.',
        isLoading: false,
        currentReport: null,
      });
    }
  },

  // 보고서 생성
  createReport: async (data: WeeklyReportCreateRequest): Promise<WeeklyReport> => {
    set({ isSubmitting: true, error: null });
    
    try {
      const response = await weeklyReportService.createWeeklyReport(data);
      
      // 목록에 새 보고서 추가 (맨 앞에)
      const { reports } = get();
      set({
        reports: [response.report, ...reports],
        isSubmitting: false,
      });
      
      return response.report;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '보고서 생성에 실패했습니다.',
        isSubmitting: false,
      });
      throw error;
    }
  },

  // 보고서 수정
  updateReport: async (id: string, data: WeeklyReportUpdateRequest): Promise<WeeklyReport> => {
    set({ isSubmitting: true, error: null });
    
    try {
      const response = await weeklyReportService.updateWeeklyReport(id, data);
      
      // 목록에서 해당 보고서 업데이트
      const { reports, currentReport } = get();
      const updatedReports = reports.map(report =>
        report.id === id ? response.report : report
      );
      
      set({
        reports: updatedReports,
        currentReport: currentReport?.id === id ? response.report : currentReport,
        isSubmitting: false,
      });
      
      return response.report;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '보고서 수정에 실패했습니다.',
        isSubmitting: false,
      });
      throw error;
    }
  },

  // 보고서 삭제
  deleteReport: async (id: string) => {
    set({ isSubmitting: true, error: null });
    
    try {
      await weeklyReportService.deleteWeeklyReport(id);
      
      // 목록에서 해당 보고서 제거
      const { reports, currentReport } = get();
      const filteredReports = reports.filter(report => report.id !== id);
      
      set({
        reports: filteredReports,
        currentReport: currentReport?.id === id ? null : currentReport,
        isSubmitting: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '보고서 삭제에 실패했습니다.',
        isSubmitting: false,
      });
      throw error;
    }
  },

  // PDF 다운로드
  downloadPDF: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const blob = await weeklyReportService.downloadReportPDF(id);
      
      // 파일 다운로드 처리
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `weekly-report-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'PDF 다운로드에 실패했습니다.',
        isLoading: false,
      });
    }
  },

  // 보고서 재생성
  regenerateReport: async (id: string) => {
    set({ isSubmitting: true, error: null });
    
    try {
      const response = await weeklyReportService.regenerateReport(id);
      
      // 목록에서 해당 보고서 업데이트
      const { reports, currentReport } = get();
      const updatedReports = reports.map(report =>
        report.id === id ? response.report : report
      );
      
      set({
        reports: updatedReports,
        currentReport: currentReport?.id === id ? response.report : currentReport,
        isSubmitting: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '보고서 재생성에 실패했습니다.',
        isSubmitting: false,
      });
    }
  },

  // 필터 설정
  setFilters: (newFilters: Partial<WeeklyReportFilters>) => {
    const { filters } = get();
    set({ filters: { ...filters, ...newFilters } });
  },

  // 정렬 설정
  setSort: (sort: WeeklyReportSortOptions) => {
    set({ sort });
  },

  // 필터 초기화
  resetFilters: () => {
    set({ filters: initialFilters });
  },

  // 상태 관리
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setSubmitting: (submitting: boolean) => set({ isSubmitting: submitting }),
  setError: (error: string | null) => set({ error }),
  clearCurrentReport: () => set({ currentReport: null }),
  
  // 전체 상태 초기화
  reset: () => set({
    reports: [],
    currentReport: null,
    pagination: initialPagination,
    filters: initialFilters,
    sort: initialSort,
    isLoading: false,
    isSubmitting: false,
    error: null,
  }),
}));

// 선택 사항: 스토어의 특정 부분만 선택하기 위한 셀렉터
export const selectReports = (state: WeeklyReportState) => state.reports;
export const selectCurrentReport = (state: WeeklyReportState) => state.currentReport;
export const selectPagination = (state: WeeklyReportState) => state.pagination;
export const selectIsLoading = (state: WeeklyReportState) => state.isLoading;
export const selectIsSubmitting = (state: WeeklyReportState) => state.isSubmitting;
export const selectError = (state: WeeklyReportState) => state.error;
