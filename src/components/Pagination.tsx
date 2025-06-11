import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  showPageInfo?: boolean;
  showResultInfo?: boolean;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  showPageInfo = true,
  showResultInfo = true,
  className = "",
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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

  // 페이지가 1개 이하면 렌더링하지 않음
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t'>
        {/* 결과 정보 */}
        {showResultInfo && (
          <div className='text-sm text-muted-foreground'>
            총 <strong>{totalItems.toLocaleString()}</strong>개 중{" "}
            <strong>{(currentPage - 1) * itemsPerPage + 1}</strong>-
            <strong>{Math.min(currentPage * itemsPerPage, totalItems)}</strong>
            개 표시
          </div>
        )}

        {/* 페이지네이션 컨트롤 */}
        <div className='flex items-center gap-2'>
          {/* 첫 페이지 */}
          <Button
            variant='outline'
            size='sm'
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className='hidden sm:flex'
            aria-label='첫 페이지로 이동'
          >
            <ChevronsLeft className='w-4 h-4' />
          </Button>

          {/* 이전 페이지 */}
          <Button
            variant='outline'
            size='sm'
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label='이전 페이지로 이동'
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
                  onClick={() => onPageChange(pageNumber)}
                  className={`min-w-[32px] h-8 ${
                    isCurrentPage
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                  aria-label={`${pageNumber}페이지로 이동`}
                  aria-current={isCurrentPage ? "page" : undefined}
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
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label='다음 페이지로 이동'
          >
            <span className='hidden sm:inline mr-1'>다음</span>
            <ChevronRight className='w-4 h-4' />
          </Button>

          {/* 마지막 페이지 */}
          <Button
            variant='outline'
            size='sm'
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className='hidden sm:flex'
            aria-label='마지막 페이지로 이동'
          >
            <ChevronsRight className='w-4 h-4' />
          </Button>
        </div>
      </div>

      {/* 페이지 정보 (모바일용) */}
      {showPageInfo && (
        <div className='flex justify-center sm:hidden'>
          <span className='text-sm text-muted-foreground'>
            {currentPage} / {totalPages} 페이지
          </span>
        </div>
      )}
    </div>
  );
}
