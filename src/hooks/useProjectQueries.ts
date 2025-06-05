import { httpInterface } from "@/lib/api/httpInterface";
import { Project } from "@/types/projectType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetProjects = (page: number, size: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects", page, size],
    queryFn: () => httpInterface.getProjects(page, size),
  });

  return { data: data as Project[], isLoading, isError };
};

export const useCreateProjects = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: FormData) => httpInterface.createProject(formData),
    onSuccess: () => {
      // 프로젝트 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      // 목록 페이지로 이동
      router.push("/project-management");
    },
    onError: error => {
      console.error("프로젝트 등록 실패:", error);
      // TODO: 에러 처리 (예: 토스트 메시지 표시)
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (projectId: number) => httpInterface.deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push("/project-management");
    },
    onError: error => {
      console.error("프로젝트 삭제 실패:", error);
    },
  });
};
