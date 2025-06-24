"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Source } from "@/types/reportType";
import { ReportContent as ReportContentType } from "@/types/weeklyReportType";
import { formatBoldText } from "@/utils/formatBoldText";
import { getSourceIcon } from "@/utils/getSourceIcon";

interface ReportContentProps {
  contents: ReportContentType[];
}

/**
 * 보고서 콘텐츠 컴포넌트
 * 클라이언트 컴포넌트 - tooltip 인터랙션 필요
 */
export function ReportContent({ contents }: ReportContentProps) {
  const renderReportItems = (items: ReportContentType[]) => {
    return items.map((item, idx) => (
      <li key={idx} className='list-disc mb-4'>
        <div className='space-y-2'>
          <div className='text-base'>
            <span>
              {formatBoldText(item.text)}
              {item.text.includes("(")
                ? ""
                : ` (${item.text.match(/\d{2}\/\d{2}/) || ""})`}
            </span>

            {/* 증거 아이콘 */}
            <div className='inline-flex ml-2 gap-1'>
              {item.evidence.map((ev, i) => (
                <TooltipProvider key={i}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        variant='outline'
                        className='text-muted-foreground text-xs cursor-pointer'
                      >
                        {getSourceIcon(ev.source as Source)}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className='bg-popover text-sm px-4 py-3 border border-border shadow-lg max-w-md'>
                      <div className='space-y-2'>
                        {/* 출처 섹션 */}
                        <div className='flex items-start gap-2'>
                          <div className='mt-0.5'>📋</div>
                          <div>
                            <p className='font-semibold text-foreground'>
                              출처
                            </p>
                            {/* <p className='text-sm text-muted-foreground'>
                              {ev.title}
                            </p> */}
                          </div>
                        </div>

                        {/* 내용 섹션 */}
                        <div className='text-sm text-muted-foreground bg-muted/50 p-2 rounded'>
                          {ev.content}
                        </div>

                        {/* LLM 참조 섹션 */}
                        {ev.LLM_reference && (
                          <>
                            <div className='border-t border-border/50'></div>
                            <div className='flex items-start gap-2'>
                              <div className='text-muted-foreground'>🤖</div>
                              <div>
                                <p className='font-semibold text-foreground mb-1'>
                                  AI가 생각한 근거
                                </p>
                                <p className='text-sm text-muted-foreground leading-relaxed'>
                                  {ev.LLM_reference}
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
      </li>
    ));
  };

  return (
    <div className='mt-4'>
      <ul className='pl-6 space-y-2'>{renderReportItems(contents)}</ul>
    </div>
  );
}
