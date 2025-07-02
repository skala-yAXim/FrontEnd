import { TypographyP } from "@/components/typography/Typograhpy";
import { NextWeekSchedule } from "@/types/weeklyReportType";
import { formatBoldText } from "@/utils/formatBoldText";

interface NextWeekScheduleSectionProps {
  schedules: NextWeekSchedule[];
}

/**
 * 다음 주 일정 섹션 컴포넌트
 * 서버 컴포넌트 - 정적 일정 내용 표시
 */
export default function NextWeekScheduleSection({
  schedules,
}: NextWeekScheduleSectionProps) {
  if (!schedules || schedules.length === 0) {
    return (
      <div className='text-center py-4'>
        <TypographyP className='text-muted-foreground italic'>
          차주 계획이 없습니다.
        </TypographyP>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <ul className='list-disc pl-6 space-y-4'>
        {schedules.map((schedule, idx) => (
          <li key={idx} className='mb-4'>
            <div className='space-y-2'>
              {/* 작업명과 날짜 */}
              <div className='flex items-baseline gap-2 flex-wrap'>
                <TypographyP className='font-medium'>
                  {schedule.task_name}
                </TypographyP>
                <span className='text-sm text-muted-foreground'>
                  ({schedule.start_date} ~ {schedule.end_date})
                </span>
              </div>

              {/* 설명을 글머리 기호로 표시 */}
              {schedule.description && (
                <div className='pl-4 relative mt-2'>
                  <span className='absolute left-0 top-1 text-xs'>-</span>
                  <TypographyP className='text-sm font-medium text-foreground leading-relaxed'>
                    {formatBoldText(schedule.description)}
                  </TypographyP>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
