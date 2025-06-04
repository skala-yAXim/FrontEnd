import type { serverApi as ServerApiType } from "./http";

interface UserInfo {
  name: string;
  email: string;
  // 추가 필드 정의
}

/**
 * 서버 컴포넌트용 API 인터페이스 클래스입니다.
 */
export class ServerHttpInterface {
  private apiClient: typeof ServerApiType;

  constructor(apiClient: typeof ServerApiType) {
    this.apiClient = apiClient;
  }

  /**
   * 사용자 정보를 가져옵니다.
   * @async
   * @returns {Promise<UserInfo>} 사용자 정보
   * @throws {Error} API 요청 실패 시 에러를 throw합니다.
   */
  async getMyInfo(): Promise<UserInfo> {
    return this.apiClient.get<UserInfo>("/my/info");
  }

  // 여기에 다른 서버 컴포넌트용 API 메소드들을 추가할 수 있습니다.
}

// 싱글톤 인스턴스 생성 및 export
import { serverApi } from "./http";
export const serverHttpInterface = new ServerHttpInterface(serverApi);
