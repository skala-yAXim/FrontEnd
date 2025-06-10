import { httpInterface } from "@/lib/api/httpInterface";
import { GitHubInfo } from "@/types/githubType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetGitHubInfo = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["gitInfo"],
    queryFn: () => httpInterface.getGitInfo(),
  });

  return { data: data as GitHubInfo, isLoading, isError };
};

export const useDeleteGitHubInfo = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => httpInterface.deleteGitInfo(),
    onSuccess: () => {
      // 연동 해제 성공 시 gitInfo 쿼리 무효화하여 데이터 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ["gitInfo"] });
    },
  });

  return { mutate, isPending, isError };
};
