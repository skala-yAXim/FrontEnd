"use client";

import { TypographyP } from "@/components/typography/Typograhpy";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReportItem } from "@/types/reportType";
import { getSourceIcon } from "@/utils/getSourceIcon";

interface ReportContentProps {
  contents: ReportItem[];
}

// **텍스트** 패턴을 <b> 태그로 변환하는 함수
const formatBoldText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldText = part.slice(2, -2);
      return <b key={index}>{boldText}</b>;
    }
    return part;
  });
};

/**
 * 보고서 콘텐츠 컴포넌트
 * 클라이언트 컴포넌트 - tooltip 인터랙션 필요
 */
export function ReportContent({ contents }: ReportContentProps) {
  const renderReportItems = (items: ReportItem[]) => {
    return items.map((item, idx) => (
      <div key={idx} className='border-l-4 border-l-muted pl-4 mb-10'>
        <div className='space-y-4'>
          <div className='text-base font-semibold'>
            <TypographyP className='inline'>
              {formatBoldText(item.text)}
            </TypographyP>
          </div>

          {/* 내용 섹션을 툴팁에서 바깥으로 이동 */}
          <div className='pl-4 space-y-3'>
            {item.evidence.map((ev, i) => (
              <div key={i} className='bg-muted/40 p-3 rounded-md'>
                <div className='flex items-start'>
                  <div className='space-y-2 w-full'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <h4 className='text-sm font-medium'>{ev.title}</h4>
                        {/* Badge를 title 옆으로 이동 */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge
                                variant='outline'
                                className='text-muted-foreground text-xs cursor-pointer'
                              >
                                {getSourceIcon(ev.source)}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent className='bg-muted text-sm px-4 py-3 max-w-md'>
                              <div className='space-y-2'>
                                {/* 출처 섹션 */}
                                <div className='flex items-start gap-2'>
                                  <div className='mt-0.5'>📋</div>
                                  <div>
                                    <p className='font-semibold text-foreground'>
                                      출처
                                    </p>
                                    <p className='text-sm text-muted-foreground'>
                                      {ev.title}
                                    </p>
                                  </div>
                                </div>

                                {/* LLM 참조 섹션 */}
                                {ev.llm_reference && (
                                  <>
                                    <div className='border-t border-border/50'></div>
                                    <div className='flex items-start gap-2'>
                                      <div className='text-muted-foreground'>
                                        🤖
                                      </div>
                                      <div>
                                        <p className='font-semibold text-foreground mb-1'>
                                          AI가 생각한 근거
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
                      </div>
                    </div>
                    <p className='text-sm text-muted-foreground whitespace-pre-wrap'>
                      {ev.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section className='space-y-6 p-6'>
      <div className='bg-muted-foreground/120 rounded-lg p-4'>
        {renderReportItems(contents)}
      </div>
    </section>
  );
}
