// TODO: API 연동 필요 (보고서 상세 조회, PDF 다운로드)
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import React from "react";

// 더미 데이터 인터페이스
interface WeeklyReportDetail {
  id: string;
  title: string;
  createdAt: string;
  status: string;
  content: string;
  sources: { [key: string]: string };
}

// 더미 데이터 생성
const generateReportDetail = (id: string): WeeklyReportDetail => {
  return {
    id,
    title: "2025년 5월 22주차 팀 위클리 보고서",
    createdAt: "2025-05-30",
    status: "completed",
    content: `
# 팀 위클리 보고서

## 주요 성과
이번 주 우리 팀은 다음과 같은 성과를 달성했습니다:

- **프로젝트 A 완료**: [개발팀의 일일 보고서]에 따르면 예정보다 2일 앞서 완료했습니다.
- **버그 수정 완료**: [QA팀 테스트 결과]를 바탕으로 총 15개의 버그를 수정했습니다.
- **성능 개선**: [모니터링 시스템 데이터]에서 응답시간이 30% 향상된 것을 확인했습니다.

## 이슈 및 해결방안
다음과 같은 이슈들을 확인하고 해결방안을 마련했습니다:

- **서버 용량 부족**: [인프라팀 보고서]에 따르면 현재 서버 사용률이 85%에 도달했습니다.
- **일정 지연 우려**: [프로젝트 매니저 리포트]에서 다음 주 일정에 대한 우려를 표명했습니다.

## 다음 주 계획
- 서버 증설 작업 진행
- 새로운 기능 개발 착수
- 팀 내 커뮤니케이션 강화 방안 논의

## 팀 리더 코멘트
전반적으로 팀의 성과가 우수하며, 목표 달성을 위한 협력이 잘 이루어지고 있습니다.
    `,
    sources: {
      "개발팀의 일일 보고서": "김개발님의 5월 29일 일일 보고서 - 프로젝트 A 진행률 100% 달성",
      "QA팀 테스트 결과": "이테스터님의 5월 28일 QA 리포트 - 버그 15건 발견 및 수정 완료",
      "모니터링 시스템 데이터": "서버 모니터링 시스템 - 평균 응답시간 150ms → 105ms로 개선",
      "인프라팀 보고서": "박인프라님의 5월 30일 서버 현황 보고서 - CPU 85%, 메모리 78% 사용률",
      "프로젝트 매니저 리포트": "최매니저님의 5월 30일 프로젝트 현황 보고서 - 일정 조정 필요성 언급"
    }
  };
};

export default function TeamWeeklyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const reportId = params.id as string;

  // 더미 데이터 로드
  const reportDetail = generateReportDetail(reportId);

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

  // 보고서 내용에서 출처 태그를 렌더링하는 함수
  const renderContentWithSources = (content: string) => {
    const lines = content.split('\n');
    
    return lines.map((line, index) => {
      // [출처] 패턴을 찾아서 툴팁으로 변환
      const parts = line.split(/(\[.*?\])/g);
      
      return (
        <div key={index} className="mb-2">
          {parts.map((part, partIndex) => {
            // [출처] 패턴인지 확인
            const sourceMatch = part.match(/^\[(.*?)\]$/);
            if (sourceMatch) {
              const sourceName = sourceMatch[1];
              const sourceInfo = reportDetail.sources[sourceName];
              
              if (sourceInfo) {
                return (
                  <TooltipProvider key={partIndex}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-blue-600 hover:text-blue-800 cursor-help border-b border-blue-300 border-dashed">
                          [{sourceName}]
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p className="text-sm">{sourceInfo}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              }
            }
            
            // 일반 텍스트
            if (line.startsWith('# ')) {
              return <h1 key={partIndex} className="text-2xl font-bold mb-4">{part.replace('# ', '')}</h1>;
            } else if (line.startsWith('## ')) {
              return <h2 key={partIndex} className="text-xl font-semibold mb-3 mt-6">{part.replace('## ', '')}</h2>;
            } else if (line.startsWith('- **')) {
              const boldMatch = part.match(/- \*\*(.*?)\*\*:(.*)/);
              if (boldMatch) {
                return (
                  <li key={partIndex} className="mb-2">
                    <strong>{boldMatch[1]}:</strong>{boldMatch[2]}
                  </li>
                );
              }
            }
            
            return <span key={partIndex}>{part}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <div className="w-full">
      {/* 헤더 - 뒤로가기 & PDF 다운로드 */}
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          onClick={handleGoBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          뒤로가기
        </Button>
        
        <Button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          PDF 다운로드
        </Button>
      </div>

      {/* 보고서 카드 */}
      <Card className="w-full max-w-none">
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <div>
              <CardTitle className="text-xl">{reportDetail.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                생성일: {new Date(reportDetail.createdAt).toLocaleDateString("ko-KR")} 
                <span className="ml-4">상태: 완료</span>
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-4 leading-relaxed">
              {renderContentWithSources(reportDetail.content)}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 하단 안내 */}
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>출처가 표시된 부분에 마우스를 올리면 상세 정보를 확인할 수 있습니다.</p>
      </div>
    </div>
  );
}
