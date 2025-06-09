"use client";

import { ThemeToggleButton } from "@/components/theme/ThemeToggleButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip-simple";
import { useDailyReportStore } from "@/store/dailyReportStore";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

/**
 * MEM01M02 - 세부 보고서 페이지 (내용 부분만)
 * 설계서 기준: 데일리 보고서 선택 시 이동하는 상세 화면
 */
export default function DailyReportDetailPage() {
  const params = useParams();
  const reportId = params.id as string;

  const { currentReport, isLoading, error, setCurrentReport, setLoading } =
    useDailyReportStore();

  // TODO: API 연동 시 실제 데이터 fetch 로직 구현
  useEffect(() => {
    if (reportId) {
      setLoading(true);

      // 임시 데이터 (실제 구현에서는 API 호출)
      setTimeout(() => {
        const mockReport = {
          id: reportId,
          title: "2025년 5월 29일 개발 진행 보고서",
          content: `
## 오늘의 주요 업무

### 1. Frontend 개발
- yAXim 프로젝트의 Daily 보고서 기능 구현 시작
- React 컴포넌트 설계 및 기본 구조 구축  
- TypeScript 타입 정의 및 Zustand 상태 관리 설정

### 2. UI/UX 개선
- 다크모드 지원 컴포넌트 개발
- 반응형 디자인 적용
- 접근성 고려한 인터페이스 구현

### 3. 기술적 의사결정
- Next.js 15 App Router 활용
- Tailwind CSS를 통한 스타일링
- 컴포넌트 기반 아키텍처 적용

## 데이터 출처
- [Microsoft Teams 회의록](출처: 2025-05-29 개발팀 회의)
- [GitHub 커밋 로그](출처: yAXim-frontend repository)
- [Jira 티켓 진행 상황](출처: PROJ-1234, PROJ-1235)

## 내일 계획
- API 연동 로직 구현
- 데이터 검증 및 에러 처리
- 테스트 코드 작성

## 이슈 및 해결사항
- 페이지네이션 로직 최적화 필요
- 검색 기능 성능 개선 검토

## 기타 사항
프로젝트 진행 속도가 양호하며, 예정된 일정 내에 완료 가능할 것으로 예상됩니다.
          `,
          date: "2025-05-29",
          author: {
            id: "user-1",
            name: "개발자",
            email: "developer@yaxim.com",
          },
          status: "published" as const,
          createdAt: "2025-05-29T09:00:00Z",
          updatedAt: "2025-05-29T15:30:00Z",
          tags: ["개발", "프론트엔드", "UI/UX", "React"],
          attachments: [
            {
              id: "att-1",
              name: "설계서_v1.0.pdf",
              url: "/files/design-doc.pdf",
              type: "application/pdf",
              size: 2048000,
            },
          ],
        };

        setCurrentReport(mockReport);
        setLoading(false);
      }, 1000);
    }
  }, [reportId, setCurrentReport, setLoading]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge variant='success'>📝 완료</Badge>;
      case "draft":
        return <Badge variant='warning'>⏳ 생성중</Badge>;
      case "archived":
        return <Badge variant='secondary'>📁 보관됨</Badge>;
      default:
        return null;
    }
  };

  // PDF 다운로드 핸들러
  const handlePdfDownload = async () => {
    try {
      // TODO: 실제 PDF 생성 API 호출
      alert("PDF 다운로드 기능이 구현될 예정입니다.");
    } catch (error) {
      console.error("PDF 다운로드 실패:", error);
    }
  };

  // 출처 태그를 포함한 텍스트 렌더링
  const renderContentWithSources = (content: string) => {
    // 출처 태그 패턴 감지: [텍스트](출처: 설명)
    const sourcePattern = /\[([^\]]+)\]\(출처: ([^)]+)\)/g;

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = sourcePattern.exec(content)) !== null) {
      // 매치 이전 텍스트 추가
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }

      // 출처 태그를 툴팁으로 감싸기
      const [fullMatch, linkText, sourceInfo] = match;
      parts.push(
        <Tooltip key={match.index}>
          <TooltipTrigger asChild>
            <span className='inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded cursor-help hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors'>
              {linkText}
              <ExternalLink className='ml-1 h-3 w-3' />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p className='font-semibold'>📋 데이터 출처</p>
            <p className='text-sm'>{sourceInfo}</p>
          </TooltipContent>
        </Tooltip>
      );

      lastIndex = match.index + fullMatch.length;
    }

    // 남은 텍스트 추가
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts.length > 1 ? parts : content;
  };

  if (isLoading) {
    return (
      <div className='space-y-6 p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Skeleton className='h-8 w-24' />
            <Skeleton className='h-8 w-48' />
          </div>
          <Skeleton className='h-10 w-10 rounded-md' />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className='h-8 w-3/4' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-1/2' />
              <Skeleton className='h-4 w-1/3' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className='h-4 w-full' />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-6'>
        <Alert variant='destructive'>
          <AlertDescription>
            <div className='flex items-center justify-between'>
              <span>😵 {error}</span>
              <Link href='/daily-reports'>
                <Button variant='outline' size='sm'>
                  목록으로 돌아가기
                </Button>
              </Link>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!currentReport) {
    return (
      <div className='p-6'>
        <Card>
          <CardContent className='flex flex-col items-center justify-center py-16'>
            <div className='text-6xl mb-4'>📄</div>
            <CardTitle className='mb-2'>보고서를 찾을 수 없습니다</CardTitle>
            <p className='text-muted-foreground mb-6 text-center'>
              요청하신 보고서가 존재하지 않거나 삭제되었습니다.
            </p>
            <Link href='/daily-reports'>
              <Button>목록으로 돌아가기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className='space-y-6 p-6'>
        {/* 헤더 */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link href='/daily-reports'>
              <Button variant='outline' size='sm'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                목록으로
              </Button>
            </Link>
            <div className='h-6 w-px bg-border' />
            <h1 className='text-lg font-semibold'>보고서 상세</h1>
          </div>

          <div className='flex items-center space-x-2'>
            <Button onClick={handlePdfDownload} size='sm'>
              <Download className='mr-2 h-4 w-4' />
              PDF 다운로드
            </Button>
            <ThemeToggleButton />
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <Card>
          {/* 보고서 헤더 */}
          <CardHeader className='border-b'>
            <div className='flex items-start justify-between mb-4'>
              <CardTitle className='text-2xl leading-tight'>
                {currentReport.title}
              </CardTitle>
              {getStatusBadge(currentReport.status)}
            </div>

            {/* 생성일자 정보 */}
            <div className='flex flex-wrap items-center gap-6 text-sm text-muted-foreground'>
              <div className='flex items-center space-x-2'>
                <span>📅</span>
                <span className='font-medium'>
                  {formatDate(currentReport.date)}
                </span>
              </div>

              <div className='flex items-center space-x-2'>
                <span>🕒</span>
                <span>
                  생성:{" "}
                  {new Date(currentReport.createdAt).toLocaleString("ko-KR")}
                </span>
              </div>

              <div className='flex items-center space-x-2'>
                <span>👤</span>
                <span>{currentReport.author.name}</span>
              </div>
            </div>
          </CardHeader>

          {/* 보고서 내용 */}
          <CardContent className='pt-6'>
            <div className='prose prose-gray dark:prose-invert max-w-none'>
              <div className='whitespace-pre-wrap leading-relaxed'>
                {renderContentWithSources(currentReport.content)}
              </div>
            </div>
          </CardContent>

          {/* 첨부파일 */}
          {currentReport.attachments &&
            currentReport.attachments.length > 0 && (
              <CardContent className='border-t pt-6'>
                <h3 className='text-lg font-semibold mb-4 flex items-center'>
                  <FileText className='mr-2 h-5 w-5' />
                  첨부파일 ({currentReport.attachments.length})
                </h3>
                <div className='space-y-3'>
                  {currentReport.attachments.map(attachment => (
                    <div
                      key={attachment.id}
                      className='flex items-center justify-between p-3 bg-muted/50 rounded-lg'
                    >
                      <div className='flex items-center space-x-3'>
                        <FileText className='h-8 w-8 text-muted-foreground' />
                        <div>
                          <p className='font-medium'>{attachment.name}</p>
                          <p className='text-sm text-muted-foreground'>
                            {formatFileSize(attachment.size)}
                          </p>
                        </div>
                      </div>
                      <Button variant='outline' size='sm'>
                        <Download className='mr-2 h-4 w-4' />
                        다운로드
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
        </Card>
      </div>
    </TooltipProvider>
  );
}
