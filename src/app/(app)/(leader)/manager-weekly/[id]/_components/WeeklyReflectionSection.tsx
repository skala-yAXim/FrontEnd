"use client";

import {
  TypographyH3,
  TypographyList,
  TypographyP,
} from "@/components/typography/Typograhpy";
import { WeeklyReflection } from "@/types/reportType";

interface WeeklyReflectionSectionProps {
  reflections: WeeklyReflection;
}

/**
 * 회고 섹션 컴포넌트
 * 서버 컴포넌트 - 정적 회고 내용 표시
 */
export function WeeklyReflectionSection({
  reflections,
}: WeeklyReflectionSectionProps) {
  console.log(reflections);

  return (
    <section className='space-y-2 p-6'>
      <TypographyH3>{reflections.title}</TypographyH3>
      <TypographyList>
        {reflections.content.map((item, idx) => (
          <div key={idx} className='flex items-start gap-2 mb-2'>
            <TypographyP>{item}</TypographyP>
          </div>
        ))}
      </TypographyList>
    </section>
  );
}
