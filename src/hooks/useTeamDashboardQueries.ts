import { httpInterface } from "@/lib/api/httpInterface";
import { StaticsTeamType } from "@/types/dashboardType";
import { TeamComment } from "@/types/teamType";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardTeam = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardTeam"],
    queryFn: () => httpInterface.getDashboardTeam<StaticsTeamType[]>(),
  });

  return { data: data as StaticsTeamType[], isLoading, isError };
};

export const useGetDashboardTeamAvg = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardTeamAvg"],
    queryFn: () => httpInterface.getDashboardTeamAvg<StaticsTeamType[]>(),
  });

  return { data: data as StaticsTeamType[], isLoading, isError };
};

export const useGetStaticsTeamWeek = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["staticsTeamWeek"],
    queryFn: () => httpInterface.getDashboardTeamWeek(),
  });

  return { data: data as StaticsTeamType, isLoading, isError };
};

export const useGetCommentTeam = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comment-Team"],
    queryFn: () => httpInterface.getCommentTeam(),
  });

  return { data: data as TeamComment, isLoading, isError };
};
