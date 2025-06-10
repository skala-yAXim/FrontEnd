// TODO: API 연동 필요 (프로젝트 목록, 프로젝트 삭제)
// import React from 'react'; // React import no longer needed for Server Component UI
import PageHeader from "@/components/PageHeader";
import { AddProjectButton } from "./_components/ProjectButton";
import ProjectListClient from "./_components/ProjectListClient";

// 프로젝트 인터페이스 (Project type is imported from ProjectListClient now)

// 서버 컴포넌트
export default async function ProjectManagementPage() {
  // 서버에서 데이터 가져오기 (현재는 더미 데이터 생성)
  // 실제 애플리케이션에서는 API 호출 등을 통해 데이터를 가져옵니다.
  // const projects = await fetch('/api/projects').then(res => res.json());

  return (
    <div>
      <PageHeader
        title='팀 프로젝트 목록'
        buttonElement={<AddProjectButton />}
      />
      {/* 클라이언트 컴포넌트에 데이터 전달 */}
      <ProjectListClient />
    </div>
  );
}
