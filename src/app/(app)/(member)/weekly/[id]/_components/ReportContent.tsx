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
          {/* 메인 업무 내용 */}
          <div className='text-base'>
            {formatBoldText(item.text)}
            {/* 텍스트 바로 뒤에 공백 없이 툴팁 뱃지들 */}
            {item.evidence && item.evidence.length > 0 && (
              <>
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
                        className='bg-popover border border-border shadow-lg text-sm px-4 py-4 max-w-md'
                      >
                        <div className='space-y-4'>
                          {/* WBS 매칭 작업 섹션 (task가 있을 때만) */}
                          {item.task && (
                            <div className='space-y-2'>
                              <h4 className='font-semibold text-popover-foreground text-sm flex items-center gap-2'>
                                <span className='w-4 h-4 flex items-center justify-center text-sm flex-shrink-0'>
                                  ✅
                                </span>
                                WBS 매칭 작업
                              </h4>
                              <div className='pl-4 relative'>
                                <span className='absolute left-0 top-1 text-xs text-foreground'>
                                  •
                                </span>
                                <p className='text-sm text-foreground leading-relaxed'>
                                  {item.task}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* 구분선 (WBS 섹션이 있을 때만) */}
                          {item.task && (
                            <div className='border-t border-border/30'></div>
                          )}

                          {/* 출처 섹션 */}
                          <div className='space-y-2'>
                            <h4 className='font-semibold text-popover-foreground text-sm flex items-center gap-2'>
                              <span className='w-4 h-4 flex items-center justify-center text-sm flex-shrink-0'>
                                {getSourceIcon(ev.source as Source)}
                              </span>
                              출처
                            </h4>
                            {ev.title && (
                              <div className='pl-4 relative'>
                                <span className='absolute left-0 top-1 text-xs text-foreground'>
                                  •
                                </span>
                                <p className='text-sm text-foreground leading-relaxed'>
                                  {ev.title}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className='border-t border-border/30'></div>

                          {/* 상세 활동 섹션 */}
                          <div className='space-y-2'>
                            <h4 className='font-semibold text-popover-foreground text-sm flex items-center gap-2'>
                              <span className='w-4 h-4 flex items-center justify-center text-sm flex-shrink-0'>
                                📋
                              </span>
                              상세 활동
                            </h4>
                            {Array.isArray(ev.detailed_activities) &&
                            ev.detailed_activities.length > 0 ? (
                              <div className='space-y-2'>
                                {ev.detailed_activities.map(
                                  (activity, activityIdx) => (
                                    <div
                                      key={activityIdx}
                                      className='pl-4 relative'
                                    >
                                      <span className='absolute left-0 top-1 text-xs text-foreground'>
                                        •
                                      </span>
                                      <p className='text-sm text-foreground leading-relaxed'>
                                        {formatBoldText(activity)}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            ) : (
                              <div className='pl-4 relative'>
                                <span className='absolute left-0 top-1 text-xs text-foreground'>
                                  •
                                </span>
                                <p className='text-sm text-foreground leading-relaxed'>
                                  상세 활동 내용이 제공되지 않았습니다.
                                </p>
                              </div>
                            )}
                          </div>

                          <div className='border-t border-border/30'></div>

                          {/* AI 분석 근거 섹션 */}
                          <div className='space-y-2'>
                            <h4 className='font-semibold text-popover-foreground text-sm flex items-center gap-2'>
                              <span className='w-4 h-4 flex items-center justify-center text-sm flex-shrink-0'>
                                🤖
                              </span>
                              AI 분석 근거
                            </h4>
                            {ev.llm_reference && ev.llm_reference.trim() ? (
                              <div className='pl-4 relative'>
                                <span className='absolute left-0 top-1 text-xs text-foreground'>
                                  •
                                </span>
                                <div className='text-sm text-foreground leading-relaxed'>
                                  {ev.llm_reference}
                                </div>
                              </div>
                            ) : (
                              <div className='pl-4 relative'>
                                <span className='absolute left-0 top-1 text-xs text-foreground'>
                                  •
                                </span>
                                <p className='text-sm text-foreground leading-relaxed'>
                                  AI 분석 근거가 제공되지 않았습니다.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </>
            )}
          </div>
        </div>
      </li>
    ));
  };

  return (
    <div className='mt-6'>
      <h4 className='text-lg font-semibold text-foreground mb-4'>주요 활동</h4>
      <ul className='pl-6 space-y-2'>{renderReportItems(contents)}</ul>
    </div>
  );
}
