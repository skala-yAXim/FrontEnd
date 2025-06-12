import {
  TypographyH3,
  TypographyList,
  TypographyP,
} from "@/components/typography/Typograhpy";
import { Reflection } from "@/types/reportType";
import { getSourceIcon } from "@/utils/getSourceIcon";

interface ReflectionSectionProps {
  reflections: Reflection;
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
 * 회고 섹션 컴포넌트
 * 서버 컴포넌트 - 정적 회고 내용 표시
 */
export function ReflectionSection({ reflections }: ReflectionSectionProps) {
  return (
    <section className='space-y-2 p-6'>
      <TypographyH3>{reflections.title}</TypographyH3>
      <TypographyList>
        {reflections.contents.map((item, idx) => (
          <div key={idx} className='flex items-start gap-2 mb-2'>
            <div className='text-muted-foreground flex-shrink-0 mt-2 mr-1'>
              {getSourceIcon(item.source)}
            </div>
            <TypographyP>{item.reflection}</TypographyP>
          </div>
        ))}
      </TypographyList>
    </section>
  );
}
