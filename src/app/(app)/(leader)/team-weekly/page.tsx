// TODO: 리팩토링 (use client 남발, 더미 데이터 사용)
"use client";

import PageHeader from "@/components/PageHeader";
import { WeeklyReportItem, WeeklyReportListPage } from "@/components/reports";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

// 팀 Weekly 더미 데이터 생성
const generateTeamWeeklyReports = (): WeeklyReportItem[] => {
  const reports: WeeklyReportItem[] = [];
  const statuses: ("completed" | "generating" | "draft" | "error")[] = [
    "completed",
    "generating",
    "draft",
    "error",
  ];

  for (let i = 1; i <= 25; i++) {
    const month = Math.ceil(i / 4);
    const week = ((i - 1) % 4) + 1;
    const date = new Date(2025, month - 1, week * 7);

    reports.push({
      id: `team-${i}`,
      title: `2025년 ${month}월 ${week}주차 팀 위클리 보고서`,
      createdAt: date.toISOString().split("T")[0],
      status: statuses[i % statuses.length], // 고정된 패턴 사용
    });
  }

  return reports.reverse(); // 최신순으로 정렬
};

const dummyTeamReports = generateTeamWeeklyReports();

export default function TeamWeeklyPage() {
  const router = useRouter();

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const totalItems = dummyTeamReports.length;

  const paginatedReports = dummyTeamReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 행 클릭 핸들러
  const handleRowClick = (reportId: string, status: string) => {
    // 완료된 보고서만 클릭 가능
    if (status === "completed") {
      router.push(`/team-weekly/${reportId}`);
    }
  };

  // 새 보고서 생성 핸들러 - 1번 페이지로 이동
  const handleCreateNew = () => {
    router.push("/team-weekly/create");
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const MyButton = () => {
    return (
      <Button onClick={handleCreateNew} className="flex items-center gap-2">
        <Plus className="w-4 h-4" />새 보고서 생성
      </Button>
    );
  };

  return (
    <div>
      {/* 기존 더미 내용 */}
      <PageHeader
        title="팀 위클리"
        description="팀 위클리 보고서 목록"
        buttonElement={<MyButton />}
      />

      {/* 보고서 목록 */}
      <WeeklyReportListPage
        title="팀 위클리 보고서 목록"
        createButtonText="새 보고서 생성"
        onCreateNew={handleCreateNew}
        reports={paginatedReports}
        onRowClick={handleRowClick}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        emptyMessage="아직 생성된 팀 위클리 보고서가 없습니다."
      />
    </div>
  );
}
