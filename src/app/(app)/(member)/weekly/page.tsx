// TODO: 리팩토링 (use client 남발, 더미 데이터 사용)
"use client";

import { AnimatedItem, AnimatedLayout } from "@/components/AnimatedLayout";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { CardContent } from "@/components/ui/card";
import DataTable, { Column } from "@/components/ui/data-table";
import { useServerPagination } from "@/hooks/useServerPagination";
import { useGetWeeklyReports } from "@/hooks/useUserWeeklyQueries";
import { WeeklyReportList } from "@/types/reportType";
import { useRouter } from "next/navigation";

export default function WeeklyReportsPage() {
  const router = useRouter();

  const pagination = useServerPagination({
    initialPage: 0,
    initialSize: 10,
    initialSort: "createdAt,desc",
  });

  const {
    data: weeklyReportsData,
    isLoading,
    isError,
  } = useGetWeeklyReports(pagination.pageRequest);

  const weeklyReports = weeklyReportsData?.content || [];
  const totalItems = weeklyReportsData?.totalElements || 0;
  const totalPages = weeklyReportsData?.totalPages || 0;

  // 행 클릭 핸들러
  const handleRowClick = (item: WeeklyReportList) => {
    router.push(`/weekly/${item.id}`);
  };

  // 보고서 제목에서 날짜 추출 함수
  const extractDateFromTitle = (title: string): string => {
    // "조민서님의 2025-06-02 ~ 2025-06-06 주간 업무 보고서" 형식에서 시작 날짜 추출
    const dateMatch = title.match(/(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      const date = new Date(dateMatch[1]);
      return date.toLocaleDateString("ko-KR");
    }
    return new Date().toLocaleDateString("ko-KR");
  };

  // 테이블 컬럼 정의
  const columns: Column<WeeklyReportList>[] = [
    {
      key: "title",
      label: "제목",
      render: value => <div className='font-medium'>{value}</div>,
    },
    {
      key: "createdAt",
      label: "생성일자",
      render: (value, item) => (
        <span className='text-sm text-muted-foreground'>
          {extractDateFromTitle(item.title)}
        </span>
      ),
    },
  ];

  return (
    <AnimatedLayout>
      <AnimatedItem>
        <PageHeader
          title='위클리 보고서'
          description='지난 위클리 보고서들을 확인하고 새로운 보고서를 자동으로 생성할 수 있습니다.'
        />
        <CardContent className='p-6 space-y-6'>
          {/* 테이블 */}
          <DataTable
            data={weeklyReports}
            columns={columns}
            onRowClick={handleRowClick}
            isLoading={isLoading}
            emptyMessage='아직 생성된 위클리 보고서가 없습니다.'
          />

          {/* 페이지네이션 */}
          <Pagination
            {...pagination.getPaginationProps(totalItems)}
            showPageInfo={true}
            showResultInfo={true}
            className='mt-6'
          />
        </CardContent>
      </AnimatedItem>
    </AnimatedLayout>
  );
}
