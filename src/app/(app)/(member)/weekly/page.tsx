// TODO: 리팩토링 (use client 남발, 더미 데이터 사용)
"use client";

import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { usePagination } from "@/hooks/usePagination";
import { Plus } from "lucide-react";
import Link from "next/link";
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

  for (let i = 1; i <= 104; i++) {
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

  // 보고서 데이터 상태
  const [reports, setReports] = React.useState<WeeklyReportItem[]>([]);

  // 페이지네이션 훅 사용
  const pagination = usePagination({
    totalItems: reports.length,
    itemsPerPage: 10,
    initialPage: 1,
  });

  // 현재 페이지의 보고서들
  const paginatedReports = pagination.sliceData(reports);

  React.useEffect(() => {
    // 클라이언트 사이드에서만 더미 데이터 생성 및 설정
    const allReports = generateDummyReports();
    setReports(allReports);
  }, []);

  // 행 클릭 핸들러
  const handleRowClick = (reportId: string, status: string) => {
    // 완료된 보고서만 클릭 가능
    if (status === "completed") {
      router.push(`/weekly/${reportId}`);
    }
  };

  return (
    <div>
      <PageHeader
        title='위클리 보고서'
        description='지난 주간 보고서들을 확인하고 새로운 보고서를 자동으로 생성할 수 있습니다.'
        buttonElement={
          <Link href='/weekly/create'>
            <Button className='flex items-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground'>
              <Plus className='w-4 h-4' />새 보고서 생성
            </Button>
          </Link>
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
