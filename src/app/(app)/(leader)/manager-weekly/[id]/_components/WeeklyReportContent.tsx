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
import { formatBoldText } from "@/utils/formatBoldText";
import { getSourceIcon } from "@/utils/getSourceIcon";

interface WeeklyReportContentProps {
  contents: ReportItem[];
}

/**
 * 위클리 보고서 콘텐츠 컴포넌트
 */
export function WeeklyReportContent({ contents }: WeeklyReportContentProps) {
  // WBS 매칭/미매칭으로 그룹화
  const wbsMatchedItems = contents.filter(item => item.task !== null);
  const wbsUnmatchedItems = contents.filter(item => item.task === null);

  const renderReportItems = (items: ReportItem[]) => {
    return items.map((item, idx) => (
      <div key={idx} className='border-l-4 border-l-muted pl-4 mb-10'>
        <div className='space-y-4'>
          <div className='text-base font-semibold'>
            <TypographyP className='inline'>
              {formatBoldText(item.text)}
            </TypographyP>
          </div>

          <div className='pl-4 space-y-3'>
            {item.evidence.map((ev, i) => (
              <div key={i} className='bg-muted/40 p-3 rounded-md'>
                <div className='flex items-start'>
                  <div className='space-y-2 w-full'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <h4 className='text-sm font-medium'>
                          {formatBoldText(ev.title)}
                        </h4>
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
                      {ev.detailed_activities}
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
      {/* WBS 매칭 섹션 */}
      {wbsMatchedItems.length > 0 && (
        <div className='space-y-4'>
          <div className='flex items-center gap-2 pb-2 border-b-2 border-green-200'>
            <div className='w-4 h-4 bg-green-500 rounded-full'></div>
            <h3 className='text-lg font-bold'>
              WBS 매칭 ({wbsMatchedItems.length}건)
            </h3>
          </div>
          <div className='bg-muted-foreground/120 rounded-lg p-4'>
            {renderReportItems(wbsMatchedItems)}
          </div>
        </div>
      )}

      {/* WBS 미매칭 섹션 */}
      {wbsUnmatchedItems.length > 0 && (
        <div className='space-y-4'>
          <div className='flex items-center gap-2 pb-2 border-b-2 border-amber-200'>
            <div className='w-4 h-4 bg-amber-500 rounded-full'></div>
            <h3 className='text-lg font-bold'>
              WBS 미매칭 ({wbsUnmatchedItems.length}건)
            </h3>
          </div>
          <div className='bg-muted-foreground/120 rounded-lg p-4'>
            {renderReportItems(wbsUnmatchedItems)}
          </div>
        </div>
      )}
    </section>
  );
}
