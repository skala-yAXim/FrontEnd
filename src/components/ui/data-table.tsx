import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

// 컬럼 정의 인터페이스
export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

// 정렬 상태 인터페이스
export interface SortState<T> {
  field: keyof T | null;
  direction: "asc" | "desc";
}

// 데이터 테이블 Props
export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  sortState?: SortState<T>;
  onSort?: (field: keyof T, direction: "asc" | "desc") => void;
  className?: string;
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  isLoading = false,
  emptyMessage = "데이터가 없습니다.",
  sortState,
  onSort,
  className = "",
}: DataTableProps<T>) {
  // 정렬 핸들러
  const handleSort = (field: keyof T, direction: "asc" | "desc") => {
    if (!onSort) return;

    // 같은 필드의 같은 방향을 클릭하면 정렬 해제
    if (sortState?.field === field && sortState?.direction === direction) {
      onSort(null as any, "asc");
    } else {
      onSort(field, direction);
    }
  };

  // 정렬 버튼 렌더링
  const renderSortButtons = (column: Column<T>) => {
    if (!column.sortable || !onSort) return null;

    return (
      <div className='flex items-center gap-1 ml-3'>
        <button
          onClick={() => handleSort(column.key, "asc")}
          className={`p-1 rounded-md transition-all ${
            sortState?.field === column.key && sortState?.direction === "asc"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/20 hover:ring-1 hover:ring-black hover:cursor-pointer"
          }`}
          title='오름차순'
        >
          <ChevronUp className='h-3 w-3' />
        </button>
        <button
          onClick={() => handleSort(column.key, "desc")}
          className={`p-1 rounded-md transition-all ${
            sortState?.field === column.key && sortState?.direction === "desc"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/20 hover:ring-1 hover:ring-black hover:cursor-pointer"
          }`}
          title='내림차순'
        >
          <ChevronDown className='h-3 w-3' />
        </button>
      </div>
    );
  };

  // 행 클릭 핸들러
  const handleRowClick = (item: T) => {
    if (onRowClick) {
      onRowClick(item);
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div
        className={`rounded-lg border bg-background overflow-hidden ${className}`}
      >
        <table className='w-full'>
          <thead className='bg-gray-50 dark:bg-gray-800/50'>
            <tr className='border-b'>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className='text-left py-4 px-6 font-semibold text-sm'
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={columns.length}
                className='text-center py-12 text-muted-foreground'
              >
                로딩 중...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border bg-background overflow-hidden ${className}`}
    >
      <table className='w-full'>
        <thead className='bg-gray-50 dark:bg-gray-800/50'>
          <tr className='border-b'>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`text-left py-4 px-6 font-semibold text-sm border-r border-border/50 last:border-r-0 ${column.className || ""}`}
              >
                <div className='flex items-center'>
                  <span>{column.label}</span>
                  {renderSortButtons(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className='text-center py-12 text-muted-foreground'
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-primary/5 hover:shadow-lg transition-all duration-200 ${
                  onRowClick ? "cursor-pointer" : ""
                }`}
                onClick={() => handleRowClick(item)}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-4 px-6 border-r border-border/50 last:border-r-0 ${column.className || ""}`}
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : String(item[column.key] || "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
