import { httpInterface } from "@/lib/api/httpInterface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetTeamInfo = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["team-info"],
    queryFn: () => httpInterface.getTeamInfo(),
  });

  return { data, isLoading };
};

export const usePostTemplate = () => {
  const queryClient = useQueryClient();

  const { mutate: postTemplate, isPending } = useMutation({
    mutationFn: (template: string) => {
      console.log("API 요청 시작:", template);
      return httpInterface.postTeamTemplate(template);
    },
    onSuccess: () => {
      console.log("API 요청 성공");
      toast.success("템플릿이 저장되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["team-info"] });
    },
    onError: error => {
      console.error("API 요청 실패:", error);
      toast.error("템플릿 저장에 실패했습니다. 다시 시도해주세요.");
    },
  });

  return { postTemplate, isPending };
};
