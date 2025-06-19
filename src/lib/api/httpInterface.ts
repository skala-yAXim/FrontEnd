import { StaticsTeamType, StaticsUserType } from "@/types/dashboardType";
import type { GitHubInfo } from "@/types/githubType";
import { PageRequest, PageResponse } from "@/types/pagination";
import {
  DailyReportData,
  DailyReportList,
  MemberWeeklyReportData,
  MemberWeeklyReportList,
  WeeklyReportList,
} from "@/types/reportType";
import { Project } from "../../types/projectType";
import { TeamInfoType, TeamMember } from "../../types/teamType";
import { api, api as ApiClientType } from "./http";

/**
 * API 요청을 위한 인터페이스 클래스입니다.
 * 각 메소드는 특정 API 엔드포인트에 대한 요청을 수행합니다.
 */
export class HttpInterface {
  private apiClient: typeof ApiClientType;

  constructor(apiClient: typeof ApiClientType) {
    this.apiClient = apiClient;
  }

  async getMyInfo<T>(): Promise<T> {
    return this.apiClient.get<T>("/my/info");
  }

  async logout(): Promise<void> {
    return this.apiClient.post("/auth/logout", {});
  }

  // Pagination
  async getProjects(pageRequest: PageRequest): Promise<PageResponse<Project>> {
    return this.apiClient.get<PageResponse<Project>>(
      `/projects?page=${pageRequest.page}&size=${pageRequest.size}&sort=${pageRequest?.sort}`
    );
  }

  async getDailyReports(
    pageRequest: PageRequest
  ): Promise<PageResponse<DailyReportList>> {
    return this.apiClient.get<PageResponse<DailyReportList>>(
      `/reports/user/daily?page=${pageRequest.page}&size=${pageRequest.size}&sort=${pageRequest?.sort}`
    );
  }

  async getDailyReport(id: number): Promise<DailyReportData> {
    return this.apiClient.get<DailyReportData>(`/reports/user/daily/${id}`);
  }

  // Pagination
  async getWeeklyReports(
    pageRequest: PageRequest
  ): Promise<PageResponse<WeeklyReportList>> {
    return this.apiClient.get<PageResponse<WeeklyReportList>>(
      `/reports/user/weekly?page=${pageRequest.page}&size=${pageRequest.size}&sort=${pageRequest?.sort}`
    );
  }

  async createProject<T>(projectData: FormData): Promise<T> {
    return this.apiClient.postFormData<T>("/projects", projectData);
  }

  async deleteProject<T>(projectId: number): Promise<T> {
    return this.apiClient.delete<T>(`/projects/${projectId}`);
  }

  async getGitInfo(): Promise<GitHubInfo> {
    return this.apiClient.get<GitHubInfo>("/git/my");
  }

  async deleteGitInfo(): Promise<void> {
    return this.apiClient.delete<void>("/git");
  }

  async getDashboardUserAvg(): Promise<StaticsUserType> {
    return this.apiClient.get<StaticsUserType>("/dashboard/statics/user/avg");
  }

  async getDashboardUserWeek(): Promise<StaticsUserType> {
    return this.apiClient.get<StaticsUserType>("/dashboard/statics/user/week");
  }

  async getDashboardTeamWeek(): Promise<StaticsTeamType> {
    return this.apiClient.get<StaticsTeamType>("/dashboard/statics/team/week");
  }

  async getDashboardUser<T>(): Promise<T> {
    return this.apiClient.get<T>("/dashboard/statics/user");
  }

  async getDashboardAvgUser<T>(): Promise<T> {
    return this.apiClient.get<T>("/dashboard/statics/user/avg");
  }

  async postTeamTemplate(template: string): Promise<void> {
    return this.apiClient.post<void>("/team/template", { template });
  }

  async getTeamInfo(): Promise<TeamInfoType> {
    return this.apiClient.get<TeamInfoType>("/team");
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return this.apiClient.get<TeamMember[]>("/team/members");
  }

  // Pagination
  async getMemberWeeklyReports(
    pageRequest: PageRequest,
    requestBody: { userId?: string[]; startDate?: string; endDate?: string }
  ): Promise<PageResponse<MemberWeeklyReportList>> {
    const params = new URLSearchParams({
      page: pageRequest.page.toString(),
      size: pageRequest.size.toString(),
      ...(pageRequest.sort && { sort: pageRequest.sort }),
    });

    return this.apiClient.post<PageResponse<MemberWeeklyReportList>>(
      `/reports/team/weekly/member?${params.toString()}`,
      requestBody
    );
  }

  async getMemberWeeklyReport(id: number): Promise<MemberWeeklyReportData> {
    return this.apiClient.get<MemberWeeklyReportData>(
      `/reports/team/weekly/member/${id}`
    );
  }

  // 여기에 다른 API 요청 메소드들을 추가할 수 있습니다.
  // 예시:
  // /**
  //  * 새로운 사용자를 생성합니다.
  //  * @async
  //  * @template T - 예상되는 응답 데이터의 타입입니다.
  //  * @param {object} userData - 생성할 사용자의 데이터입니다.
  //  * @returns {Promise<T>} API 응답 데이터를 포함하는 Promise 객체입니다.
  //  * @throws {Error} API 요청이 실패하면 에러를 throw합니다.
  //  */
  // async createUser<T>(userData: object): Promise<T> {
  //   try {
  //     return this.apiClient.post<T>('users', userData);
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     throw error;
  //   }
  // }
}

export const httpInterface = new HttpInterface(api); // api 객체를 임포트합니다.

// 이 클래스를 사용하는 방법:
// 1. api 객체를 임포트합니다.
// import { api } from './http';
//
// 2. HttpInterface 인스턴스를 생성합니다.
// const apiClient = new HttpInterface(api);
//
// 3. 필요한 API 메소드를 호출합니다.
// async function fetchSomeCategory() {
//   try {
//     const categories = await apiClient.getCategory('yourMallTypeId');
//     console.log(categories);
//   } catch (error) {
//     // 에러 처리
//   }
// }
