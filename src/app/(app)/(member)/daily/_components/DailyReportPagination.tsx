// import { Button } from "@/components/ui/button";

// interface DailyReportPaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// export function DailyReportPagination({
//   currentPage,
//   totalPages,
//   onPageChange,
// }: DailyReportPaginationProps) {
//   // 표시할 페이지 번호 범위 계산
//   const getVisiblePages = () => {
//     const delta = 2; // 현재 페이지 좌우로 보여줄 페이지 수
//     const range = [];
//     const rangeWithDots = [];

//     for (
//       let i = Math.max(2, currentPage - delta);
//       i <= Math.min(totalPages - 1, currentPage + delta);
//       i++
//     ) {
//       range.push(i);
//     }

//     if (currentPage - delta > 2) {
//       rangeWithDots.push(1, "...");
//     } else {
//       rangeWithDots.push(1);
//     }

//     rangeWithDots.push(...range);

//     if (currentPage + delta < totalPages - 1) {
//       rangeWithDots.push("...", totalPages);
//     } else if (totalPages > 1) {
//       rangeWithDots.push(totalPages);
//     }

//     return rangeWithDots;
//   };

//   const visiblePages = getVisiblePages();

//   const handlePageClick = (page: number | string) => {
//     if (typeof page === "number" && page !== currentPage) {
//       onPageChange(page);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       onPageChange(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       onPageChange(currentPage + 1);
//     }
//   };

//   if (totalPages <= 1) {
//     return null;
//   }

//   return (
//     <div className='flex items-center justify-center space-x-2'>
//       {/* 이전 페이지 버튼 */}
//       <Button
//         variant='outline'
//         size='sm'
//         onClick={handlePreviousPage}
//         disabled={currentPage === 1}
//       >
//         ← 이전
//       </Button>

//       {/* 페이지 번호들 */}
//       <div className='flex space-x-1'>
//         {visiblePages.map((page, index) => (
//           <Button
//             key={index}
//             variant={page === currentPage ? "default" : "outline"}
//             size='sm'
//             onClick={() => handlePageClick(page)}
//             disabled={page === "..."}
//             className={page === "..." ? "cursor-default" : ""}
//           >
//             {page}
//           </Button>
//         ))}
//       </div>

//       {/* 다음 페이지 버튼 */}
//       <Button
//         variant='outline'
//         size='sm'
//         onClick={handleNextPage}
//         disabled={currentPage === totalPages}
//       >
//         다음 →
//       </Button>

//       {/* 페이지 정보 */}
//       <div className='ml-4 text-sm text-muted-foreground'>
//         {currentPage} / {totalPages} 페이지
//       </div>
//     </div>
//   );
// }
