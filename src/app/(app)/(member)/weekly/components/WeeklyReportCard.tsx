// "use client";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { weeklyReportService } from "@/services/weeklyReportService";
// import { WeeklyReportData } from "@/types/weeklyReport";
// import { CalendarDays, Download, FileText, RotateCcw } from "lucide-react";
// import Link from "next/link";
// import React from "react";

// interface WeeklyReportCardProps {
//   report: WeeklyReportData;
//   onDownloadPDF?: (id: string) => void;
//   onRegenerate?: (id: string) => void;
//   isLoading?: boolean;
// }

// export const WeeklyReportCard: React.FC<WeeklyReportCardProps> = ({
//   report,
//   onDownloadPDF,
//   onRegenerate,
//   isLoading = false,
// }) => {
//   const dateRange = weeklyReportService.formatDateRange(
//     report.weekStartDate,
//     report.weekEndDate
//   );

//   const isCompleted = report.status === "COMPLETED";
//   const isGenerating = report.status === "GENERATING";
//   const hasError = report.status === "ERROR";

//   return (
//     <Card className='hover:shadow-lg transition-shadow duration-200'>
//       <CardHeader className='pb-3'>
//         <div className='flex items-center justify-between'>
//           <CardTitle className='text-lg font-semibold'>
//             {report.year}년 {report.weekNumber}주차
//           </CardTitle>
//           <Badge className={getStatusColor(report.status)}>
//             {getStatusText(report.status)}
//           </Badge>
//         </div>
//         <div className='flex items-center text-sm text-muted-foreground'>
//           <CalendarDays className='w-4 h-4 mr-1' />
//           {dateRange}
//         </div>
//       </CardHeader>

//       <CardContent className='pt-0'>
//         <div className='space-y-4'>
//           {/* 주요 지표 미리보기 */}
//           <div>
//             <p className='text-sm text-muted-foreground mb-1'>주요 업무 지표</p>
//             <p className='text-sm line-clamp-2'>
//               {report.keyMetrics || "지표가 입력되지 않았습니다."}
//             </p>
//           </div>

//           {/* 액션 버튼들 */}
//           <div className='flex items-center justify-between pt-2'>
//             <div className='flex items-center gap-2'>
//               {/* 상세보기 버튼 - 완료된 보고서만 활성화 */}
//               <Link
//                 href={`/weekly-reports/${report.id}`}
//                 className={isCompleted ? "" : "pointer-events-none"}
//               >
//                 <Button
//                   variant='outline'
//                   size='sm'
//                   disabled={!isCompleted || isLoading}
//                   className='flex items-center gap-1'
//                 >
//                   <FileText className='w-4 h-4' />
//                   상세보기
//                 </Button>
//               </Link>

//               {/* PDF 다운로드 버튼 */}
//               {isCompleted && onDownloadPDF && (
//                 <Button
//                   variant='outline'
//                   size='sm'
//                   onClick={() => onDownloadPDF(report.id)}
//                   disabled={isLoading}
//                   className='flex items-center gap-1'
//                 >
//                   <Download className='w-4 h-4' />
//                   PDF
//                 </Button>
//               )}

//               {/* 재생성 버튼 - 오류 상태일 때만 표시 */}
//               {hasError && onRegenerate && (
//                 <Button
//                   variant='outline'
//                   size='sm'
//                   onClick={() => onRegenerate(report.id)}
//                   disabled={isLoading}
//                   className='flex items-center gap-1 text-orange-600 border-orange-200 hover:bg-orange-50'
//                 >
//                   <RotateCcw className='w-4 h-4' />
//                   재생성
//                 </Button>
//               )}
//             </div>

//             {/* 생성 중 표시 */}
//             {isGenerating && (
//               <div className='flex items-center text-sm text-blue-600'>
//                 <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2'></div>
//                 생성 중...
//               </div>
//             )}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default WeeklyReportCard;
