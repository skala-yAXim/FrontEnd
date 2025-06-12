// TODO: 리팩토링 (use client 남발, 더미 데이터 사용)
"use client";

import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { TypographyMuted } from "@/components/typography/Typograhpy";
import { CardContent } from "@/components/ui/card";
import { usePagination } from "@/hooks/usePagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mockWeeklyReports } from "./mock";

// 위클리 보고서 아이템 타입 (mock 데이터 구조에 맞춤)
interface WeeklyReportItem {
  id: number;
  report_title: string;
  weekly_report: {
    title: string;
    summary: string;
    contents: Array<{
      text: string;
      evidence: Array<{
        title: string;
        content: string;
        LLM_reference: string;
      }>;
    }>;
  };
  weekly_reflection: {
    title: string;
    content: string[];
  };
}

export default function WeeklyReportsPage() {
  const router = useRouter();

  // 보고서 데이터 상태 (mock 데이터 사용)
  const [reports, setReports] = useState<WeeklyReportItem[]>([]);

  // 페이지네이션 훅 사용
  const pagination = usePagination({
    totalItems: reports.length,
    itemsPerPage: 10,
    initialPage: 1,
  });

  // 현재 페이지의 보고서들
  const paginatedReports = pagination.sliceData(reports);

  useEffect(() => {
    // 클라이언트 사이드에서 mock 데이터 설정
    setReports(mockWeeklyReports as unknown as WeeklyReportItem[]);
  }, []);

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
    <div>
      <PageHeader
        title='위클리 보고서'
        description='지난 주간 보고서들을 확인하고 새로운 보고서를 자동으로 생성할 수 있습니다.'
        // buttonElement={
        //   // <Link href='/weekly/create'>
        //   //   <Button className='flex items-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground'>
        //   //     <Plus className='w-4 h-4' />새 보고서 생성
        //   //   </Button>
        //   // </Link>
        // }
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
              {paginatedReports.length === 0 ? (
                <tr>
                  <td
                    colSpan={2}
                    className='text-center py-8 text-muted-foreground'
                  >
                    아직 생성된 위클리 보고서가 없습니다.
                  </td>
                </tr>
              ) : (
                paginatedReports.map(report => (
                  <tr
                    key={report.id}
                    className={`border-b transition-colors hover:bg-muted/50 cursor-pointer`}
                    onClick={() => handleRowClick(report.id)}
                    title={"클릭하여 상세보기"}
                  >
                    <td className='py-3 px-4'>
                      <div className='font-medium'>{report.report_title}</div>
                      <TypographyMuted className='text-xs mt-1'>
                        {report.weekly_report.summary.slice(0, 60) + "..."}
                      </TypographyMuted>
                    </td>
                    <td className='py-3 px-4 text-sm text-muted-foreground'>
                      {extractDateFromTitle(report.report_title)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <Pagination
          currentPage={pagination.currentPage}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={pagination.handlePageChange}
          className='mt-6'
        />
      </CardContent>
    </div>
  );
}
