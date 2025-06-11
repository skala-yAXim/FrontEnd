"use client";

import React from "react";
import Pagination from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";

// 예시 데이터 타입
interface ExampleItem {
  id: number;
  name: string;
  description: string;
}

// 더미 데이터 생성
const generateExampleData = (count: number): ExampleItem[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `아이템 ${index + 1}`,
    description: `이것은 ${index + 1}번째 아이템입니다.`,
  }));
};

export default function PaginationExample() {
  // 데이터 상태
  const [items] = React.useState<ExampleItem[]>(() => generateExampleData(47));

  // 페이지네이션 훅 사용
  const pagination = usePagination({
    totalItems: items.length,
    itemsPerPage: 5,
    initialPage: 1,
  });

  // 현재 페이지의 아이템들
  const currentItems = pagination.sliceData(items);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">페이지네이션 사용 예시</h1>
      
      {/* 아이템 목록 */}
      <div className="space-y-4 mb-6">
        {currentItems.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={pagination.currentPage}
        totalItems={pagination.totalItems}
        itemsPerPage={pagination.itemsPerPage}
        onPageChange={pagination.handlePageChange}
      />

      {/* 추가 정보 표시 */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">페이지네이션 상태 정보:</h3>
        <ul className="text-sm space-y-1">
          <li>현재 페이지: {pagination.currentPage}</li>
          <li>전체 페이지: {pagination.totalPages}</li>
          <li>전체 아이템: {pagination.totalItems}</li>
          <li>페이지당 아이템: {pagination.itemsPerPage}</li>
          <li>첫 페이지 여부: {pagination.isFirstPage ? "예" : "아니오"}</li>
          <li>마지막 페이지 여부: {pagination.isLastPage ? "예" : "아니오"}</li>
        </ul>
      </div>
    </div>
  );
}

/*
=== 사용 방법 ===

1. 기본 사용법:
```tsx
import Pagination from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";

export default function MyComponent() {
  const [data, setData] = useState<MyDataType[]>([]);
  
  const pagination = usePagination({
    totalItems: data.length,
    itemsPerPage: 10,
    initialPage: 1,
  });

  const paginatedData = pagination.sliceData(data);

  return (
    <div>
      {/* 데이터 렌더링 */}
      {paginatedData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}

      {/* 페이지네이션 */}
      <Pagination
        currentPage={pagination.currentPage}
        totalItems={pagination.totalItems}
        itemsPerPage={pagination.itemsPerPage}
        onPageChange={pagination.handlePageChange}
      />
    </div>
  );
}
```

2. 옵션 설정:
```tsx
<Pagination
  currentPage={pagination.currentPage}
  totalItems={pagination.totalItems}
  itemsPerPage={pagination.itemsPerPage}
  onPageChange={pagination.handlePageChange}
  showPageInfo={false}      // 모바일 페이지 정보 숨기기
  showResultInfo={false}    // 결과 정보 숨기기
  className="my-custom-class"
/>
```

3. 훅의 추가 기능들:
```tsx
const pagination = usePagination({...});

// 직접 페이지 이동
pagination.goToFirstPage();
pagination.goToLastPage();
pagination.goToPrevPage();
pagination.goToNextPage();

// 상태 확인
if (pagination.hasNextPage) {
  // 다음 페이지가 있을 때
}

if (pagination.isFirstPage) {
  // 첫 페이지일 때
}
```
*/ 