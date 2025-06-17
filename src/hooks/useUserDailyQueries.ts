import { httpInterface } from "@/lib/api/httpInterface";
import { PageRequest } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

export const useGetDailyReports = (pageRequest: PageRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["daily-reports", pageRequest],
    queryFn: () => httpInterface.getDailyReports(pageRequest),
    placeholderData: prev => prev,
  });

  return { data, isLoading, isError };
};

export const useGetDailyReport = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["daily-report", id],
    queryFn: () => httpInterface.getDailyReport(id),
  });

  return { data, isLoading, isError };
};
