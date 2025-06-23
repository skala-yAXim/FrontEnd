import { TypographyP } from "@/components/typography/Typograhpy";
import { NextWeekSchedule } from "@/types/weeklyReportType";

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
  return (
    <div className='space-y-4'>
      <ul className='list-disc pl-6'>
        {schedules.map((schedule, idx) => (
          <li key={idx} className='mb-4'>
            <div className='space-y-1'>
              <div className='flex items-baseline'>
                <TypographyP className='font-medium'>
                  {schedule.task_name}
                </TypographyP>
                <span className='text-sm text-muted-foreground ml-2'>
                  ({schedule.start_date} ~ {schedule.end_date})
                </span>
              </div>

              {schedule.description && (
                <p className='text-sm text-muted-foreground pl-2'>
                  {schedule.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
