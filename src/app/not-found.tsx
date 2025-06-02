// app/not-found.js

import { GoBackButton } from "@/components/ui/GoBackButton"; // 경로 확인
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // ShadCN UI 경로 확인

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background p-4'>
      <Card className='w-full max-w-md text-center'>
        <CardHeader>
          <CardTitle className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
            404
          </CardTitle>
          <CardDescription className='mt-2 text-lg text-muted-foreground'>
            페이지를 찾을 수 없습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            요청하신 페이지가 존재하지 않거나, 다른 주소로 이동했을 수 있습니다.
            URL을 다시 한번 확인해주세요.
          </p>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <GoBackButton />
        </CardFooter>
      </Card>
    </div>
  );
}
