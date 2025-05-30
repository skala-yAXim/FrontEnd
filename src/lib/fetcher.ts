export async function customFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";
  const isAbsolutePath =
    path.startsWith("http://") || path.startsWith("https://");
  const fullUrl = isAbsolutePath
    ? path
    : `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

  const defuaultOptions: RequestInit = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  };

  const res = await fetch(fullUrl, defuaultOptions);

  if (!res.ok) {
    if (res.status === 401) {
      // 예시: 토큰 만료 시 로그인 페이지로 이동
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || `Error: ${res.status}`);
  }

  return res.json();
}
