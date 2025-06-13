import { httpInterface } from "@/lib/api/httpInterface";
import { StaticsUserType } from "@/types/dashboardType";
import { useQuery } from "@tanstack/react-query";

export const useGetStaticsUser = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["staticsUser"],
    queryFn: () => httpInterface.getStaticsUser(),
  });

  return { data: data as StaticsUserType, isLoading, isError };
};
