// types/pagination.ts
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // 현재 페이지 (0-indexed)
  size: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
  // ... 기타 필요한 필드
}
export interface PageRequest {
  page: number; // 페이지 번호 (0-indexed)
  size: number; // 페이지 크기
  sort?: string; // 정렬 기준 (예: "name,asc")
}
