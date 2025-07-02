"use client";

import PageHeader from "@/components/PageHeader";
import { CardContent } from "@/components/ui/card";
import {
  useCreateProjects,
  useGetProjectDetail,
  useUpdateProject,
} from "@/hooks/useProjectQueries";
import { ProjectCreateForm } from "@/types/projectType";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ProjectForm } from "./_components/ProjectForm";

export default function ProjectCreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Hook들
  const createProject = useCreateProjects();
  const updateProject = useUpdateProject();

  // 수정 모드 확인
  const editId = searchParams.get("edit");
  const isEditMode = !!editId;

  // 수정 모드일 때만 프로젝트 상세 정보 가져오기
  const { data: projectData, isLoading } = useGetProjectDetail(editId);

  // 프로젝트 데이터를 form 형태로 변환
  const initialData = useMemo(() => {
    if (!projectData || !isEditMode) return undefined;

    return {
      name: projectData.name,
      startDate: projectData.startDate,
      endDate: projectData.endDate,
      description: projectData.description,
      files: [], // 파일은 빈 배열로 시작 (기존 파일은 수정하지 않음)
    } as ProjectCreateForm;
  }, [projectData, isEditMode]);

  const handleSubmit = async (form: ProjectCreateForm) => {
    try {
      // FormData 생성
      const formData = new FormData();

      // 기본 프로젝트 정보 추가
      formData.append("name", form.name);
      formData.append("startDate", form.startDate);
      formData.append("endDate", form.endDate);
      formData.append("description", form.description);

      // 파일 추가 (File 객체만 사용)
      form.files.forEach(file => {
        formData.append("files", file.file);
      });

      // API 분기 처리
      if (isEditMode && editId) {
        // 수정 모드: PATCH API 사용
        await updateProject.mutateAsync({
          projectId: Number(editId),
          formData,
        });
      } else {
        // 생성 모드: POST API 사용
        await createProject.mutateAsync(formData);
      }
    } catch (error) {
      console.error("프로젝트 처리 실패:", error);
      // TODO: 에러 처리 (예: 토스트 메시지 표시)
    }
  };

  const handleCancel = () => {
    router.push("/project-management");
  };

  // 수정 모드에서 로딩 중이면 로딩 표시
  if (isEditMode && isLoading) {
    return (
      <div>
        <PageHeader title='프로젝트 정보 수정' />
        <div className='flex justify-center p-10'>
          <div className='flex flex-col items-center gap-3'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
            <p className='text-sm text-muted-foreground'>
              프로젝트 정보를 불러오는 중...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title={isEditMode ? "프로젝트 정보 수정" : "프로젝트 정보 등록"}
      />

      <CardContent>
        <ProjectForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={createProject.isPending || updateProject.isPending}
          initialData={initialData}
          isEditMode={isEditMode}
        />
      </CardContent>
    </>
  );
}
