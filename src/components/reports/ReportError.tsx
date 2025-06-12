import Link from "next/link";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";

export function ReportError({ error, href }: { error: string; href: string }) {
  return (
    <div className='p-6'>
      <Alert variant='destructive'>
        <AlertDescription>
          <div className='flex items-center justify-between'>
            <span>😵 {error}</span>
            <Link href={href}>
              <Button variant='outline' size='sm'>
                목록으로 돌아가기
              </Button>
            </Link>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}

export function ReportNotFound({ href }: { href: string }) {
  return (
    <div className='p-6'>
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-16'>
          <div className='text-6xl mb-4'>📄</div>
          <CardTitle className='mb-2'>보고서를 찾을 수 없습니다</CardTitle>
          <p className='text-muted-foreground mb-6 text-center'>
            요청하신 보고서가 존재하지 않거나 삭제되었습니다.
          </p>
          <Link href={href}>
            <Button>목록으로 돌아가기</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
