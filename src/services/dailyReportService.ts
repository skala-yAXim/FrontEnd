import {
  DailyReport,
  DailyReportListResponse,
  DailyReportFilters,
  DailyReportSortOptions,
  CreateDailyReportRequest,
  UpdateDailyReportRequest,
} from "@/types/dailyReport";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

/**
 * Daily 보고서 관련 API 서비스
 */
export class DailyReportService {
  /**
   * Daily 보고서 목록 조회
   */
  static async getReports(
    page: number = 1,
    pageSize: number = 10,
    filters?: DailyReportFilters,
    sortOptions?: DailyReportSortOptions
  ): Promise<DailyReportListResponse> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      // 필터 추가
      if (filters) {
        if (filters.status && filters.status.length > 0) {
          params.append("status", filters.status.join(","));
        }
        if (filters.dateFrom) {
          params.append("dateFrom", filters.dateFrom);
        }
        if (filters.dateTo) {
          params.append("dateTo", filters.dateTo);
        }
        if (filters.author) {
          params.append("author", filters.author);
        }
        if (filters.tags && filters.tags.length > 0) {
          params.append("tags", filters.tags.join(","));
        }
        if (filters.search) {
          params.append("search", filters.search);
        }
      }

      // 정렬 추가
      if (sortOptions) {
        params.append("sortBy", sortOptions.field);
        params.append("sortOrder", sortOptions.direction);
      }

      const response = await fetch(
        `${API_BASE_URL}/api/daily-reports?${params}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // TODO: Authorization 헤더 추가
            // 'Authorization': `Bearer ${getAccessToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to fetch daily reports:", error);
      throw new Error("보고서 목록을 불러오는데 실패했습니다.");
    }
  }

  /**
   * Daily 보고서 상세 조회
   */
  static async getReportById(id: string): Promise<DailyReport> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/daily-reports/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // TODO: Authorization 헤더 추가
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("보고서를 찾을 수 없습니다.");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to fetch daily report:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("보고서를 불러오는데 실패했습니다.");
    }
  }

  /**
   * Daily 보고서 생성
   */
  static async createReport(
    data: CreateDailyReportRequest
  ): Promise<DailyReport> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/daily-reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // TODO: Authorization 헤더 추가
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to create daily report:", error);
      throw new Error("보고서 생성에 실패했습니다.");
    }
  }

  /**
   * Daily 보고서 수정
   */
  static async updateReport(
    data: UpdateDailyReportRequest
  ): Promise<DailyReport> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/daily-reports/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // TODO: Authorization 헤더 추가
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to update daily report:", error);
      throw new Error("보고서 수정에 실패했습니다.");
    }
  }

  /**
   * Daily 보고서 삭제
   */
  static async deleteReport(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/daily-reports/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // TODO: Authorization 헤더 추가
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to delete daily report:", error);
      throw new Error("보고서 삭제에 실패했습니다.");
    }
  }

  /**
   * 첨부파일 업로드
   */
  static async uploadAttachment(
    file: File,
    reportId?: string
  ): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (reportId) {
        formData.append("reportId", reportId);
      }

      const response = await fetch(`${API_BASE_URL}/api/attachments/upload`, {
        method: "POST",
        headers: {
          // NOTE: FormData 사용 시 Content-Type 헤더 자동 설정
          // TODO: Authorization 헤더 추가
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error("Failed to upload attachment:", error);
      throw new Error("파일 업로드에 실패했습니다.");
    }
  }
}

// 편의 함수들
export const dailyReportAPI = {
  getReports: DailyReportService.getReports,
  getReportById: DailyReportService.getReportById,
  createReport: DailyReportService.createReport,
  updateReport: DailyReportService.updateReport,
  deleteReport: DailyReportService.deleteReport,
  uploadAttachment: DailyReportService.uploadAttachment,
};
