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
import React, { useMemo } from "react";
import { toast } from "sonner";
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

  // API 응답 데이터 확인
  React.useEffect(() => {
    if (projectData) {
      console.log("프로젝트 상세 정보:", projectData);
      console.log("프로젝트 파일 목록:", projectData.files);
    }
  }, [projectData]);

  // 프로젝트 데이터를 form 형태로 변환
  const initialData = useMemo(() => {
    if (!projectData || !isEditMode) return undefined;

    console.log("프로젝트 데이터 변환:", projectData);

    // 파일 목록이 있는지 확인
    if (projectData.files) {
      console.log("파일 목록 있음:", projectData.files.length);
    } else {
      console.log("파일 목록 없음");
    }

    return {
      name: projectData.name,
      startDate: projectData.startDate,
      endDate: projectData.endDate,
      description: projectData.description,
      files: [], // 새로 추가할 파일은 빈 배열로 시작
      existingFiles: projectData.files || [], // 기존 파일 목록 추가
      deleteFileIds: [], // 삭제할 파일 ID 목록 초기화
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

      // 삭제할 파일 ID 목록 추가
      if (form.deleteFileIds && form.deleteFileIds.length > 0) {
        formData.append("deleteFileIds", form.deleteFileIds.join(","));
      } else {
        formData.append("deleteFileIds", "");
      }

      // 수정 모드일 때만 projectId 추가
      if (isEditMode && editId) {
        // 문자열이 아닌 경우를 대비해 명시적으로 문자열로 변환
        formData.append("id", String(editId));
        console.log(`Adding projectId: ${editId} (${typeof editId})`);
      }

      // 파일 추가 (File 객체만 사용)
      form.files.forEach((file, index) => {
        formData.append("files", file.file);
        console.log(`Adding file ${index + 1}: ${file.file.name}`);
      });

      // 수정 모드에서 새 파일이 없는 경우에도 API 요청이 성공하도록 빈 문자열 추가
      if (isEditMode && form.files.length === 0) {
        // 빈 문자열 대신 빈 Blob 객체를 추가하여 빈 파일로 인식되도록 함
        const emptyBlob = new Blob([], { type: "application/octet-stream" });
        const emptyFile = new File([emptyBlob], "", {
          type: "application/octet-stream",
        });
        formData.append("files", emptyFile);
        console.log("새 파일이 없어 빈 파일 객체 추가");
      }

      // FormData 내용 디버깅을 위한 로그
      console.log("FormData 내용:");
      for (const pair of formData.entries()) {
        // File 객체는 내용을 직접 출력하지 않고 이름과 크기만 출력
        if (pair[1] instanceof File) {
          console.log(
            `${pair[0]}: File(${(pair[1] as File).name}, ${(pair[1] as File).size} bytes)`
          );
        } else {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
      }

      // API 분기 처리
      if (isEditMode && editId) {
        // 수정 모드: PATCH API 사용
        console.log("프로젝트 수정 요청 시작...");
        await updateProject.mutateAsync(formData);
        toast.success("프로젝트가 성공적으로 수정되었습니다.");
      } else {
        // 생성 모드: POST API 사용
        console.log("프로젝트 생성 요청 시작...");
        await createProject.mutateAsync(formData);
        toast.success("프로젝트가 성공적으로 등록되었습니다.");
      }
    } catch (error) {
      console.error("프로젝트 처리 실패:", error);
      toast.error(
        isEditMode
          ? "프로젝트 수정에 실패했습니다."
          : "프로젝트 등록에 실패했습니다."
      );
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
