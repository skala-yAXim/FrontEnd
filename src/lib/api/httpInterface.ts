import { api as ApiClientType } from "./http"; // http.ts의 api 객체 타입을 가져옵니다.

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

import { api } from "./http";
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
