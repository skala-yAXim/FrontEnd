"use client";

import PageHeader from "@/components/PageHeader";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateProjects } from "@/hooks/useCreateProjects";
import { ProjectCreateForm } from "@/types/projectType";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProjectForm } from "./_components/ProjectForm";

export default function ProjectCreatePage() {
  const router = useRouter();
  const createProject = useCreateProjects();

  const handleSubmit = async (form: ProjectCreateForm) => {
    try {
      // FormData 생성
      const formData = new FormData();

      // 기본 프로젝트 정보 추가
      formData.append("name", form.name);

      // 날짜를 UTC로 변환
      const startDateTime = new Date(form.startDate);
      const endDateTime = new Date(form.endDate);

      // Spring의 LocalDateTime 기본 형식으로 포맷팅 (yyyy-MM-dd'T'HH:mm:ss)
      const formatToLocalDateTime = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      };

      formData.append("startDate", formatToLocalDateTime(startDateTime));
      formData.append("endDate", formatToLocalDateTime(endDateTime));
      formData.append("description", form.description);

      // 파일 추가 (File 객체만 사용)
      form.files.forEach(file => {
        formData.append("files", file.file);
      });

      // API 호출
      await createProject.mutateAsync(formData);
    } catch (error) {
      console.error("프로젝트 등록 실패:", error);
      // TODO: 에러 처리 (예: 토스트 메시지 표시)
    }
  };

  const handleCancel = () => {
    router.push("/project-management");
  };

  return (
    <>
      <PageHeader title='프로젝트 정보 등록' />

      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Plus className='w-5 h-5' />
          프로젝트 정보 등록
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ProjectForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={createProject.isPending}
        />
      </CardContent>
    </>
  );
}
