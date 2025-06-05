import { httpInterface } from "@/lib/api/httpInterface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
