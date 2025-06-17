import { httpInterface } from "@/lib/api/httpInterface";
import { PageRequest } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

export const useGetWeeklyReports = (pageRequest: PageRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weekly-reports", pageRequest],
    queryFn: () => httpInterface.getWeeklyReports(pageRequest),
    placeholderData: prev => prev,
  });

  return { data, isLoading, isError };
};
