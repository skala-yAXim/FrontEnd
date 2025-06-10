import {
  TypographyH3,
  TypographyList,
  TypographyP,
} from "@/components/typography/Typograhpy";

interface ReflectionSectionProps {
  reflections: string[];
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
      <TypographyH3>오늘의 회고 및 개선점</TypographyH3>
      <TypographyList>
        {reflections.map((item, idx) => (
          <li key={idx}>
            <TypographyP>{formatBoldText(item)}</TypographyP>
          </li>
        ))}
      </TypographyList>
    </section>
  );
}
