'use client';

import React, { useState } from 'react';
import { WeeklyReportFilters, WeeklyReportSortOptions, WeeklyReportStatus } from '@/types/weeklyReport';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, X, Search } from 'lucide-react';

interface WeeklyReportFiltersProps {
  filters: WeeklyReportFilters;
  sort: WeeklyReportSortOptions;
  onFiltersChange: (filters: Partial<WeeklyReportFilters>) => void;
  onSortChange: (sort: WeeklyReportSortOptions) => void;
  onReset: () => void;
  isLoading?: boolean;
}

export const WeeklyReportFiltersComponent: React.FC<WeeklyReportFiltersProps> = ({
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  onReset,
  isLoading = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const hasActiveFilters = 
    filters.year || 
    filters.status || 
    filters.startDate || 
    filters.endDate;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        {/* 기본 필터 바 */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">필터</span>
          </div>

          {/* 연도 선택 */}
          <Select
            value={filters.year?.toString() || ''}
            onValueChange={(value) => 
              onFiltersChange({ year: value ? parseInt(value) : undefined })
            }
            disabled={isLoading}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="연도" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">전체</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}년
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 상태 선택 */}
          <Select
            value={filters.status || ''}
            onValueChange={(value) => 
              onFiltersChange({ status: value as WeeklyReportStatus || undefined })
            }
            disabled={isLoading}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">전체</SelectItem>
              <SelectItem value={WeeklyReportStatus.COMPLETED}>완료</SelectItem>
              <SelectItem value={WeeklyReportStatus.GENERATING}>생성 중</SelectItem>
              <SelectItem value={WeeklyReportStatus.DRAFT}>초안</SelectItem>
              <SelectItem value={WeeklyReportStatus.ERROR}>오류</SelectItem>
            </SelectContent>
          </Select>

          {/* 정렬 옵션 */}
          <Select
            value={`${sort.field}-${sort.direction}`}
            onValueChange={(value) => {
              const [field, direction] = value.split('-') as [typeof sort.field, typeof sort.direction];
              onSortChange({ field, direction });
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">최신순</SelectItem>
              <SelectItem value="createdAt-asc">오래된순</SelectItem>
              <SelectItem value="weekNumber-desc">주차 내림차순</SelectItem>
              <SelectItem value="weekNumber-asc">주차 오름차순</SelectItem>
            </SelectContent>
          </Select>

          {/* 고급 필터 토글 */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            disabled={isLoading}
          >
            <Search className="w-4 h-4 mr-1" />
            {isExpanded ? '간단히' : '상세 검색'}
          </Button>

          {/* 필터 초기화 */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              disabled={isLoading}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              초기화
            </Button>
          )}
        </div>

        {/* 고급 필터 */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 시작 날짜 */}
              <div>
                <label htmlFor="startDate" className="text-sm font-medium mb-1 block">
                  시작 날짜
                </label>
                <Input
                  id="startDate"
                  type="date"
                  value={filters.startDate || ''}
                  onChange={(e) => onFiltersChange({ startDate: e.target.value || undefined })}
                  disabled={isLoading}
                />
              </div>

              {/* 종료 날짜 */}
              <div>
                <label htmlFor="endDate" className="text-sm font-medium mb-1 block">
                  종료 날짜
                </label>
                <Input
                  id="endDate"
                  type="date"
                  value={filters.endDate || ''}
                  onChange={(e) => onFiltersChange({ endDate: e.target.value || undefined })}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        )}

        {/* 활성 필터 표시 */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t">
            <span className="text-sm text-muted-foreground">활성 필터:</span>
            {filters.year && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs">
                {filters.year}년
                <button
                  onClick={() => onFiltersChange({ year: undefined })}
                  className="ml-1 hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.status && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-100 text-green-800 text-xs">
                {filters.status === WeeklyReportStatus.COMPLETED && '완료'}
                {filters.status === WeeklyReportStatus.GENERATING && '생성 중'}
                {filters.status === WeeklyReportStatus.DRAFT && '초안'}
                {filters.status === WeeklyReportStatus.ERROR && '오류'}
                <button
                  onClick={() => onFiltersChange({ status: undefined })}
                  className="ml-1 hover:text-green-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.startDate && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-100 text-purple-800 text-xs">
                시작: {filters.startDate}
                <button
                  onClick={() => onFiltersChange({ startDate: undefined })}
                  className="ml-1 hover:text-purple-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.endDate && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-orange-100 text-orange-800 text-xs">
                종료: {filters.endDate}
                <button
                  onClick={() => onFiltersChange({ endDate: undefined })}
                  className="ml-1 hover:text-orange-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyReportFiltersComponent;
