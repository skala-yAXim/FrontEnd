"use client";

import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetTeamInfo, usePostTemplate } from "@/hooks/useTeamQueries";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TeamWeeklySettingPage() {
  const [template, setTemplate] = useState("");

  const { data: teamInfo, isLoading: isTeamInfoLoading } = useGetTeamInfo();
  const { postTemplate, isPending: isSubmitting } = usePostTemplate();

  // teamInfo가 로드되면 템플릿에 설정
  useEffect(() => {
    if (teamInfo?.weeklyTemplate) {
      console.log("팀 템플릿 로드:", teamInfo.weeklyTemplate);
      setTemplate(teamInfo.weeklyTemplate);
    }
  }, [teamInfo]);

  // 템플릿 저장 핸들러
  const handleSaveTemplate = async () => {
    if (!template.trim()) {
      toast.error("템플릿 내용을 입력해주세요.");
      return;
    }

    console.log("템플릿 저장 시도:", template);

    try {
      console.log("postTemplate 호출 전");
      postTemplate(template, {
        onSuccess: () => {
          console.log("템플릿 저장 성공");
        },
        onError: error => {
          console.error("템플릿 저장 실패 (콜백):", error);
        },
      });
    } catch (error) {
      console.error("postTemplate 호출 중 에러:", error);
    }
  };

  // 템플릿 예시 불러오기
  const loadTemplateExample = (type: string) => {
    let exampleTemplate = "";

    if (type === "basic") {
      exampleTemplate = `주간 보고서

주요 성과
- [성과 1]
- [성과 2]
- [성과 3]

진행 중인 작업
- [작업 1] - [진행률]%
- [작업 2] - [진행률]%
- [작업 3] - [진행률]%

다음 주 계획
- [계획 1]
- [계획 2]
- [계획 3]

이슈 및 차단 요소
- [이슈 1]
- [이슈 2]

팀 멤버 활동
- [이름]: [활동 내용]
- [이름]: [활동 내용]`;
    } else if (type === "detailed") {
      exampleTemplate = `[팀명] 주간 보고서
기간: [시작일] ~ [종료일]
작성자: [작성자명]

1. 주간 요약
[이번 주의 전반적인 진행 상황과 주요 성과에 대한 간략한 요약]

2. 프로젝트 진행 상황
2.1 [프로젝트 A]
- 진행률: [진행률]%
- 주요 활동:
  - [활동 1]
  - [활동 2]
- 산출물:
  - [산출물 1]
  - [산출물 2]

2.2 [프로젝트 B]
- 진행률: [진행률]%
- 주요 활동:
  - [활동 1]
  - [활동 2]
- 산출물:
  - [산출물 1]
  - [산출물 2]

3. 팀 멤버 기여도
[이름] - [업무] - [성과] - [다음 주 계획]
[이름] - [업무] - [성과] - [다음 주 계획]

4. 이슈 및 리스크
[이슈 1] - [영향] - [대응 방안] - [담당자]
[이슈 2] - [영향] - [대응 방안] - [담당자]

5. 다음 주 계획
- [계획 1]
- [계획 2]
- [계획 3]

6. 기타 사항
[추가 논의 사항이나 공지사항]`;
    } else if (type === "agile") {
      exampleTemplate = `스프린트 리뷰/계획 보고서
스프린트: [번호]
기간: [시작일] ~ [종료일]
팀: [팀명]

1. 스프린트 리뷰
1.1 완료된 사용자 스토리
- [스토리 ID]: [스토리 제목] (완료)
- [스토리 ID]: [스토리 제목] (완료)

1.2 미완료 사용자 스토리
- [스토리 ID]: [스토리 제목] - [진행률]%
- [스토리 ID]: [스토리 제목] - [진행률]%

1.3 스프린트 목표 달성도
- 목표: [스프린트 목표]
- 달성도: [달성률]%
- 평가: [목표 달성에 대한 평가]

2. 회고
2.1 잘한 점
- [잘한 점 1]
- [잘한 점 2]

2.2 개선할 점
- [개선할 점 1]
- [개선할 점 2]

2.3 액션 아이템
- [액션 아이템 1] - 담당: [담당자]
- [액션 아이템 2] - 담당: [담당자]

3. 다음 스프린트 계획
3.1 스프린트 목표
[다음 스프린트의 주요 목표]

3.2 계획된 사용자 스토리
- [스토리 ID]: [스토리 제목] ([포인트])
- [스토리 ID]: [스토리 제목] ([포인트])

3.3 팀 용량
- 총 계획 포인트: [포인트]
- 이전 스프린트 속도: [포인트]

4. 리스크 및 의존성
- [리스크/의존성 1]
- [리스크/의존성 2]`;
    }

    setTemplate(exampleTemplate);
    toast.success("템플릿 예시가 적용되었습니다.");
  };

  return (
    <div className='space-y-6 pb-10'>
      <PageHeader
        title='팀 위클리 템플릿 설정'
        description='팀에서 사용할 위클리 보고서 템플릿을 설정하세요. 기존 템플릿은 새로운 템플릿으로 대체됩니다.'
      />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <Card className='border-0 shadow-lg'>
            <CardContent className='pt-1'>
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='template-content'>템플릿 내용</Label>
                </div>

                <div>
                  <div className='space-y-2'>
                    <div className='relative'>
                      <Textarea
                        id='template-content'
                        placeholder={
                          isTeamInfoLoading
                            ? ""
                            : "위클리 보고서 템플릿 내용을 작성하세요."
                        }
                        className='min-h-[400px] font-mono resize-none'
                        value={template}
                        onChange={e => setTemplate(e.target.value)}
                        disabled={isTeamInfoLoading || isSubmitting}
                      />
                      {isTeamInfoLoading && (
                        <div className='absolute inset-0 flex items-center justify-center bg-background/50'>
                          <p className='text-sm text-muted-foreground'>
                            템플릿 불러오는 중...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='flex flex-wrap justify-between gap-2 mt-4'>
                  <p className='text-sm text-muted-foreground w-full mb-1'>
                    템플릿 예시:
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => loadTemplateExample("basic")}
                      disabled={isTeamInfoLoading || isSubmitting}
                    >
                      기본 템플릿
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => loadTemplateExample("detailed")}
                      disabled={isTeamInfoLoading || isSubmitting}
                    >
                      상세 템플릿
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => loadTemplateExample("agile")}
                      disabled={isTeamInfoLoading || isSubmitting}
                    >
                      애자일/스프린트 템플릿
                    </Button>
                  </div>
                  <Button
                    onClick={handleSaveTemplate}
                    disabled={isSubmitting || isTeamInfoLoading}
                    className='px-6'
                  >
                    {isSubmitting ? "저장 중..." : "템플릿 저장"}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-end bg-muted/20 py-4'></CardFooter>
          </Card>
        </div>

        <div className='lg:col-span-1'>
          <Card className='border-0 shadow-lg sticky top-23'>
            <CardHeader className='rounded-t-lg'>
              <CardTitle className='text-lg'>템플릿 설정 가이드</CardTitle>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-4 text-sm'>
                <div>
                  <h3 className='font-medium mb-1'>
                    효과적인 위클리 템플릿 작성 팁
                  </h3>
                  <ul className='list-disc pl-5 space-y-1 text-muted-foreground'>
                    <li>명확한 섹션 구분으로 정보를 체계화하세요</li>
                    <li>프로젝트 진행 상황을 시각적으로 표현하세요</li>
                    <li>다음 주 계획을 구체적으로 작성하세요</li>
                    <li>이슈와 리스크를 명확히 기록하세요</li>
                    <li>팀원별 기여도를 포함하세요</li>
                  </ul>
                </div>

                <div>
                  <h3 className='font-medium mb-1'>권장 포함 항목</h3>
                  <ul className='list-disc pl-5 space-y-1 text-muted-foreground'>
                    <li>주요 성과 및 달성 사항</li>
                    <li>프로젝트별 진행 상황</li>
                    <li>다음 주 계획 및 목표</li>
                    <li>이슈 및 리스크 요소</li>
                    <li>팀원별 업무 현황</li>
                  </ul>
                </div>

                <div className='bg-muted/30 p-3 rounded-md'>
                  <h3 className='font-medium mb-1'>도움말</h3>
                  <p className='text-muted-foreground text-xs'>
                    템플릿을 저장하면 팀의 모든 위클리 보고서 작성 시 기본
                    양식으로 사용됩니다. 이전 위클리를 불러와 템플릿으로
                    활용하거나, 예시 템플릿을 사용할 수 있습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
