"use client";

import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetTeamInfo, usePostTemplate } from "@/hooks/useTeamQueries";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TeamWeeklySettingPage() {
  const [template, setTemplate] = useState("");
  const [activeTab, setActiveTab] = useState<string>("edit");

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
    <div className='space-y-8 pb-10'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader
          title='팀 위클리 템플릿 설정'
          description='팀에서 사용할 위클리 보고서 템플릿을 설정하세요. 기존 템플릿은 새로운 템플릿으로 대체됩니다.'
        />
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <motion.div
          className='lg:col-span-2'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className='border-0 overflow-hidden p-6'>
            <div>
              <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                  <Label
                    htmlFor='template-content'
                    className='text-lg font-medium'
                  >
                    템플릿 내용
                  </Label>
                  {!isTeamInfoLoading && (
                    <div className='flex gap-2'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => loadTemplateExample("basic")}
                        disabled={isTeamInfoLoading || isSubmitting}
                        className='text-xs hover:bg-primary/10 hover:text-primary transition-colors'
                      >
                        기본 템플릿
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => loadTemplateExample("detailed")}
                        disabled={isTeamInfoLoading || isSubmitting}
                        className='text-xs hover:bg-primary/10 hover:text-primary transition-colors'
                      >
                        상세 템플릿
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => loadTemplateExample("agile")}
                        disabled={isTeamInfoLoading || isSubmitting}
                        className='text-xs hover:bg-primary/10 hover:text-primary transition-colors'
                      >
                        애자일 템플릿
                      </Button>
                    </div>
                  )}
                </div>

                <div className='relative rounded-lg overflow-hidden border border-border/50 shadow-inner'>
                  <Textarea
                    id='template-content'
                    placeholder={
                      isTeamInfoLoading
                        ? ""
                        : "위클리 보고서 템플릿 내용을 작성하세요."
                    }
                    className='min-h-[450px] font-mono resize-none border-0 p-4 focus-visible:ring-1 focus-visible:ring-primary/30 bg-card/50 backdrop-blur-sm'
                    value={template}
                    onChange={e => setTemplate(e.target.value)}
                    disabled={isTeamInfoLoading || isSubmitting}
                  />
                  {isTeamInfoLoading && (
                    <motion.div
                      className='absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className='flex flex-col items-center gap-2'>
                        <div className='h-5 w-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin'></div>
                        <p className='text-sm font-medium text-muted-foreground'>
                          템플릿 불러오는 중...
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className='flex justify-end'>
                  <Button
                    onClick={handleSaveTemplate}
                    disabled={isSubmitting || isTeamInfoLoading}
                    className='px-8 bg-primary hover:bg-primary/80 text-primary-foreground'
                  >
                    {isSubmitting ? (
                      <div className='flex items-center gap-2'>
                        <div className='h-4 w-4 rounded-full border-2 border-background/30 border-t-background animate-spin'></div>
                        <span>저장 중...</span>
                      </div>
                    ) : (
                      <span>템플릿 저장</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className='lg:col-span-1'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className='border-0 sticky top-24 bg-gradient-to-br from-background to-muted/20 shadow-xl'>
            <CardContent className='pt-6'>
              <div className='space-y-6 text-sm'>
                <div className='bg-gradient-to-br from-primary/5 to-background p-4 rounded-lg border border-border/30 shadow-sm'>
                  <h3 className='font-semibold mb-2 text-base'>
                    효과적인 위클리 템플릿 작성 팁
                  </h3>
                  <ul className='list-disc pl-5 space-y-2 text-muted-foreground'>
                    <li className='hover:text-foreground transition-colors'>
                      명확한 섹션 구분으로 정보를 체계화하세요
                    </li>
                    <li className='hover:text-foreground transition-colors'>
                      프로젝트 진행 상황을 시각적으로 표현하세요
                    </li>
                    <li className='hover:text-foreground transition-colors'>
                      다음 주 계획을 구체적으로 작성하세요
                    </li>
                    <li className='hover:text-foreground transition-colors'>
                      이슈와 리스크를 명확히 기록하세요
                    </li>
                    <li className='hover:text-foreground transition-colors'>
                      팀원별 기여도를 포함하세요
                    </li>
                  </ul>
                </div>

                <div className='bg-gradient-to-br from-primary/5 to-background p-4 rounded-lg border border-border/30 shadow-sm'>
                  <h3 className='font-semibold mb-2 text-base'>
                    권장 포함 항목
                  </h3>
                  <ul className='list-disc pl-5 space-y-2 text-muted-foreground'>
                    <li className='hover:text-foreground transition-colors'>
                      주요 성과 및 달성 사항
                    </li>
                    <li className='hover:text-foreground transition-colors'>
                      프로젝트별 진행 상황
                    </li>
                    <li className='hover:text-foreground transition-colors'>
                      다음 주 계획 및 목표
                    </li>
                    <li className='hover:text-foreground transition-colors'>
                      이슈 및 리스크 요소
                    </li>
                    <li className='hover:text-foreground transition-colors'>
                      팀원별 업무 현황
                    </li>
                  </ul>
                </div>

                <div className='bg-gradient-to-br from-muted/30 to-background p-4 rounded-lg border border-border/30 shadow-sm'>
                  <h3 className='font-semibold mb-2 text-base'>도움말</h3>
                  <p className='text-muted-foreground text-xs leading-relaxed'>
                    템플릿을 저장하면 팀의 모든 위클리 보고서 작성 시 기본
                    양식으로 사용됩니다. 이전 위클리를 불러와 템플릿으로
                    활용하거나, 예시 템플릿을 사용할 수 있습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
