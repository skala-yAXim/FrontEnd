import {
  TypographyH3,
  TypographyList,
  TypographyP,
} from "@/components/typography/Typograhpy";

interface ReflectionSectionProps {
  reflections: {
    title: string;
    content: string[];
  };
}

/**
 * 회고 섹션 컴포넌트
 * 서버 컴포넌트 - 정적 회고 내용 표시
 */
export function ReflectionSection({ reflections }: ReflectionSectionProps) {
  return (
    <section className='space-y-2 p-6'>
      <TypographyH3>{reflections.title}</TypographyH3>
      <TypographyList>
        <ul>
          {reflections.content.map((item, idx) => (
            <li key={idx} className='list-disc pl-4 mb-2'>
              <TypographyP>{item}</TypographyP>
            </li>
          ))}
        </ul>
      </TypographyList>
    </section>
  );
}
