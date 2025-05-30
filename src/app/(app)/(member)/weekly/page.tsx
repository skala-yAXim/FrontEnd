// TODO: 리팩토링 (use client 남발, 더미 데이터 사용)
"use client";

import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

// 임시 데이터 타입
interface WeeklyReportItem {
  id: string;
  title: string;
  createdAt: string;
  status: "completed" | "generating" | "draft" | "error";
}

// 더 많은 더미 데이터 (페이징 테스트용)
const generateDummyReports = (): WeeklyReportItem[] => {
  const reports: WeeklyReportItem[] = [];
  const statuses: ("completed" | "generating" | "draft" | "error")[] = [
    "completed",
    "generating",
    "draft",
    "error",
  ];

  for (let i = 1; i <= 47; i++) {
    const month = Math.ceil(i / 4);
    const week = ((i - 1) % 4) + 1;
    const date = new Date(2025, month - 1, week * 7);

    reports.push({
      id: i.toString(),
      title: `2025년 ${month}월 ${week}주차 위클리 보고서`,
      createdAt: date.toISOString().split("T")[0],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }

  return reports.reverse(); // 최신순으로 정렬
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "generating":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "draft":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    case "error":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

const getStatusText = (status: string): string => {
  switch (status) {
    case "completed":
      return "완료";
    case "generating":
      return "생성 중";
    case "draft":
      return "초안";
    case "error":
      return "오류";
    default:
      return "알 수 없음";
  }
};

export default function WeeklyReportsPage() {
  const router = useRouter();

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // dummyReports를 직접 사용하지 않고, state로 관리하여 hydration 오류 방지
  const [reports, setReports] = React.useState<WeeklyReportItem[]>([]);
  const [paginatedReports, setPaginatedReports] = React.useState<
    WeeklyReportItem[]
  >([]);

  const totalItems = reports.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  React.useEffect(() => {
    // 클라이언트 사이드에서만 더미 데이터 생성 및 설정
    const allReports = generateDummyReports();
    setReports(allReports);
  }, []);

  React.useEffect(() => {
    // reports 상태가 변경되면 paginatedReports 업데이트
    const newPaginatedReports = reports.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setPaginatedReports(newPaginatedReports);
  }, [reports, currentPage, itemsPerPage]);

  // 행 클릭 핸들러
  const handleRowClick = (reportId: string, status: string) => {
    // 완료된 보고서만 클릭 가능
    if (status === "completed") {
      router.push(`/weekly/${reportId}`);
    }
  };

  // 새 보고서 생성 핸들러
  const handleCreateNew = () => {
    router.push("/weekly/create");
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 페이지 번호 계산 (현재 페이지 주변만 표시)
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div>
      <PageHeader
        title='보고서 목록'
        description='지난 주간 보고서들을 확인하고 새로운 보고서를 작성할 수 있습니다.'
        buttonElement={
          <Button onClick={handleCreateNew} className='flex items-center gap-2'>
            <Plus className='w-4 h-4' />새 보고서 생성
          </Button>
        }
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
                <th className='text-left py-3 px-4 font-semibold text-sm'>
                  상태
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedReports.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className='text-center py-8 text-muted-foreground'
                  >
                    아직 생성된 위클리 보고서가 없습니다.
                  </td>
                </tr>
              ) : (
                paginatedReports.map(report => (
                  <tr
                    key={report.id}
                    className={`border-b transition-colors ${
                      report.status === "completed"
                        ? "hover:bg-muted/50 cursor-pointer"
                        : "cursor-not-allowed opacity-75"
                    }`}
                    onClick={() => handleRowClick(report.id, report.status)}
                    title={
                      report.status === "completed"
                        ? "클릭하여 상세보기"
                        : "완료된 보고서만 볼 수 있습니다"
                    }
                  >
                    <td className='py-3 px-4'>
                      <div className='font-medium'>{report.title}</div>
                    </td>
                    <td className='py-3 px-4 text-sm text-muted-foreground'>
                      {new Date(report.createdAt).toLocaleDateString("ko-KR")}
                    </td>
                    <td className='py-3 px-4'>
                      <Badge className={getStatusColor(report.status)}>
                        {getStatusText(report.status)}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 개선된 페이지네이션 */}
        {totalPages > 1 && (
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t'>
            {/* 결과 정보 */}
            <div className='text-sm text-muted-foreground'>
              총 <strong>{totalItems.toLocaleString()}</strong>개 중{" "}
              <strong>{(currentPage - 1) * itemsPerPage + 1}</strong>-
              <strong>
                {Math.min(currentPage * itemsPerPage, totalItems)}
              </strong>
              개 표시
            </div>

            {/* 페이지네이션 컨트롤 */}
            <div className='flex items-center gap-2'>
              {/* 첫 페이지 */}
              <Button
                variant='outline'
                size='sm'
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className='hidden sm:flex'
              >
                <ChevronsLeft className='w-4 h-4' />
              </Button>

              {/* 이전 페이지 */}
              <Button
                variant='outline'
                size='sm'
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className='w-4 h-4' />
                <span className='hidden sm:inline ml-1'>이전</span>
              </Button>

              {/* 페이지 번호들 */}
              <div className='flex items-center gap-1'>
                {visiblePages.map((page, index) => {
                  if (page === "...") {
                    return (
                      <span
                        key={`dots-${index}`}
                        className='px-2 py-1 text-muted-foreground'
                      >
                        ...
                      </span>
                    );
                  }

                  const pageNumber = page as number;
                  const isCurrentPage = pageNumber === currentPage;

                  return (
                    <Button
                      key={pageNumber}
                      variant={isCurrentPage ? "default" : "outline"}
                      size='sm'
                      onClick={() => handlePageChange(pageNumber)}
                      className={`min-w-[32px] h-8 ${
                        isCurrentPage
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>

              {/* 다음 페이지 */}
              <Button
                variant='outline'
                size='sm'
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <span className='hidden sm:inline mr-1'>다음</span>
                <ChevronRight className='w-4 h-4' />
              </Button>

              {/* 마지막 페이지 */}
              <Button
                variant='outline'
                size='sm'
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className='hidden sm:flex'
              >
                <ChevronsRight className='w-4 h-4' />
              </Button>
            </div>
          </div>
        )}

        {/* 페이지 정보 (모바일용) */}
        <div className='flex justify-center mt-4 sm:hidden'>
          <span className='text-sm text-muted-foreground'>
            {currentPage} / {totalPages} 페이지
          </span>
        </div>
      </CardContent>
    </div>
  );
}
