"use client";

import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import DataTable, { Column, SortState } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useGetMemberWeeklyReports,
  useGetTeamMembers,
} from "@/hooks/useMemberWeeklyQueries";
import { useServerPagination } from "@/hooks/useServerPagination";
import { useManagerWeeklyFilterStore } from "@/store/filterStore";
import { Calendar, ChevronDown, Users, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

// 👇 새로 추가된 imports
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDateRangeFilter } from "@/hooks/useDateRangeFilter";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarDays } from "lucide-react";

export default function ManagerWeeklyPage() {
  const router = useRouter();
  const { data: teamMembers, isLoading: isLoadingMembers } =
    useGetTeamMembers();
  const pagination = useServerPagination({
    initialPage: 0,
    initialSize: 10,
    initialSort: "createdAt,desc",
  });

  const { selectedMembers, addMember, removeMember } =
    useManagerWeeklyFilterStore();

  // 👇 새로 추가된 Hook
  const dateFilter = useDateRangeFilter();

  // 정렬 상태
  const [sortState, setSortState] = React.useState<SortState<any>>({
    field: null,
    direction: "asc",
  });

  const { data: memberReports, isLoading: isLoadingReports } =
    useGetMemberWeeklyReports(pagination.pageRequest, {
      userId: selectedMembers,
      startDate: dateFilter.currentStartDate,
      endDate: dateFilter.currentEndDate,
    });

  const totalItems = memberReports?.totalElements || 0;

  // 페이지네이션된 보고서 데이터
  const paginatedReports = (memberReports?.content || []).map(report => ({
    id: report.id.toString(),
    title: report.title,
    createdAt: report.createdAt,
    userName: report.userName,
  }));

  // 정렬 핸들러
  const handleSort = (field: any, direction: "asc" | "desc") => {
    setSortState({ field, direction });
  };

  // 정렬된 보고서 계산
  const sortedReports = React.useMemo(() => {
    if (!sortState.field) return paginatedReports;

    return [...paginatedReports].sort((a, b) => {
      let compareValue = 0;

      if (sortState.field === "userName") {
        compareValue = (a.userName || "").localeCompare(b.userName || "");
      } else if (sortState.field === "createdAt") {
        compareValue =
          new Date(a.createdAt || "").getTime() -
          new Date(b.createdAt || "").getTime();
      }

      return sortState.direction === "asc" ? compareValue : -compareValue;
    });
  }, [paginatedReports, sortState]);

  // 테이블 컬럼 정의
  const columns: Column<any>[] = [
    {
      key: "title",
      label: "제목",
      render: value => <div className='font-medium'>{value}</div>,
    },
    {
      key: "userName",
      label: "작성자",
      sortable: true,
      render: value => (
        <Badge variant='outline' className='text-xs'>
          {value || "알 수 없음"}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      label: "생성일자",
      sortable: true,
      render: value => (
        <span className='text-sm text-muted-foreground'>
          {value ? new Date(value).toLocaleDateString("ko-KR") : "-"}
        </span>
      ),
    },
  ];

  const handleMemberToggle = (memberId: string) => {
    if (selectedMembers.includes(memberId)) {
      removeMember(memberId);
    } else {
      addMember(memberId);
    }
  };

  const handleMemberRemove = (memberId: string) => {
    removeMember(memberId);
  };

  const getSelectedMembers = () => {
    return (
      teamMembers?.filter(member =>
        selectedMembers.includes(member.id.toString())
      ) || []
    );
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

  const selectedMemberObjects = getSelectedMembers();
  const hasSelectedMembers = selectedMembers.length > 0;

  return (
    <div>
      <PageHeader title='위클리 보고서' description='팀원 위클리 보고서 목록' />

      <div className='w-full mt-6'>
        <CardContent className='space-y-6'>
          {/* 현대적인 필터 바 */}
          <div className='bg-muted/30 rounded-xl p-4'>
            <div className='flex flex-wrap items-center gap-4'>
              {/* 팀원 선택 필터 */}
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                  <Users className='h-4 w-4' />
                  팀원:
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='sm'>
                      {selectedMembers.length === 0
                        ? "전체"
                        : `${selectedMembers.length}명 선택`}
                      <ChevronDown className='h-3 w-3 ml-1' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-80'>
                    <DropdownMenuLabel>팀원 선택</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {teamMembers?.map(member => (
                      <DropdownMenuCheckboxItem
                        key={member.id}
                        checked={selectedMembers.includes(member.id.toString())}
                        onCheckedChange={() =>
                          handleMemberToggle(member.id.toString())
                        }
                        onSelect={e => e.preventDefault()}
                      >
                        <div>
                          <div className='font-medium'>{member.name}</div>
                          <div className='text-xs text-muted-foreground'>
                            {member.email}
                          </div>
                        </div>
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* 날짜 범위 필터 - 👇 Calendar Popover로 교체됨 */}
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                  <Calendar className='h-4 w-4' />
                  기간:
                </div>
                <div className='flex items-center gap-1'>
                  {/* 시작일 Calendar Popover */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        size='sm'
                        className='h-8 w-36 justify-start text-xs'
                      >
                        <CalendarDays className='h-3 w-3 mr-1' />
                        {dateFilter.currentStartDate
                          ? format(
                              new Date(dateFilter.currentStartDate),
                              "yyyy-MM-dd"
                            )
                          : "시작일"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <CalendarComponent
                        mode='single'
                        selected={dateFilter.tempStartDate}
                        onSelect={dateFilter.applyStartDate}
                        locale={ko}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <span className='text-muted-foreground'>~</span>

                  {/* 종료일 Calendar Popover */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        size='sm'
                        className='h-8 w-36 justify-start text-xs'
                      >
                        <CalendarDays className='h-3 w-3 mr-1' />
                        {dateFilter.currentEndDate
                          ? format(
                              new Date(dateFilter.currentEndDate),
                              "yyyy-MM-dd"
                            )
                          : "종료일"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <CalendarComponent
                        mode='single'
                        selected={dateFilter.tempEndDate}
                        onSelect={dateFilter.applyEndDate}
                        locale={ko}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* 선택된 팀원 태그들 */}
            {selectedMemberObjects.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/50'>
                <span className='text-xs font-medium text-muted-foreground'>
                  선택된 팀원:
                </span>
                {selectedMemberObjects.map(member => (
                  <Badge
                    key={member.id}
                    variant='secondary'
                    className='text-xs px-2 py-1 flex items-center gap-1'
                  >
                    {member.name}
                    <button
                      onClick={() => handleMemberRemove(member.id.toString())}
                      className='ml-1 hover:bg-muted rounded-full p-0.5 transition-colors'
                    >
                      <X className='h-3 w-3' />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* 보고서 테이블 */}
          {selectedMembers.length === 0 ? (
            <div className='text-center py-12 text-muted-foreground'>
              <Users className='h-12 w-12 mx-auto mb-4 opacity-50' />
              <p className='text-lg font-medium mb-2'>팀원을 선택해주세요</p>
              <p className='text-sm'>
                위의 필터에서 팀원을 선택하고 검색해주세요.
              </p>
            </div>
          ) : (
            <DataTable
              data={sortedReports}
              columns={columns}
              onRowClick={item => router.push(`/manager-weekly/${item.id}`)}
              isLoading={isLoadingReports}
              emptyMessage='선택한 조건에 맞는 위클리 보고서가 없습니다.'
              sortState={sortState}
              onSort={handleSort}
            />
          )}

          {/* 페이지네이션 */}
          {hasSelectedMembers && totalItems > 0 && (
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
