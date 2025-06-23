import { httpInterface } from "@/lib/api/httpInterface";
import { PageRequest } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

// 팀원 목록 조회 Hook
export const useGetTeamMembers = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["team-members"],
    queryFn: () => httpInterface.getTeamMembers(),
  });

  return { data, isLoading, isError };
};

export const useGetMemberWeeklyReports = (
  pageRequest: PageRequest,
  filters: { userId?: string[]; startDate?: string; endDate?: string }
) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["member-weekly-reports", pageRequest, filters],
    queryFn: () => httpInterface.getMemberWeeklyReports(pageRequest, filters),
    enabled: filters.userId && filters.userId.length > 0, // 내부에서 조건 처리
    placeholderData: prev => prev,
  });

  return { data, isLoading, isError };
};

export const useGetMemberWeeklyReport = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["member-weekly-report", id],
    queryFn: () => httpInterface.getMemberWeeklyReport(id),
    enabled: !!id,
  });

  return { data, isLoading, isError };
};
