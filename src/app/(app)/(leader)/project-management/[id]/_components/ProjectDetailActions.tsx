"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProjectDetailActionsProps {
  projectId: number;
}

export function ProjectDetailActions({ projectId }: ProjectDetailActionsProps) {
  const router = useRouter();

  // 뒤로가기 핸들러
  const handleGoBack = () => {
    router.push("/project-management");
  };

  // 프로젝트 수정 핸들러
  const handleEditProject = () => {
    router.push(`/project-management/create?edit=${projectId}`);
  };

  return (
    <div className='flex justify-between items-center mb-6'>
      <Button variant='outline' onClick={handleGoBack}>
        <ArrowLeft className='w-4 h-4' />
        뒤로가기
      </Button>

      <Button onClick={handleEditProject} className='flex items-center gap-2'>
        <Edit className='w-4 h-4' />
        프로젝트 수정
      </Button>
    </div>
  );
}
