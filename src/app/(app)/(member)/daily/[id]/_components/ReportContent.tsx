"use client";

import { TypographyP } from "@/components/typography/Typograhpy";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReportItem } from "@/types/dailyReport";
import { Github } from "lucide-react";

interface ReportContentProps {
  contents: ReportItem[];
}

const getStatusIcon = (text: string) => {
  if (text.includes("완료")) return "✅";
  if (text.includes("진행 중")) return "🟡";
  return "⚠️";
};

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
  return (
    <section className='space-y-4 p-6'>
      {contents.map((item, idx) => (
        <div key={idx}>
          <div className='space-y-2'>
            <span aria-label={item.text}>{getStatusIcon(item.text)}</span>
            <div className='text-base font-semibold'>
              <TypographyP className='inline'>
                {formatBoldText(item.text)}
              </TypographyP>
              {item.evidence.map((ev, i) => (
                <TooltipProvider key={i}>
                  <Tooltip>
                    <TooltipTrigger className='inline-block ml-1'>
                      <Badge
                        variant='outline'
                        className='text-muted-foreground text-sm cursor-pointer'
                      >
                        <Github className='w-4 h-4' />
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className='max-w-lg bg-muted text-sm px-4 py-3'>
                      <div className='space-y-3'>
                        {/* 출처 섹션 */}
                        <div className='flex items-start gap-2'>
                          <div className='text-blue-500 mt-0.5'>📋</div>
                          <div>
                            <p className='font-semibold text-foreground'>
                              출처
                            </p>
                            <p className='text-sm text-muted-foreground'>
                              {ev.title}
                            </p>
                          </div>
                        </div>

                        {/* 구분선 */}
                        <div className='border-t border-border/50'></div>

                        {/* 내용 섹션 */}
                        <div className='flex items-start gap-2'>
                          <div className='text-green-500 mt-0.5'>💬</div>
                          <div>
                            <p className='font-semibold text-foreground mb-1'>
                              내용
                            </p>
                            <p className='text-sm leading-relaxed'>
                              {ev.content}
                            </p>
                          </div>
                        </div>

                        {/* LLM 참조 섹션 */}
                        {ev.LLM_reference && (
                          <>
                            <div className='border-t border-border/50'></div>
                            <div className='flex items-center gap-2'>
                              <div className='text-purple-500'>🤖</div>
                              <p className='text-xs text-muted-foreground italic'>
                                {ev.LLM_reference}
                              </p>
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
      ))}
    </section>
  );
}
