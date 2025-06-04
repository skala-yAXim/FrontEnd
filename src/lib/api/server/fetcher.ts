import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

interface FetchOptions extends RequestInit {
  cache?: RequestCache;
  tags?: string[];
  // skipRefresh?: boolean; // 리프레시 로직 관련, 일단 주석 처리
}

// interface RefreshResponse { // 리프레시 로직을 백엔드 프록시가 담당하거나, 별도 처리한다면 이 부분은 달라질 수 있음
//   accessToken: string;
// }

// async function refreshToken(): Promise<string> { ... } // 리프레시 로직도 필요시 여기에 통합 가능하나, 일단은 쿠키 전달에 집중

/**
 * 서버 컴포넌트에서 사용할 수 있는 fetch 유틸리티 함수입니다.
 * 모든 요청에 자동으로 현재 컨텍스트의 쿠키를 'Cookie' 헤더에 포함하여 전송합니다.
 * 이 함수는 실제 백엔드 서버와 직접 통신합니다.
 * @template T - 응답 데이터의 타입
 * @param {string} relativeUrl - 요청할 URL (실제 백엔드 서버 기준의 상대 경로, 예: "/my/info")
 * @param {FetchOptions} [options] - fetch 옵션
 * @returns {Promise<T>} 응답 데이터
 * @throws {Error} 요청 실패 시 에러를 throw합니다.
 */
export async function serverFetch<T>(
  relativeUrl: string,
  options: FetchOptions = {}
): Promise<T> {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  // let token = cookieStore.get("accessToken")?.value; // Authorization 헤더 방식이 아니므로 직접 사용 X

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL; // 실제 백엔드 서버 URL
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_SERVER_URL 환경 변수가 설정되지 않았습니다.");
  }
  // relativeUrl이 '/'로 시작하지 않으면 자동으로 추가
  const fullUrl = `${baseUrl}${relativeUrl.startsWith("/") ? relativeUrl : `/${relativeUrl}`}`;

  const requestHeaders = new Headers(options.headers);

  // 현재 컨텍스트의 모든 쿠키를 가져와 'Cookie' 헤더로 설정
  const allCookies = cookieStore.getAll();
  if (allCookies.length > 0) {
    const cookieString = allCookies
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join("; ");
    requestHeaders.set("Cookie", cookieString);
    // 디버깅 로그 (필요시 활성화)
    // console.log(`serverFetch: Forwarding cookies to ${fullUrl}: ${cookieString}`);
  } else {
    // 디버깅 로그 (필요시 활성화)
    // console.log(`serverFetch: No cookies found in current context for ${fullUrl}`);
  }

  // Content-Type 기본값 설정 (옵션에서 제공하지 않은 경우 및 바디가 있는 경우)
  if (!requestHeaders.has("Content-Type") && options.body) {
    requestHeaders.set("Content-Type", "application/json");
  }

  try {
    // credentials 옵션은 명시적 Cookie 헤더 설정 시 불필요하거나 충돌 가능성
    const response = await fetch(fullUrl, {
      ...options,
      headers: requestHeaders,
      cache: options.cache ?? "no-store",
    });

    // 401 에러 및 토큰 리프레시 로직은 필요시 여기에 다시 구현 (현재는 단순화)
    // if (response.status === 401 && !options.skipRefresh) { ... }

    if (!response.ok) {
      let errorBody = "";
      try {
        errorBody = await response.text();
      } catch (e) {
        // 에러 본문을 읽는데 실패한 경우 (이미 읽었거나 네트워크 문제 등)
        errorBody = "(에러 응답 본문을 읽을 수 없음)";
      }
      throw new Error(
        `API 요청 실패: ${response.status} ${response.statusText}. 응답: ${errorBody}. URL: ${fullUrl}`
      );
    }

    // 응답 본문이 비어있는 경우를 고려 (예: 204 No Content)
    const contentType = response.headers.get("content-type");
    if (
      response.status === 204 ||
      !contentType ||
      !contentType.includes("application/json")
    ) {
      return undefined as T; // 또는 {} as T 등, API 스펙에 맞춰 조정
    }

    return response.json();
  } catch (error) {
    // console.error(`Server API request failed for URL: ${fullUrl}`, error);
    if (error instanceof Error) {
      throw new Error(`${error.message} (URL: ${fullUrl})`);
    }
    throw new Error(`알 수 없는 에러 발생 (URL: ${fullUrl})`);
  }
}
