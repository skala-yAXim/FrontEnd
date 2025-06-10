import { Card, CardContent, CardTitle } from "@/components/ui/card";

/**
 * 설계서 제약사항: "아직 생성된 데일리 보고서가 없습니다." 예외 문구 표시
 * 서버 컴포넌트 - 상태가 없고 정적인 UI
 */
export function EmptyState() {
  return (
    <Card>
      <CardContent className='flex flex-col items-center justify-center py-16'>
        <div className='text-6xl mb-4'>📝</div>
        <CardTitle className='mb-2'>
          아직 생성된 데일리 보고서가 없습니다.
        </CardTitle>
        <p className='text-muted-foreground mb-6 text-center max-w-md'>
          데일리 보고서는 자동으로 생성됩니다. 잠시 후 다시 확인해보세요.
        </p>
      </CardContent>
    </Card>
  );
}
