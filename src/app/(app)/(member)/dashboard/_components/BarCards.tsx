import { Button } from "@/components/ui/button";
import {
  Card,
  //   CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardAction } from "@/components/ui/card-action";
import { ChartBarStacked } from "./chart/BarChart";
import { ChartBarMultiple } from "./chart/MultipleBarChart";

export function BarCards() {
  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      <div className='col-span-2'>
        <ChartBarStacked />
      </div>
      <div className='col-span-2'>
        <ChartBarMultiple />
      </div>
    </div>
  );
}

// 사용 예시 (기존 코드에 맞게 조정하세요)
export function ExampleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>카드 제목</CardTitle>
        <CardDescription>카드 설명 텍스트입니다.</CardDescription>
      </CardHeader>
      <CardAction>
        <Button variant='outline' size='sm'>
          취소
        </Button>
        <Button size='sm'>확인</Button>
      </CardAction>
      <CardFooter>
        <p>카드 푸터 영역입니다.</p>
      </CardFooter>
    </Card>
  );
}
