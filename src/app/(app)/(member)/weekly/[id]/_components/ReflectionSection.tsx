import {
  TypographyList,
  TypographyP,
} from "@/components/typography/Typograhpy";

interface ReflectionSectionProps {
  content: string[];
}

/**
 * 회고 섹션 컴포넌트
 * 서버 컴포넌트 - 정적 회고 내용 표시
 */
export function ReflectionSection({ content }: ReflectionSectionProps) {
  return (
    <div className='space-y-2'>
      <TypographyList>
        <ul className='list-disc'>
          {content.map((item, idx) => (
            <li key={idx} className='mb-3'>
              <TypographyP>{item}</TypographyP>
            </li>
          ))}
        </ul>
      </TypographyList>
    </div>
  );
}
