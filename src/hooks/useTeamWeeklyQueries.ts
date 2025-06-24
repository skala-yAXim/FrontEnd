import { useQuery } from "@tanstack/react-query";
import { httpInterface } from "../lib/api/httpInterface";

export const useGetTeamWeeklyReport = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["team-weekly-report", id],
    queryFn: async () => httpInterface.getTeamWeeklyReport(id),
  });

  return { data, isLoading, isError };
};
