import {
  TypographyList,
  TypographyP,
} from "@/components/typography/Typograhpy";
import { formatBoldText } from "@/utils/formatBoldText";

interface ReflectionSectionProps {
  content: string[];
}

/**
 * 회고 섹션 컴포넌트
 * 서버 컴포넌트 - 정적 회고 내용 표시
 */
export function ReflectionSection({ content }: ReflectionSectionProps) {
  // 빈 데이터 처리
  if (!content || content.length === 0) {
    return (
      <div className='text-center py-4'>
        <TypographyP className='text-muted-foreground italic'>
          주간 회고 내용이 없습니다.
        </TypographyP>
      </div>
    );
  }

  return (
    <div className='space-y-2'>
      <TypographyList>
        <ul className='list-disc'>
          {content.map((item, idx) => (
            <li key={idx} className='mb-3'>
              <TypographyP>{formatBoldText(item)}</TypographyP>
            </li>
          ))}
        </ul>
      </TypographyList>
    </div>
  );
}
