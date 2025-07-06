import SplitText from "@/components/typography/SplitText";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetCommentUser,
  useGetStaticsTerm,
} from "@/hooks/useDashboardQueries";
import { format, isValid } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

export default function UserComment() {
  const { data, isLoading, isError } = useGetCommentUser();
  const {
    data: staticsTerm,
    isLoading: staticsTermLoading,
    isError: staticsTermError,
  } = useGetStaticsTerm();

  // const staticsTerm = {
  //   startDate: "2025-06-29",
  //   endDate: "2025-07-05",
  // };

  if (isLoading) {
    return (
      <div className='flex flex-col py-10 items-center justify-center'>
        <Skeleton className='h-12 w-3/4 mb-2' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex flex-col py-10 items-center justify-center'>
        <p className='text-3xl font-semibold text-center text-destructive'>
          데이터를 불러오는데 문제가 발생했습니다
        </p>
      </div>
    );
  }

  const comment = data ? data.comment : "아직 오늘의 한줄평이 없어요";

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (!isValid(date)) return dateString;

    return format(date, "yyyy년 MM월 dd일", { locale: ko });
  };

  return (
    <div className='flex flex-col py-10 px-4 lg:px-6'>
      <div className='flex flex-col gap-2 mb-2'>
        <p className='text-sm text-muted-foreground'>오늘의 한줄평</p>
      </div>
      <SplitText
        text={comment}
        className='text-xl font-semibold mb-6'
        delay={70}
        duration={0.4}
        ease='power3.out'
        splitType='chars'
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin='-100px'
        textAlign='left'
      />
      <div className='flex items-center gap-2 rounded-md'>
        <CalendarIcon className='h-4 w-4 text-primary' />
        <p className='text-sm font-medium'>
          {staticsTerm ? (
            <>
              <span>{formatDate(staticsTerm.startDate)}</span>
              <span className='mx-2'>~</span>
              <span>{formatDate(staticsTerm.endDate)}</span>
            </>
          ) : (
            "기간 정보 없음"
          )}
        </p>
      </div>
    </div>
  );
}
