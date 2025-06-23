// TODO: API 연동 필요 (보고서 상세 조회, PDF 다운로드)
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamWeeklyReportData } from "@/types/reportType";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import TeamWeeklyReportDetail from "./_components/TeamWeeklyReportDetail";

// 더미 데이터
const dummyTeamWeeklyReportData: TeamWeeklyReportData = {
  id: 1,
  createdAt: "2025-06-23T12:00:00Z",
  updatedAt: null,
  startDate: "2025-06-17",
  endDate: "2025-06-23",
  title: "6월 3주차 팀 주간 리포트",
  reportMd: "## 6월 3주차 팀 주간 리포트\n상세 내용은 아래를 참고하세요.",
  reportJson: {
    report_title: "6월 3주차 팀 주간 리포트",
    team_weekly_report: [
      {
        project_id: 101,
        project_name: "Git 데이터 기반 개인 업무 내용 파악 에이전트 개발",
        summary:
          "이번 주 팀은 개인 업무 관리 프로젝트의 핵심 기능 개발에 집중했습니다. Git, 이메일, Teams 데이터의 전처리 및 통합 분석 흐름을 구축하고, OAuth 로그인 및 프로젝트 관리 기능을 구현했습니다. 일부 작업은 데이터 부족 및 커뮤니케이션 부재로 지연되었으나 전반적인 진척은 긍정적이었습니다.",
        highlights: [
          {
            title: "LangGraph 적용 완료",
            contributors: ["노건표", "조민서"],
            summary:
              "LangGraph를 활용하여 멀티 에이전트 기반 업무 분석 기능을 개발하였습니다.",
            progress_percentage: 70,
            llm_reference: "LLM-Ref-001",
          },
          {
            title: "Vector DB 통합",
            contributors: ["김용준", "여다건"],
            summary:
              "Git, Teams 데이터를 벡터 DB에 통합하여 검색 기반을 구축하였습니다.",
            progress_percentage: 80,
            llm_reference: "LLM-Ref-002",
          },
        ],
        team_progress_overview: {
          overall_progress: 75,
          llm_reference: "LLM-Ref-OV-001",
        },
      },
      {
        project_id: 102,
        project_name: "사내 문서 자동 분류 시스템 개발",
        summary: "문서 데이터셋을 확장하고, 분류 모델을 적용하였습니다.",
        highlights: [
          {
            title: "문서 데이터 수집",
            contributors: ["김세은", "고석환"],
            summary: "사내 약 1,000건의 문서를 수집 및 전처리하였습니다.",
            progress_percentage: 60,
            llm_reference: "LLM-Ref-003",
          },
          {
            title: "분류 모델 적용 및 검증",
            contributors: ["김세은", "여다건"],
            summary:
              "BERT 기반 문서 분류 모델을 적용하고 초기 검증을 완료하였습니다.",
            progress_percentage: 25,
            llm_reference: "LLM-Ref-004",
          },
        ],
        team_progress_overview: {
          overall_progress: 62,
          llm_reference: "LLM-Ref-OV-002",
        },
      },
    ],
    team_weekly_reflection: {
      content: [
        "이번 주 API 연동 작업이 예상보다 원활하게 진행되었습니다.",
        "문서 데이터셋 구축 시 데이터 품질에 대한 지속적인 관리가 필요합니다.",
        "멀티 에이전트 시스템에서 예상치 못한 데이터 충돌 이슈가 발생하여 이를 개선해야 합니다.",
      ],
      next_week_schedule: [
        "개인 업무 분석 결과 시각화 기능 개발",
        "문서 분류 모델의 고도화 및 정확도 개선",
        "데이터 충돌 방지 로직 보완 및 테스트",
      ],
    },
    weekly_short_review:
      "이번 주는 Git 분석 에이전트와 문서 분류 시스템 모두에서 주요 진전이 있었습니다. API 연동과 데이터 구축이 성공적으로 진행되었습니다.",
    weekly_report_md:
      "## 6월 3주차 요약\n- Git 에이전트 개발 진척\n- 문서 분류 시스템 구축\n- 팀 협업 및 데이터 통합 성공",
  },
};

export default function TeamWeeklyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const reportId = params.id as string;

  // 더미 데이터 로드
  // const reportDetail = generateReportDetail(reportId);
  const reportDetail = dummyTeamWeeklyReportData;

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
  // const renderContentWithSources = (content: string) => {
  //   const lines = content.split("\n");

  //   return lines.map((line, index) => {
  //     // [출처] 패턴을 찾아서 툴팁으로 변환
  //     const parts = line.split(/(\[.*?\])/g);

  //     return (
  //       <div key={index} className='mb-2'>
  //         {parts.map((part, partIndex) => {
  //           // [출처] 패턴인지 확인
  //           const sourceMatch = part.match(/^\[(.*?)\]$/);
  //           if (sourceMatch) {
  //             const sourceName = sourceMatch[1];
  //             const sourceInfo = reportDetail.sources[sourceName];

  //             if (sourceInfo) {
  //               return (
  //                 <TooltipProvider key={partIndex}>
  //                   <Tooltip>
  //                     <TooltipTrigger asChild>
  //                       <span className='text-blue-600 hover:text-blue-800 cursor-help border-b border-blue-300 border-dashed'>
  //                         [{sourceName}]
  //                       </span>
  //                     </TooltipTrigger>
  //                     <TooltipContent className='max-w-sm'>
  //                       <p className='text-sm'>{sourceInfo}</p>
  //                     </TooltipContent>
  //                   </Tooltip>
  //                 </TooltipProvider>
  //               );
  //             }
  //           }

  //           // 일반 텍스트
  //           if (line.startsWith("# ")) {
  //             return (
  //               <h1 key={partIndex} className='text-2xl font-bold mb-4'>
  //                 {part.replace("# ", "")}
  //               </h1>
  //             );
  //           } else if (line.startsWith("## ")) {
  //             return (
  //               <h2 key={partIndex} className='text-xl font-semibold mb-3 mt-6'>
  //                 {part.replace("## ", "")}
  //               </h2>
  //             );
  //           } else if (line.startsWith("- **")) {
  //             const boldMatch = part.match(/- \*\*(.*?)\*\*:(.*)/);
  //             if (boldMatch) {
  //               return (
  //                 <li key={partIndex} className='mb-2'>
  //                   <strong>{boldMatch[1]}:</strong>
  //                   {boldMatch[2]}
  //                 </li>
  //               );
  //             }
  //           }

  //           return <span key={partIndex}>{part}</span>;
  //         })}
  //       </div>
  //     );
  //   });
  // };

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
              <CardTitle className='text-xl'>{reportDetail.title}</CardTitle>
              <p className='text-sm text-muted-foreground mt-1'>
                생성일:{" "}
                {new Date(reportDetail.createdAt).toLocaleDateString("ko-KR")}
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
        <TeamWeeklyReportDetail {...reportDetail} />
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
