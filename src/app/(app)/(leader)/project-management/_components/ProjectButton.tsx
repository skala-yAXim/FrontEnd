"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function AddProjectButton() {
  const router = useRouter();

  const handleAddProject = () => {
    router.push("/project-management/create");
  };

  return (
    <Button onClick={handleAddProject}>
      <Plus className='w-4 h-4' />
      프로젝트 추가
    </Button>
  );
}
