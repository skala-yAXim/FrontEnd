// TODO: 리팩토링 (use client 남발, 더미 데이터 사용)
"use client";

import { AnimatedItem, AnimatedLayout } from "@/components/AnimatedLayout";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { CardContent } from "@/components/ui/card";
import { useServerPagination } from "@/hooks/useServerPagination";
import { useGetWeeklyReports } from "@/hooks/useUserWeeklyQueries";
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
  const handleRowClick = (reportId: number) => {
    router.push(`/weekly/${reportId}`);
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

  return (
    <AnimatedLayout>
      <AnimatedItem>
        <PageHeader
          title='위클리 보고서'
          description='지난 위클리 보고서들을 확인하고 새로운 보고서를 자동으로 생성할 수 있습니다.'
        />
        <CardContent>
          {/* 테이블 */}
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b'>
                  <th className='text-left py-3 px-4 font-semibold text-sm'>
                    제목
                  </th>
                  <th className='text-left py-3 px-4 font-semibold text-sm'>
                    생성일자
                  </th>
                </tr>
              </thead>
              <tbody>
                {weeklyReports.length === 0 ? (
                  <tr>
                    <td
                      colSpan={2}
                      className='text-center py-8 text-muted-foreground'
                    >
                      아직 생성된 위클리 보고서가 없습니다.
                    </td>
                  </tr>
                ) : (
                  weeklyReports.map(report => (
                    <tr
                      key={report.id}
                      className={`border-b hover:bg-primary/5 hover:shadow-lg transition-all duration-200 cursor-pointer`}
                      onClick={() => handleRowClick(report.id)}
                      title={"클릭하여 상세보기"}
                    >
                      <td className='py-3 px-4'>
                        <div className='font-medium'>{report.title}</div>
                        {/* <TypographyMuted className='text-xs mt-1'>
                          {report.preview.slice(0, 60) + "..."}
                        </TypographyMuted> */}
                      </td>
                      <td className='py-3 px-4 text-sm text-muted-foreground'>
                        {extractDateFromTitle(report.title)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

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
