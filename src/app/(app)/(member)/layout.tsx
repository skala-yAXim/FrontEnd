"use client";

import { AuthState, useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function MemberGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userRole = useAuthStore((state: AuthState) => state.user?.userRole);
  const isAuthenticated = useAuthStore(
    (state: AuthState) => state.isAuthenticated
  );
  const isLoadingAuth = useAuthStore((state: AuthState) => state.isLoading);
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingAuth) {
      if (!isAuthenticated) {
        router.replace("/login");
      } else if (userRole !== "MEMBER" && userRole !== "LEADER") {
        // 혹은 접근 권한 없음 페이지로 리다이렉트
        // router.replace("/unauthorized");
        console.warn(
          "Access denied: User is not MEMBER or LEADER. Current role:",
          userRole
        );
        router.replace("/login"); // 우선 로그인 페이지로 리다이렉트
      }
    }
  }, [isLoadingAuth, isAuthenticated, userRole, router]);

  // isLoadingAuth와 isAuthenticated는 상위 (app)/layout.tsx 에서 이미 처리되었을 가능성이 높습니다.
  // 하지만, 안전을 위해 또는 독립적으로 이 레이아웃을 테스트하기 위해 체크할 수 있습니다.
  if (isLoadingAuth) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p>Loading authentication (Member Layout)...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // 상위 레이아웃에서 /login으로 리다이렉트 할 것이므로 null 반환
  }

  // MEMBER 또는 LEADER가 아니면 접근 불가
  if (userRole !== "MEMBER" && userRole !== "LEADER") {
    // useEffect에서 리다이렉션이 발생할 때까지 보여줄 간단한 메시지 또는 로더
    return (
      <div className='flex h-screen items-center justify-center'>
        <p>Checking permissions...</p>
      </div>
    );
  }

  // 유효한 사용자인 경우 자식 컴포넌트 렌더링
  return <>{children}</>;
}
