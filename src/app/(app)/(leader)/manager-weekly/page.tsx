// TODO: API 연동 필요 (팀원 목록, 필터링된 보고서 목록)
"use client";

import PageHeader from "@/components/PageHeader";
import { WeeklyReportItem, WeeklyReportTable } from "@/components/reports";
import WeeklyReportPagination from "@/components/reports/WeeklyReportPagination";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

// 팀원 인터페이스
interface TeamMember {
  id: string;
  name: string;
  role: string;
}

// 필터 상태 인터페이스
interface FilterState {
  selectedMembers: string[];
  reportType: "weekly" | "daily";
  startDate: string;
  endDate: string;
}

// 더미 팀원 데이터
const dummyTeamMembers: TeamMember[] = [
  { id: "1", name: "김개발", role: "Frontend Developer" },
  { id: "2", name: "이기획", role: "Product Manager" },
  { id: "3", name: "박디자인", role: "UI/UX Designer" },
  { id: "4", name: "최백엔드", role: "Backend Developer" },
  { id: "5", name: "정테스터", role: "QA Engineer" },
];

// 더미 보고서 데이터 생성
const generateFilteredReports = (filters: FilterState): WeeklyReportItem[] => {
  const reports: WeeklyReportItem[] = [];
  const statuses: ("completed" | "generating" | "draft" | "error")[] = [
    "completed",
    "generating",
    "draft",
    "error",
  ];

  // 선택된 팀원들의 보고서 생성
  filters.selectedMembers.forEach((memberId, memberIndex) => {
    const member = dummyTeamMembers.find(m => m.id === memberId);
    if (!member) return;

    for (let i = 1; i <= 20; i++) {
      const month = Math.ceil(i / 4);
      const week = ((i - 1) % 4) + 1;
      const date = new Date(2025, month - 1, week * 7);

      reports.push({
        id: `${memberId}-${filters.reportType}-${i}`,
        title: `${member.name} 2025년 ${month}월 ${week}주차 ${filters.reportType === "weekly" ? "위클리" : "데일리"} 보고서`,
        createdAt: date.toISOString().split("T")[0],
        status: statuses[(memberIndex + i) % statuses.length], // 고정된 패턴 사용
      });
    }
  });

  return reports.reverse(); // 최신순 정렬
};

export default function ManagerWeeklyPage() {
  const router = useRouter();

  // 필터 상태
  const [filters, setFilters] = React.useState<FilterState>({
    selectedMembers: ["1", "2"], // 기본으로 첫 2명 선택
    reportType: "weekly",
    startDate: "2025-05-01",
    endDate: "2025-05-30",
  });

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // 필터링된 보고서 데이터
  const filteredReports = generateFilteredReports(filters);
  const totalItems = filteredReports.length;

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 팀원 선택 핸들러
  const handleMemberToggle = (memberId: string) => {
    setFilters(prev => ({
      ...prev,
      selectedMembers: prev.selectedMembers.includes(memberId)
        ? prev.selectedMembers.filter(id => id !== memberId)
        : [...prev.selectedMembers, memberId],
    }));
    setCurrentPage(1); // 필터 변경시 첫 페이지로
  };

  // 보고서 타입 변경 핸들러
  const handleReportTypeChange = (type: "weekly" | "daily") => {
    setFilters(prev => ({ ...prev, reportType: type }));
    setCurrentPage(1);
  };

  // 기간 변경 핸들러
  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  // 행 클릭 핸들러
  const handleRowClick = (reportId: string, status: string) => {
    if (status === "completed") {
      // 보고서 타입에 따라 다른 상세 페이지로 이동
      if (filters.reportType === "weekly") {
        router.push(`/weekly/${reportId}`);
      } else {
        router.push(`/daily/${reportId}`);
      }
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 선택된 팀원 텍스트
  const selectedMemberNames = dummyTeamMembers
    .filter(member => filters.selectedMembers.includes(member.id))
    .map(member => member.name)
    .join(", ");

  return (
    <div>
      <PageHeader title='팀원 위클리' description='팀원 위클리 보고서 목록' />

      <div className='w-full mt-6'>
        <div className='w-full max-w-none'>
          <CardContent className='space-y-6'>
            {/* 필터 영역 */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              {/* 팀원 다중 선택 */}
              <div className='space-y-2'>
                <Label>팀원 선택</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='outline'
                      className='w-full justify-between'
                    >
                      <span className='truncate'>
                        {selectedMemberNames || "팀원을 선택하세요"}
                      </span>
                      <ChevronDown className='h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-full'>
                    <DropdownMenuLabel>팀원 선택</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {dummyTeamMembers.map(member => (
                      <DropdownMenuCheckboxItem
                        key={member.id}
                        checked={filters.selectedMembers.includes(member.id)}
                        onCheckedChange={() => handleMemberToggle(member.id)}
                      >
                        <div>
                          <div className='font-medium'>{member.name}</div>
                          <div className='text-sm text-muted-foreground'>
                            {member.role}
                          </div>
                        </div>
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* 보고서 타입 토글 */}
              <div className='space-y-2'>
                <Label>보고서 타입</Label>
                <div className='flex border rounded-md'>
                  <Button
                    variant={
                      filters.reportType === "weekly" ? "default" : "ghost"
                    }
                    className='flex-1 rounded-r-none border-r'
                    onClick={() => handleReportTypeChange("weekly")}
                  >
                    위클리
                  </Button>
                  <Button
                    variant={
                      filters.reportType === "daily" ? "default" : "ghost"
                    }
                    className='flex-1 rounded-l-none'
                    onClick={() => handleReportTypeChange("daily")}
                  >
                    데일리
                  </Button>
                </div>
              </div>

              {/* 시작 날짜 */}
              <div className='space-y-2'>
                <Label htmlFor='startDate'>시작 날짜</Label>
                <Input
                  id='startDate'
                  type='date'
                  value={filters.startDate}
                  onChange={e => handleDateChange("startDate", e.target.value)}
                  max={filters.endDate} // 종료 날짜보다 늦을 수 없음
                />
              </div>

              {/* 종료 날짜 */}
              <div className='space-y-2'>
                <Label htmlFor='endDate'>종료 날짜</Label>
                <Input
                  id='endDate'
                  type='date'
                  value={filters.endDate}
                  onChange={e => handleDateChange("endDate", e.target.value)}
                  min={filters.startDate} // 시작 날짜보다 빠를 수 없음
                />
              </div>
            </div>

            {/* 선택 요약 */}
            <div className='text-sm text-muted-foreground bg-muted/30 p-3 rounded-md'>
              <p>
                <strong>{filters.selectedMembers.length}명</strong>의 팀원,{" "}
                <strong>
                  {filters.reportType === "weekly" ? "위클리" : "데일리"}
                </strong>{" "}
                보고서, <strong>{filters.startDate}</strong> ~{" "}
                <strong>{filters.endDate}</strong> 기간
              </p>
            </div>

            {/* 보고서 테이블 */}
            <WeeklyReportTable
              reports={paginatedReports}
              onRowClick={handleRowClick}
              emptyMessage={`선택한 조건에 맞는 ${filters.reportType === "weekly" ? "위클리" : "데일리"} 보고서가 없습니다.`}
            />

            {/* 페이지네이션 */}
            <WeeklyReportPagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </CardContent>
        </div>
      </div>
    </div>
  );
}
