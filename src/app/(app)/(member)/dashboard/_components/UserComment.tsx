import SplitText from "@/components/typography/SplitText";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCommentUser } from "@/hooks/useDashboardQueries";

export default function UserComment() {
  const { data, isLoading, isError } = useGetCommentUser();

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

  return (
    <div className='flex flex-col py-10 items-center justify-center'>
      <SplitText
        text={comment}
        className='text-3xl font-semibold'
        delay={70}
        duration={0.4}
        ease='power3.out'
        splitType='chars'
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin='-100px'
        textAlign='center'
      />
    </div>
  );
}
