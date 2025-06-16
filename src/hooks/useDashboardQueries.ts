import { httpInterface } from "@/lib/api/httpInterface";
import { StaticsTeamType, StaticsUserType } from "@/types/dashboardType";
import { useQuery } from "@tanstack/react-query";

export const useGetStaticsUser = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["staticsUser"],
    queryFn: () => httpInterface.getStaticsUser(),
  });

  return { data: data as StaticsUserType, isLoading, isError };
};

export const useGetStaticsUserAvg = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["staticsUserAvg"],
    queryFn: () => httpInterface.getStaticsUserAvg(),
  });

  return { data: data as StaticsUserType, isLoading, isError };
};

export const useGetStaticsUserWeek = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["staticsUserWeek"],
    queryFn: () => httpInterface.getStaticsUserWeek(),
  });

  return { data: data as StaticsUserType, isLoading, isError };
};

export const useGetStaticsTeamWeek = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["staticsTeamWeek"],
    queryFn: () => httpInterface.getStaticsTeamWeek(),
  });

  return { data: data as StaticsTeamType, isLoading, isError };
};
