import { PageRequest } from "@/types/pagination";
import { useState } from "react";

interface UseServerPaginationProps {
  initialPage?: number;
  initialSize?: number;
  initialSort?: string;
}

/**
 * 서버 페이지네이션을 위한 커스텀 훅
 * React Query와 함께 사용하기 위해 설계되었습니다.
 */
export function useServerPagination({
  initialPage = 0, // 서버는 0-indexed
  initialSize = 10,
  initialSort,
}: UseServerPaginationProps = {}) {
  // 서버 요청을 위한 페이지네이션 상태
  const [pageRequest, setPageRequest] = useState<PageRequest>({
    page: initialPage,
    size: initialSize,
    sort: initialSort,
  });

  // 페이지 변경 핸들러 (UI는 1-indexed, 서버는 0-indexed)
  const onPageChange = (page: number) => {
    setPageRequest(prev => ({
      ...prev,
      page: page - 1, // UI는 1-indexed, 서버는 0-indexed
    }));
  };

  // 페이지 크기 변경 핸들러
  const onPageSizeChange = (size: number) => {
    setPageRequest(prev => ({
      ...prev,
      page: 0, // 페이지 크기가 변경되면 첫 페이지로 이동
      size,
    }));
  };

  // 정렬 변경 핸들러
  const onSortChange = (sort: string) => {
    setPageRequest(prev => ({
      ...prev,
      sort,
    }));
  };

  // UI에 표시할 현재 페이지 (1-indexed)
  const currentPage = pageRequest.page + 1;

  return {
    // 서버 요청용 상태
    pageRequest,

    // UI 표시용 상태
    currentPage,
    pageSize: pageRequest.size,
    sort: pageRequest.sort,

    // 핸들러
    onPageChange,
    onPageSizeChange,
    onSortChange,

    // 페이지네이션 컴포넌트에 전달할 props
    getPaginationProps: (totalItems: number) => ({
      currentPage,
      totalItems,
      itemsPerPage: pageRequest.size,
      onPageChange,
    }),
  };
}
