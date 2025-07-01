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
import {
  formatBoldText as formatBoldTextNew,
  formatToReadableList,
} from "@/utils/formatReadableText";
import { getSourceIcon } from "@/utils/getSourceIcon";

interface ReportContentProps {
  contents: ReportItem[];
}

// [WBS 매칭], [WBS 미매칭] 텍스트를 제거하는 함수
const removeWbsPrefix = (text: string) => {
  return text.replace("[WBS 매칭]", "").replace("[WBS 미매칭]", "");
};

const renderSafeContent = (
  content: any,
  bulletSymbol: string = "•",
  marginClass: string = ""
) => {
  if (!content) {
    return (
      <p className='text-sm text-muted-foreground italic'>내용이 없습니다.</p>
    );
  }

  const contentStr = String(content).trim();
  if (!contentStr) {
    return (
      <p className='text-sm text-muted-foreground italic'>
        내용이 비어있습니다.
      </p>
    );
  }

  const formattedItems = formatToReadableList(contentStr);

  if (formattedItems.length == 0) {
    return (
      <p className='text-sm text-muted-foreground leading-relaxed'>
        {formatBoldTextNew(contentStr)}
      </p>
    );
  }

  return (
    <div className={`text-sm text-muted-foreground space-y-2 ${marginClass}`}>
      {formattedItems.map((item, idx) => (
        <div key={idx} className='pl-4 relative leading-relaxed'>
          <span className='absolute left-0 top-1 text-xs'>{bulletSymbol}</span>
          <span>{formatBoldTextNew(item)}</span>
        </div>
      ))}
    </div>
  );
};

// 섹션 헤더 렌더링 헬퍼 함수
const renderSectionHeader = (
  icon: string,
  title: string,
  subtitle?: string
) => (
  <div className='flex items-start gap-3'>
    <div className='mt-0.5 w-6 h-6 flex items-center justify-center flex-shrink-0 text-base'>
      {icon}
    </div>
    <div className='flex-1'>
      <p className='font-semibold text-popover-foreground mb-1'>{title}</p>
      {subtitle && <p className='text-sm text-muted-foreground'>{subtitle}</p>}
    </div>
  </div>
);

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
                <span className='text-l font-bold'>
                  {formatBoldText(removeWbsPrefix(item.text))}
                </span>
                {item.task && (
                  <span className='text-muted-foreground font-medium text-sm'>
                    <span>Matched Task: </span>
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
                  <TooltipContent
                    side='right'
                    sideOffset={40}
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
                      {ev.llm_reference && (
                        <>
                          <div className='border-t border-border/50'></div>
                          {renderSectionHeader("🤖", "AI 분석 근거")}
                          <div className='bg-muted/80 p-3 rounded'>
                            {renderSafeContent(ev.llm_reference, "▸", "-ml-0")}
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
    <section className='bg-transparent'>
      <div className='max-w-4xl mx-auto px-8 py-8'>
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
              <div className='bg-muted/10 border border-border/50 rounded-lg px-4'>
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
