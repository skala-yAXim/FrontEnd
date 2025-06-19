"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReportItem } from "@/types/reportType";
import { formatBoldText } from "@/utils/formatBoldText";
import { getSourceIcon } from "@/utils/getSourceIcon";

interface ReportContentProps {
  contents: ReportItem[];
}

// [WBS 매칭], [WBS 미매칭] 텍스트를 제거하는 함수
const removeWbsPrefix = (text: string) => {
  return text.replace("[WBS 매칭]", "").replace("[WBS 미매칭]", "");
};

/**
 * 보고서 콘텐츠 컴포넌트
 * 클라이언트 컴포넌트 - tooltip 인터랙션 필요
 */
export function ReportContent({ contents }: ReportContentProps) {
  // 프로젝트별로 그룹화
  const projectGroups = contents.reduce(
    (acc, item) => {
      const projectKey = item.project_name || "기타 업무";
      if (!acc[projectKey]) {
        acc[projectKey] = [];
      }
      acc[projectKey].push(item);
      return acc;
    },
    {} as Record<string, ReportItem[]>
  );

  const renderTaskItem = (item: ReportItem, index: number) => (
    <div key={index} className='py-3 border-b border-border last:border-b-0'>
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <ul className='list-disc pl-5 space-y-2'>
            <li className='text-foreground leading-relaxed'>
              <div className='flex flex-col'>
                <span>{formatBoldText(removeWbsPrefix(item.text))}</span>
                {item.task && (
                  <span className='font-medium text-sm text-foreground mt-1'>
                    <span className='text-muted-foreground'>Task: </span>
                    {item.task}
                  </span>
                )}
              </div>
            </li>
          </ul>

          {/* Evidence 요약 표시 */}
          <div className='mt-2 flex flex-wrap gap-2 ml-4'>
            {item.evidence.map((ev, i) => (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant='outline'
                      className='text-xs cursor-pointer hover:bg-muted border-border'
                    >
                      {getSourceIcon(ev.source)}
                      <span className='ml-1 text-muted-foreground'>
                        {ev.title}
                      </span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className='bg-popover border shadow-lg text-sm px-4 py-3 max-w-md'>
                    <div className='space-y-3'>
                      <div className='flex items-start gap-2'>
                        <div className='mt-0.5'>📋</div>
                        <div>
                          <p className='font-semibold text-popover-foreground'>
                            출처
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            {ev.title}
                          </p>
                        </div>
                      </div>

                      <div className='text-sm text-muted-foreground bg-muted p-2 rounded'>
                        {ev.content}
                      </div>

                      {ev.llm_reference && (
                        <>
                          <div className='border-t border-border'></div>
                          <div className='flex items-start gap-2'>
                            <div className='text-muted-foreground'>🤖</div>
                            <div>
                              <p className='font-semibold text-popover-foreground mb-1'>
                                AI 분석 근거
                              </p>
                              <p className='text-sm text-muted-foreground leading-relaxed'>
                                {ev.llm_reference}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className='bg-muted/20'>
      <div className='max-w-4xl mx-auto px-8 py-6'>
        {/* 프로젝트별 섹션 렌더링 */}
        {Object.entries(projectGroups).map(
          ([projectName, items], groupIndex) => (
            <div key={groupIndex} className='mb-8 last:mb-0'>
              {/* 프로젝트 헤더 */}
              <div className='mb-4'>
                <div className='flex items-center gap-3 pb-2'>
                  <div className='h-0.5 w-6 bg-muted-foreground/50'></div>
                  <h3 className='text-lg font-bold text-foreground tracking-tight'>
                    [{projectName}]
                  </h3>
                  <div className='flex-1 h-0.5 bg-muted-foreground/50'></div>
                </div>
              </div>

              {/* 작업 목록 */}
              <div className='bg-muted-80 rounded-lg px-4'>
                <div className='space-y-0'>
                  {items.map((item, index) => renderTaskItem(item, index))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
