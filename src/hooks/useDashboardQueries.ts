import { httpInterface } from "@/lib/api/httpInterface";
import { StaticsTeamType, StaticsUserType } from "@/types/dashboardType";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardUser = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardUser"],
    queryFn: () => httpInterface.getDashboardUser<StaticsUserType[]>(),
  });

  return { data: data as StaticsUserType[], isLoading, isError };
};

export const useGetDashboardUserAvg = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardUserAvg"],
    queryFn: () => httpInterface.getDashboardAvgUser<StaticsUserType[]>(),
  });

  return { data: data as StaticsUserType[], isLoading, isError };
};

export const useGetStaticsUserWeek = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["staticsUserWeek"],
    queryFn: () => httpInterface.getDashboardUserWeek(),
  });

  return { data: data as StaticsUserType, isLoading, isError };
};

export const useGetStaticsTeamWeek = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["staticsTeamWeek"],
    queryFn: () => httpInterface.getDashboardTeamWeek(),
  });

  return { data: data as StaticsTeamType, isLoading, isError };
};
