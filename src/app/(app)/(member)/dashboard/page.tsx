"use client";

import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { api } from "../../../../lib/api";

export default function DashboardPage() {
  const onClick = () => {
    api.get("/my/info").then(res => {
      console.log(res);
    });
  };
  const onClickLogout = () => {
    api.post("/auth/logout", {}).then(res => {
      console.log(res);
    });
    localStorage.removeItem("auth-storage");
    window.location.href = "/login";
  };
  return (
    <div className='space-y-6'>
      <PageHeader
        title='대시보드'
        description='환영합니다! 여기는 대시보드 페이지입니다.'
      />
      <Button onClick={onClick}>test</Button>
      <Button onClick={onClickLogout}>로그아웃</Button>
    </div>
  );
}
