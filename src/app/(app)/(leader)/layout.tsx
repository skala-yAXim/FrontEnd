"use client";

import { AuthState, useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function LeaderGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userRole = useAuthStore((state: AuthState) => state.userRole);
  const isAuthenticated = useAuthStore(
    (state: AuthState) => state.isAuthenticated
  );
  const isLoadingAuth = useAuthStore((state: AuthState) => state.isLoading);
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingAuth) {
      if (!isAuthenticated) {
        router.replace("/login");
      } else if (userRole !== "LEADER") {
        // 혹은 접근 권한 없음 페이지로 리다이렉트
        // router.replace("/unauthorized");
        console.warn(
          "Access denied: User is not LEADER. Current role:",
          userRole
        );
        router.replace("/login"); // 혹은 (member) 그룹의 기본 페이지 등으로 리다이렉트 할 수도 있습니다.
      }
    }
  }, [isLoadingAuth, isAuthenticated, userRole, router]);

  if (isLoadingAuth) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p>Loading authentication (Leader Layout)...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (userRole !== "LEADER") {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p>Access Denied. Checking permissions...</p>
      </div>
    );
  }

  return <>{children}</>;
}
