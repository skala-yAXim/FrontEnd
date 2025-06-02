import { api } from "./http"; // http.ts의 api 객체
import { HttpInterface } from "./httpInterface";

/**
 * API 요청을 위한 전역 HttpInterface 인스턴스입니다.
 * 이 인스턴스를 사용하여 애플리케이션 전체에서 일관된 방식으로 API를 호출할 수 있습니다.
 * @example
 * import { httpClient } from '@/lib/api'; // httpClient가 있는 경로로 수정
 *
 * async function fetchCategories() {
 *   const categories = await httpClient.getCategory('someMallId');
 *   // ...
 * }
 */
const httpClient = new HttpInterface(api);

export { httpClient };
