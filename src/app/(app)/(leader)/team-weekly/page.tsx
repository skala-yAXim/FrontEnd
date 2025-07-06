// TODO: 리팩토링 (use client 남발, 더미 데이터 사용)
"use client";

import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useServerPagination } from "@/hooks/useServerPagination";
import { useGetTeamWeeklyReports } from "@/hooks/useTeamWeeklyQueries";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WeeklyReportTable from "./_components/WeeklyReportTable";

export default function TeamWeeklyPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 페이지네이션 훅 사용
  const pagination = useServerPagination({
    initialPage: 0,
    initialSize: 10,
    initialSort: "createdAt,desc",
  });

  const {
    data: teamWeeklyReportsData,
    isLoading,
    isError,
  } = useGetTeamWeeklyReports(pagination.pageRequest);

  const teamWeeklyReports = teamWeeklyReportsData?.content || [];
  const totalItems = teamWeeklyReportsData?.totalElements || 0;
  const totalPages = teamWeeklyReportsData?.totalPages || 0;

  // 행 클릭 핸들러
  const handleRowClick = (reportId: string) => {
    router.push(`/team-weekly/${reportId}`);
  };

  // 새 보고서 생성 핸들러 - 1번 페이지로 이동
  const handleCreateNew = () => {
    router.push("/team-weekly/setting");
  };

  const MyButton = () => {
    return (
      <Button onClick={handleCreateNew} className='w-full'>
        <Settings className='w-4 h-4' />
        설정
      </Button>
    );
  };

  return (
    <div>
      <PageHeader
        title='팀 위클리'
        description='팀 위클리 보고서 목록'
        buttonElement={<MyButton />}
      />

      <div className='w-full'>
        {" "}
        {/* 👈 매니저 위클리와 동일한 래퍼 */}
        <CardContent className='p-6 space-y-6'>
          {" "}
          {/* 👈 CardContent + space-y-6 */}
          <WeeklyReportTable
            reports={teamWeeklyReports}
            onRowClick={handleRowClick}
            isLoading={isLoading}
            emptyMessage='아직 생성된 팀 위클리 보고서가 없습니다.'
          />
          {/* 페이지네이션 - 조건부 렌더링 */}
          {totalPages > 0 && (
            <Pagination
              {...pagination.getPaginationProps(totalItems)}
              showPageInfo={true}
              showResultInfo={true}
            />
          )}
        </CardContent>
      </div>
    </div>
  );
}
