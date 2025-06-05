/**
 * @async
 * @template T
 * @function customFetch
 * @param {string} path - API 엔드포인트 경로입니다.
 * @param {RequestInit} [options={}] - 선택적인 fetch 옵션입니다.
 * @param {boolean} [isRetryAttempt=false] - 무한 리프레시 루프를 방지하기 위한 내부 플래그입니다.
 * @returns {Promise<T>} 가져온 데이터로 resolve되는 Promise 객체입니다.
 * @throws {Error} fetch 작업이 실패하거나 토큰 리프레시가 실패하면 에러를 throw합니다.
 * @description API 요청을 처리하는 커스텀 fetch 함수입니다. 401 에러 발생 시 자동으로 토큰 리프레시를 시도합니다.
 */
// 토큰 리프레시 상태를 전역적으로 관리하기 위한 변수
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

export async function customFetch<T>(
  path: string,
  options: RequestInit = {},
  isRetryAttempt: boolean = false // Renamed for clarity
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";
  const isAbsolutePath =
    path.startsWith("http://") || path.startsWith("https://");
  const fullUrl = isAbsolutePath
    ? path
    : `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

  // FormData인 경우 Content-Type 헤더를 설정하지 않음
  const isFormData = options.body instanceof FormData;
  const defaultOptions: RequestInit = {
    credentials: "include",
    headers: isFormData
      ? options.headers
      : {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
    ...options,
  };

  let res = await fetch(fullUrl, defaultOptions);

  // 401 에러이고, 재시도 요청이 아니며, 리프레시 엔드포인트 자체가 아닌 경우 토큰 리프레시 시도
  if (res.status === 401 && !isRetryAttempt && path !== "/api/auth/refresh") {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = (async () => {
        try {
          const refreshResponse = await fetch(`${baseUrl}/auth/reissue`, {
            method: "POST",
            credentials: "include", // HttpOnly 쿠키에 리프레시 토큰이 있는 경우 중요
          });

          if (!refreshResponse.ok) {
            // 리프레시 토큰 실패 (예: 리프레시 토큰 만료 또는 무효)
            // console.error("Token refresh failed:", refreshResponse.status);
            throw new Error(
              `Token refresh failed with status: ${refreshResponse.status}`
            );
          }
          // 리프레시 성공 시, 서버가 새 토큰을 설정했다고 가정 (예: HttpOnly 쿠키)
        } catch (error) {
          // 리프레시 실패 시 인증 상태 초기화 및 로그인 페이지로 리디렉션
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth-storage"); // Zustand persist 키
            window.location.href = "/login";
          }
          // 에러를 다시 throw하여 리프레시 실패를 알림
          throw error instanceof Error
            ? error
            : new Error("Token refresh failed");
        } finally {
          isRefreshing = false;
        }
      })();
    }

    try {
      await refreshPromise; // 진행 중인 리프레시 시도 (또는 방금 시작된 시도)를 기다림
      // 원래 요청 재시도
      res = await fetch(fullUrl, defaultOptions);
    } catch (refreshError) {
      // 이 catch 블록은 refreshPromise 자체의 에러를 처리합니다 (예: 리프레시 실패 및 리디렉션됨).
      // 리프레시가 실패하면 이미 리디렉션되었을 것입니다.
      // 추가 실행을 중지하고 작업이 완료될 수 없음을 알리기 위해 에러를 throw합니다.
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      console.error(
        "Token refresh process failed, redirecting or already redirected.",
        refreshError
      );
      throw new Error(
        "Failed to refresh token and complete the original request."
      );
    }
  }

  if (!res.ok) {
    // 여전히 응답이 실패한 경우 (원래 에러 또는 리프레시 시도 후 에러)
    if (res.status === 401) {
      // 리프레시 시도 후에도 여전히 401이거나, 리프레시 엔드포인트 자체에서 401이 발생했거나,
      // 다른 이유로 401이고 이 코드 블록에 도달했다면 로그아웃 처리합니다.
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-storage");
        alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
        window.location.href = "/login";
      }
    }
    // 에러 응답 본문을 JSON으로 파싱 시도
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error! status: ${res.status}`);
  }

  if (res.status === 204) {
    // 204 No Content
    return null as T;
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    // JSON이 아니거나, 본문이 없음
    return null as T;
  }

  const text = await res.text();
  if (!text) {
    return null as T;
  }
  return JSON.parse(text);
}
