"use client";

import PageHeader from "@/components/PageHeader";
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
import {
  useGetMemberWeeklyReports,
  useGetTeamMembers,
} from "@/hooks/useMemberWeeklyQueries";
import { useServerPagination } from "@/hooks/useServerPagination";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface FilterState {
  selectedMembers: string[];
  startDate: string;
  endDate: string;
}

export default function ManagerWeeklyPage() {
  const router = useRouter();
  const { data: teamMembers, isLoading: isLoadingMembers } =
    useGetTeamMembers();
  const { pageRequest, currentPage, onPageChange } = useServerPagination({
    initialPage: 0,
    initialSize: 10,
    initialSort: "createdAt,desc",
  });

  const [filters, setFilters] = React.useState<FilterState>({
    selectedMembers: [],
    startDate: "2025-01-01",
    endDate: "2025-12-31",
  });

  const [searchParams, setSearchParams] = React.useState<FilterState>({
    selectedMembers: [],
    startDate: "2025-01-01",
    endDate: "2025-12-31",
  });

  const { data: memberReports, isLoading: isLoadingReports } =
    useGetMemberWeeklyReports(pageRequest, {
      userId: searchParams.selectedMembers,
      startDate: searchParams.startDate,
      endDate: searchParams.endDate,
    });

  const totalItems = memberReports?.totalElements || 0;
  const paginatedReports = (memberReports?.content || []).map(report => ({
    id: report.id.toString(),
    title: report.title,
    createdAt: report.createdAt,
  }));

  const handleMemberToggle = (memberId: string) => {
    setFilters(prev => ({
      ...prev,
      selectedMembers: prev.selectedMembers.includes(memberId)
        ? prev.selectedMembers.filter(id => id !== memberId)
        : [...prev.selectedMembers, memberId],
    }));
  };

  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    setSearchParams({ ...filters });
    onPageChange(1);
  };

  const getSelectedMemberText = () => {
    const count = filters.selectedMembers.length;
    if (count === 0) return "팀원을 선택하세요";
    if (count === 1) {
      const member = teamMembers?.find(
        m => m.id.toString() === filters.selectedMembers[0]
      );
      return member?.name || "1명 선택됨";
    }
    return `${count}명 선택됨`;
  };

  if (isLoadingMembers) {
    return (
      <div>
        <PageHeader
          title='위클리 보고서'
          description='팀원 위클리 보고서 목록'
        />
        <div className='w-full mt-6 flex justify-center'>
          <div className='p-4'>팀원 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  const hasSelectedMembers = searchParams.selectedMembers.length > 0;
  const selectedMemberNames =
    teamMembers
      ?.filter(member =>
        searchParams.selectedMembers.includes(member.id.toString())
      )
      .map(member => member.name)
      .join(", ") || "";

  return (
    <div>
      <PageHeader title='위클리 보고서' description='팀원 위클리 보고서 목록' />
      <div className='w-full mt-6'>
        <CardContent className='space-y-6'>
          {/* 필터 영역 */}
          <div className='flex justify-between'>
            <div className='space-y-2'>
              <Label>팀원 선택</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='w-80 justify-between'>
                    <span className='truncate'>{getSelectedMemberText()}</span>
                    <ChevronDown className='h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className='w-80 max-h-64 overflow-y-auto'
                  align='start'
                  side='bottom'
                  sideOffset={4}
                >
                  <DropdownMenuLabel>팀원 선택</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {teamMembers?.map(member => (
                    <DropdownMenuCheckboxItem
                      key={member.id}
                      checked={filters.selectedMembers.includes(
                        member.id.toString()
                      )}
                      onCheckedChange={() =>
                        handleMemberToggle(member.id.toString())
                      }
                      onSelect={e => e.preventDefault()}
                    >
                      <div>
                        <div className='font-medium'>{member.name}</div>
                        <div className='text-sm text-muted-foreground'>
                          {member.email}
                        </div>
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className='flex gap-4'>
              <div className='space-y-2 w-40'>
                <Label htmlFor='startDate'>시작 날짜</Label>
                <Input
                  id='startDate'
                  type='date'
                  value={filters.startDate}
                  onChange={e => handleDateChange("startDate", e.target.value)}
                />
              </div>
              <div className='space-y-2 w-40'>
                <Label htmlFor='endDate'>종료 날짜</Label>
                <Input
                  id='endDate'
                  type='date'
                  value={filters.endDate}
                  onChange={e => handleDateChange("endDate", e.target.value)}
                />
              </div>
            </div>
            <div className='flex items-end'>
              <Button
                onClick={handleSearch}
                className='h-10'
                disabled={filters.selectedMembers.length === 0}
              >
                검색
              </Button>
            </div>
          </div>

          {/* 선택 요약 */}
          <div className='text-sm text-muted-foreground bg-muted/30 p-3 rounded-md'>
            <p>
              <strong>{searchParams.selectedMembers.length}명</strong>의 팀원
              위클리 보고서 {hasSelectedMembers && <>({selectedMemberNames})</>}
              , <strong>{searchParams.startDate}</strong> ~{" "}
              <strong>{searchParams.endDate}</strong> 기간
            </p>
          </div>

          {/* 보고서 테이블 */}
          {searchParams.selectedMembers.length === 0 ? (
            <div className='text-center py-8 text-muted-foreground'>
              팀원을 선택해주세요.
            </div>
          ) : isLoadingReports ? (
            <div className='flex justify-center p-8'>
              보고서를 불러오는 중...
            </div>
          ) : (
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
                        선택한 조건에 맞는 위클리 보고서가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    paginatedReports.map(report => (
                      <tr
                        key={report.id}
                        className='border-b transition-colors hover:bg-muted/50 cursor-pointer'
                        onClick={() =>
                          router.push(`/manager-weekly/${report.id}`)
                        }
                      >
                        <td className='py-3 px-4'>
                          <div className='font-medium'>{report.title}</div>
                        </td>
                        <td className='py-3 px-4 text-sm text-muted-foreground'>
                          {report.createdAt
                            ? new Date(report.createdAt).toLocaleDateString(
                                "ko-KR"
                              )
                            : "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* 페이지네이션 */}
          {searchParams.selectedMembers.length > 0 && (
            <div className='flex justify-between items-center'>
              <div className='text-sm text-muted-foreground'>
                총 {totalItems}개 중{" "}
                {totalItems > 0 ? (currentPage - 1) * pageRequest.size + 1 : 0}-
                {totalItems > 0
                  ? Math.min(currentPage * pageRequest.size, totalItems)
                  : 0}
                개 표시
              </div>
              <WeeklyReportPagination
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={pageRequest.size}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
}
