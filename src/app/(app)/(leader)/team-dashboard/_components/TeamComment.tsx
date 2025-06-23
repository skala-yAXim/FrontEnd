import SplitText from "@/components/typography/SplitText";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCommentTeam } from "@/hooks/useTeamDashboardQueries";

export default function TeamComment() {
  const { data, isLoading, isError } = useGetCommentTeam();

  console.log(data);

  if (isLoading) {
    return (
      <Card className='border-1 overflow-hidden shadow-none'>
        <CardHeader>
          <Skeleton className='h-8 w-full mb-2' />
        </CardHeader>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className='border-1 overflow-hidden shadow-none'>
        <CardHeader>
          <p className='text-2xl font-semibold text-center'>
            데이터를 불러오는데 문제가 발생했습니다
          </p>
        </CardHeader>
      </Card>
    );
  }

  const comment = data ? data.comment : "아직 팀의 Weekly 한줄평이 없어요";

  return (
    <Card className='border-1 overflow-hidden shadow-none w-full'>
      <CardHeader>
        <SplitText
          text={comment}
          className='text-2xl font-semibold'
          delay={100}
          duration={0.6}
          ease='power3.out'
          splitType='chars'
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin='-100px'
          textAlign='center'
        />
      </CardHeader>
    </Card>
  );
}
