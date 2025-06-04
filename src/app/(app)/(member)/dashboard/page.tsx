"use client";

import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { httpInterface } from "@/lib/api/httpInterface";
export default function DashboardPage() {
  const handleTest = () => {
    httpInterface
      .getMyInfo()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className='space-y-6'>
      <PageHeader
        title='대시보드'
        description='환영합니다! 여기는 대시보드 페이지입니다.'
      />
      <Button onClick={handleTest}>Test</Button>
    </div>
  );
}
