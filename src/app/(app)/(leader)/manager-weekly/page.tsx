"use client";

import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { Badge } from "@/components/ui/badge";
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
import {
  useGetMemberWeeklyReports,
  useGetTeamMembers,
} from "@/hooks/useMemberWeeklyQueries";
import { useServerPagination } from "@/hooks/useServerPagination";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Users,
  X,
} from "lucide-react";
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
  const pagination = useServerPagination({
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

  // 정렬 상태 추가
  const [sortField, setSortField] = React.useState<
    "userName" | "createdAt" | null
  >(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );

  const { data: memberReports, isLoading: isLoadingReports } =
    useGetMemberWeeklyReports(pagination.pageRequest, {
      userId: searchParams.selectedMembers,
      startDate: searchParams.startDate,
      endDate: searchParams.endDate,
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
  const handleSort = (
    field: "userName" | "createdAt",
    direction: "asc" | "desc"
  ) => {
    // 같은 필드의 같은 방향을 클릭하면 정렬 해제
    if (sortField === field && sortDirection === direction) {
      setSortField(null);
      setSortDirection("asc");
    } else {
      setSortField(field);
      setSortDirection(direction);
    }
  };

  // 정렬된 보고서 계산
  const sortedReports = React.useMemo(() => {
    if (!sortField) return paginatedReports;

    return [...paginatedReports].sort((a, b) => {
      let compareValue = 0;

      if (sortField === "userName") {
        compareValue = (a.userName || "").localeCompare(b.userName || "");
      } else if (sortField === "createdAt") {
        compareValue =
          new Date(a.createdAt || "").getTime() -
          new Date(b.createdAt || "").getTime();
      }

      return sortDirection === "asc" ? compareValue : -compareValue;
    });
  }, [paginatedReports, sortField, sortDirection]);

  const handleMemberToggle = (memberId: string) => {
    setFilters(prev => ({
      ...prev,
      selectedMembers: prev.selectedMembers.includes(memberId)
        ? prev.selectedMembers.filter(id => id !== memberId)
        : [...prev.selectedMembers, memberId],
    }));
  };

  const handleMemberRemove = (memberId: string) => {
    setFilters(prev => ({
      ...prev,
      selectedMembers: prev.selectedMembers.filter(id => id !== memberId),
    }));
  };

  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    setSearchParams({ ...filters });
    pagination.onPageChange(1);
  };

  const getSelectedMembers = () => {
    return (
      teamMembers?.filter(member =>
        filters.selectedMembers.includes(member.id.toString())
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

  const selectedMembers = getSelectedMembers();
  const hasSelectedMembers = searchParams.selectedMembers.length > 0;

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
                    <Button variant='outline' size='sm' className='h-8'>
                      {filters.selectedMembers.length === 0
                        ? "전체"
                        : `${filters.selectedMembers.length}명 선택`}
                      <ChevronDown className='h-3 w-3 ml-1' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-80'>
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
                          <div className='text-xs text-muted-foreground'>
                            {member.email}
                          </div>
                        </div>
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* 날짜 범위 필터 */}
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                  <Calendar className='h-4 w-4' />
                  기간:
                </div>
                <div className='flex items-center gap-1'>
                  <Input
                    type='date'
                    value={filters.startDate}
                    onChange={e =>
                      handleDateChange("startDate", e.target.value)
                    }
                    className='h-8 w-36 text-xs'
                  />
                  <span className='text-muted-foreground'>~</span>
                  <Input
                    type='date'
                    value={filters.endDate}
                    onChange={e => handleDateChange("endDate", e.target.value)}
                    className='h-8 w-36 text-xs'
                  />
                </div>
              </div>

              {/* 검색 버튼 */}
              <Button
                onClick={handleSearch}
                size='sm'
                className='h-8 ml-auto'
                disabled={filters.selectedMembers.length === 0}
              >
                <Search className='h-3 w-3 mr-1' />
                검색
              </Button>
            </div>

            {/* 선택된 팀원 태그들 */}
            {selectedMembers.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/50'>
                <span className='text-xs font-medium text-muted-foreground'>
                  선택된 팀원:
                </span>
                {selectedMembers.map(member => (
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
          {searchParams.selectedMembers.length === 0 ? (
            <div className='text-center py-12 text-muted-foreground'>
              <Users className='h-12 w-12 mx-auto mb-4 opacity-50' />
              <p className='text-lg font-medium mb-2'>팀원을 선택해주세요</p>
              <p className='text-sm'>
                위의 필터에서 팀원을 선택하고 검색해주세요.
              </p>
            </div>
          ) : isLoadingReports ? (
            <div className='flex justify-center p-12'>
              <div className='flex flex-col items-center gap-3'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
                <p className='text-sm text-muted-foreground'>
                  보고서를 불러오는 중...
                </p>
              </div>
            </div>
          ) : (
            <div className='rounded-lg border bg-background overflow-hidden'>
              <table className='w-full'>
                <thead className='bg-gray-50'>
                  <tr className='border-b'>
                    <th className='text-left py-4 px-6 font-semibold text-sm'>
                      제목
                    </th>
                    <th className='text-left py-4 px-6 font-semibold text-sm'>
                      <div className='flex items-center gap-3'>
                        <span>작성자</span>
                        <div className='flex items-center gap-1'>
                          <button
                            onClick={() => handleSort("userName", "asc")}
                            className={`p-1 rounded-md transition-all ${
                              sortField === "userName" &&
                              sortDirection === "asc"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/20 hover:ring-1 hover:ring-black hover:cursor-pointer"
                            }`}
                            title='가나다순'
                          >
                            <ChevronUp className='h-3 w-3' />
                          </button>
                          <button
                            onClick={() => handleSort("userName", "desc")}
                            className={`p-1 rounded-md transition-all ${
                              sortField === "userName" &&
                              sortDirection === "desc"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/20 hover:ring-1 hover:ring-black hover:cursor-pointer"
                            }`}
                            title='다나가순'
                          >
                            <ChevronDown className='h-3 w-3' />
                          </button>
                        </div>
                      </div>
                    </th>
                    <th className='text-left py-4 px-6 font-semibold text-sm'>
                      <div className='flex items-center gap-3'>
                        <span>생성일자</span>
                        <div className='flex items-center gap-1'>
                          <button
                            onClick={() => handleSort("createdAt", "asc")}
                            className={`p-1 rounded-md transition-all ${
                              sortField === "createdAt" &&
                              sortDirection === "asc"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/20 hover:ring-1 hover:ring-black hover:cursor-pointer"
                            }`}
                            title='오래된순'
                          >
                            <ChevronUp className='h-3 w-3' />
                          </button>
                          <button
                            onClick={() => handleSort("createdAt", "desc")}
                            className={`p-1 rounded-md transition-all ${
                              sortField === "createdAt" &&
                              sortDirection === "desc"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/20 hover:ring-1 hover:ring-black hover:cursor-pointer"
                            }`}
                            title='최신순'
                          >
                            <ChevronDown className='h-3 w-3' />
                          </button>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedReports.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className='text-center py-12 text-muted-foreground'
                      >
                        <div className='flex flex-col items-center gap-3'>
                          <Filter className='h-8 w-8 opacity-50' />
                          <p>선택한 조건에 맞는 위클리 보고서가 없습니다.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    sortedReports.map(report => (
                      <tr
                        key={report.id}
                        className='border-b hover:bg-gradient-to-r hover:from-primary/3 hover:to-transparent hover:shadow-sm transition-all duration-200 cursor-pointer'
                        onClick={() =>
                          router.push(`/manager-weekly/${report.id}`)
                        }
                      >
                        <td className='py-4 px-6'>
                          <div className='font-medium'>{report.title}</div>
                        </td>
                        <td className='py-4 px-6 text-sm text-muted-foreground'>
                          <Badge variant='outline' className='text-xs'>
                            {report.userName || "알 수 없음"}
                          </Badge>
                        </td>
                        <td className='py-4 px-6 text-sm text-muted-foreground'>
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
