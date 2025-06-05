import { httpInterface } from "@/lib/api/httpInterface";
import { Project } from "@/types/projectType";
import { useQuery } from "@tanstack/react-query";

export const useGetProjects = (page: number, size: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects", page, size],
    queryFn: () => httpInterface.getProjects(page, size),
  });

  return { data: data as Project[], isLoading, isError };
};
