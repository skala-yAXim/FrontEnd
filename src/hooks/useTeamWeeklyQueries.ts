import { httpInterface } from "@/lib/api/httpInterface";
import { PageRequest } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

export const useGetTeamWeeklyReports = (pageRequest: PageRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["team-weekly-reports", pageRequest],
    queryFn: async () => httpInterface.getTeamWeeklyReports(pageRequest),
  });

  return { data, isLoading, isError };
};

export const useGetTeamWeeklyReport = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["team-weekly-report", id],
    queryFn: async () => httpInterface.getTeamWeeklyReport(id),
  });

  return { data, isLoading, isError };
};
