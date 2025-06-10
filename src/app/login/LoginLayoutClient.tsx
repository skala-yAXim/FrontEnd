"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

export default function LoginLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isLoading = useAuthStore(state => state.isLoading); // isLoading 상태 구독
  const router = useRouter();
  const hasAttemptedRedirect = useRef(false); // 리디렉션 시도 여부 추적

  useEffect(() => {
    // isLoading이 false로 변경되어 스토어가 준비되었고,
    // 아직 리디렉션 시도를 하지 않았을 때만 로직 실행
    if (!isLoading && !hasAttemptedRedirect.current) {
      hasAttemptedRedirect.current = true; // 리디렉션 시도 플래그 설정
      if (isAuthenticated) {
        console.log(
          "LoginLayoutClient: Store rehydrated. User is authenticated. Redirecting to /dashboard."
        );
        router.push("/dashboard");
      } else {
        console.log(
          "LoginLayoutClient: Store rehydrated. User is not authenticated. Staying on login page."
        );
        // 특별히 할 일 없음, children (로그인 페이지)이 렌더링됨
      }
    }
  }, [isLoading, isAuthenticated, router]);

  // 스토어가 로딩 중일 때는 아무것도 보여주지 않거나 로딩 스피너 표시
  if (isLoading) {
    // console.log("LoginLayoutClient: isLoading is true. Returning null.");
    return null; // 또는 <GlobalSpinner /> 등
  }

  // 로딩이 끝났고, 사용자가 이미 인증된 상태라면 (리디렉션 될 것이므로) null 반환
  // (위 useEffect에서 리디렉션이 발생하기 전에 이 부분이 먼저 실행될 수 있음)
  if (isAuthenticated) {
    // console.log("LoginLayoutClient: isLoading is false, isAuthenticated is true. Likely redirecting. Returning null.");
    return null;
  }

  // 로딩이 끝났고, 사용자가 인증되지 않은 상태라면 로그인 페이지(children) 표시
  // console.log("LoginLayoutClient: isLoading is false, isAuthenticated is false. Rendering children.");
  return <>{children}</>;
}
