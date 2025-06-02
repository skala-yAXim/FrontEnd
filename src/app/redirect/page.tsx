"use client";

import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { User, UserRole } from "@/types/userType";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const user = useAuthStore(state => state.user);
  const login = useAuthStore(state => state.login);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await api.get<User>("/my/info");
        if (userData) {
          login(userData, userData.userRole as UserRole);
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        alert("로그인에 실패하였습니다. 로그인 페이지로 이동합니다.");
        router.push("/login");
      }
    };
    fetchData();
  }, [login, router]);

  return (
    // 로그인 중인 상태 확인 페이지

    <div>
      {/* <h1>userName:{user?.name}</h1>
      <p>userEmail:{user?.email}</p>
      <p>userRole:{user?.userRole}</p>
      <p>userId:{user?.userId}</p>
      <p>gitEmail:{user?.gitEmail}</p> */}
      <p>로그인 중인 상태 확인 페이지</p>
    </div>
  );
}
