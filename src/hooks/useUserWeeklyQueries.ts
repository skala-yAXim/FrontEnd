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

export const useGetUserWeeklyReport = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weekly-report", id],
    queryFn: () => httpInterface.getUserWeeklyReport(id),
  });

  return { data, isLoading, isError };
};
