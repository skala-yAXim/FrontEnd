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
import {
  renderSafeContent,
  renderSectionHeader,
} from "@/utils/renderReportContent";

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
                    <TooltipContent
                      side='right'
                      sideOffset={10}
                      className='bg-popover border border-border shadow-lg text-sm px-4 py-3 max-w-lg'
                    >
                      <div className='space-y-3'>
                        {/* 출처 섹션 */}
                        {renderSectionHeader("📋", "출처", ev.title)}

                        {/* 출처 내용 */}
                        <div className='bg-muted/80 p-3 rounded'>
                          {renderSafeContent(ev.content)}
                        </div>

                        {/* AI 분석 근거 */}
                        {ev.LLM_reference && (
                          <>
                            <div className='border-t border-border/50'></div>
                            {renderSectionHeader("🤖", "AI 분석 근거")}
                            <div className='bg-muted/80 p-3 rounded'>
                              {renderSafeContent(
                                ev.LLM_reference,
                                "▸",
                                "-ml-0"
                              )}
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
