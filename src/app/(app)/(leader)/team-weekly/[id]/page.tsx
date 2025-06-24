// TODO: API 연동 필요 (보고서 상세 조회, PDF 다운로드)
"use client";

import { ReportError, ReportNotFound } from "@/components/reports/ReportError";
import { ReportSkeleton } from "@/components/reports/ReportSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTeamWeeklyReport } from "@/hooks/useTeamWeeklyQueries";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import TeamWeeklyReportDetail from "./_components/TeamWeeklyReportDetail";

export default function TeamWeeklyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const reportId = params.id as string;

  const {
    data: reportData,
    isLoading,
    isError,
  } = useGetTeamWeeklyReport(Number(reportId));

  // 뒤로가기 핸들러
  const handleGoBack = () => {
    router.push("/team-weekly");
  };

  // PDF 다운로드 핸들러
  const handleDownloadPDF = () => {
    // TODO: API 호출 - PDF 생성 및 다운로드
    console.log("PDF 다운로드:", reportId);
    alert("PDF 다운로드 기능은 개발 중입니다.");
  };

  if (isLoading) {
    return <ReportSkeleton />;
  }

  if (isError) {
    return <ReportError error={isError.toString()} href='/daily' />;
  }

  if (!reportData) {
    return <ReportNotFound href='/daily' />;
  }

  return (
    <div className='w-full'>
      {/* 헤더 - 뒤로가기 & PDF 다운로드 */}
      <div className='flex justify-between items-center mb-6'>
        <Button
          variant='outline'
          onClick={handleGoBack}
          className='flex items-center gap-2'
        >
          <ArrowLeft className='w-4 h-4' />
          뒤로가기
        </Button>

        <Button onClick={handleDownloadPDF} className='flex items-center gap-2'>
          <Download className='w-4 h-4' />
          PDF 다운로드
        </Button>
      </div>

      {/* 보고서 카드 */}
      <Card className='w-full max-w-none'>
        <CardHeader className='border-b'>
          <div className='flex items-center gap-3'>
            <FileText className='w-6 h-6 text-blue-600' />
            <div>
              <CardTitle className='text-xl'>{reportData.title}</CardTitle>
              <p className='text-sm text-muted-foreground mt-1'>
                생성일:{" "}
                {new Date(reportData.createdAt).toLocaleDateString("ko-KR")}
                <span className='ml-4'>상태: 완료</span>
              </p>
            </div>
          </div>
        </CardHeader>

        {/* <CardContent className='p-8'>
          <div className='prose prose-lg max-w-none'>
            <div className='space-y-4 leading-relaxed'>
              {renderContentWithSources(reportDetail.content)}
            </div>
          </div>
        </CardContent> */}
      </Card>

      <Card>
        <TeamWeeklyReportDetail {...reportData} />
      </Card>

      {/* 하단 안내 */}
      <div className='mt-4 text-center text-sm text-muted-foreground'>
        <p>
          출처가 표시된 부분에 마우스를 올리면 상세 정보를 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
