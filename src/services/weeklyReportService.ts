// Weekly Report API 서비스

import {
  WeeklyReport,
  WeeklyReportCreateRequest,
  WeeklyReportUpdateRequest,
  WeeklyReportListResponse,
  WeeklyReportResponse,
  WeeklyReportFilters,
  WeeklyReportSortOptions,
  PaginationParams,
  WeekInfo,
} from '@/types/weeklyReport';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class WeeklyReportService {
  private getAuthHeaders(): HeadersInit {
    // TODO: 실제 인증 토큰 구현
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // 위클리 보고서 목록 조회 (페이징 지원)
  async getWeeklyReports(
    pagination: PaginationParams,
    filters?: WeeklyReportFilters,
    sort?: WeeklyReportSortOptions
  ): Promise<WeeklyReportListResponse> {
    const params = new URLSearchParams({
      page: pagination.page.toString(),
      size: pagination.size.toString(),
      ...(filters?.year && { year: filters.year.toString() }),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.startDate && { startDate: filters.startDate }),
      ...(filters?.endDate && { endDate: filters.endDate }),
      ...(sort?.field && { sortField: sort.field }),
      ...(sort?.direction && { sortDirection: sort.direction }),
    });

    const response = await fetch(`${API_BASE_URL}/api/weekly-reports?${params}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Weekly reports 조회 실패: ${response.statusText}`);
    }

    return response.json();
  }

  // 위클리 보고서 상세 조회
  async getWeeklyReport(id: string): Promise<WeeklyReportResponse> {
    const response = await fetch(`${API_BASE_URL}/api/weekly-reports/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Weekly report 조회 실패: ${response.statusText}`);
    }

    return response.json();
  }

  // 위클리 보고서 생성
  async createWeeklyReport(data: WeeklyReportCreateRequest): Promise<WeeklyReportResponse> {
    const response = await fetch(`${API_BASE_URL}/api/weekly-reports`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Weekly report 생성 실패: ${response.statusText}`);
    }

    return response.json();
  }

  // 위클리 보고서 수정
  async updateWeeklyReport(
    id: string,
    data: WeeklyReportUpdateRequest
  ): Promise<WeeklyReportResponse> {
    const response = await fetch(`${API_BASE_URL}/api/weekly-reports/${id}`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Weekly report 수정 실패: ${response.statusText}`);
    }

    return response.json();
  }

  // 위클리 보고서 삭제
  async deleteWeeklyReport(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/weekly-reports/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Weekly report 삭제 실패: ${response.statusText}`);
    }
  }

  // PDF 다운로드
  async downloadReportPDF(id: string): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/api/weekly-reports/${id}/pdf`, {
      method: 'GET',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/pdf',
      },
    });

    if (!response.ok) {
      throw new Error(`PDF 다운로드 실패: ${response.statusText}`);
    }

    return response.blob();
  }

  // 보고서 재생성 요청
  async regenerateReport(id: string): Promise<WeeklyReportResponse> {
    const response = await fetch(`${API_BASE_URL}/api/weekly-reports/${id}/regenerate`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`보고서 재생성 실패: ${response.statusText}`);
    }

    return response.json();
  }

  // 주차 정보 계산 유틸리티
  getCurrentWeekInfo(): WeekInfo {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);

    // 이번 주의 월요일과 일요일 구하기
    const currentDay = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return {
      weekNumber,
      year: now.getFullYear(),
      startDate: monday.toISOString().split('T')[0],
      endDate: sunday.toISOString().split('T')[0],
    };
  }

  // 특정 날짜의 주차 정보 계산
  getWeekInfoForDate(date: Date): WeekInfo {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);

    // 해당 주의 월요일과 일요일 구하기
    const currentDay = date.getDay();
    const monday = new Date(date);
    monday.setDate(date.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return {
      weekNumber,
      year: date.getFullYear(),
      startDate: monday.toISOString().split('T')[0],
      endDate: sunday.toISOString().split('T')[0],
    };
  }

  // 날짜 포맷팅 유틸리티
  formatDateRange(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startFormatted = start.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
    });
    
    const endFormatted = end.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
    });

    return `${startFormatted} - ${endFormatted}`;
  }
}

// 싱글톤 인스턴스 생성
export const weeklyReportService = new WeeklyReportService();
export default weeklyReportService;
