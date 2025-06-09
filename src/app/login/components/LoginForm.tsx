"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  const handleMicrosoftLogin = () => {
    // Microsoft OAuth 로직
    router.push(
      `${process.env.NEXT_PUBLIC_SERVER_CLIENT_SIDE_URL}/oauth2/authorization/azure`
    );
  };

  return (
    <div className='flex-1 flex items-center justify-center p-8'>
      <div className='w-full max-w-md space-y-8'>
        {/* 헤더 */}
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-black dark:text-white'>
            로그인
          </h1>
          <p className='mt-2 text-gray-600 dark:text-gray-400'>
            Microsoft 계정으로 로그인하십시오
          </p>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <div className='space-y-3'>
          <Button
            onClick={handleMicrosoftLogin}
            variant='outline'
            className='w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
          >
            <svg className='w-5 h-5 mr-3' viewBox='0 0 21 21'>
              <rect x='1' y='1' width='9' height='9' fill='#f25022' />
              <rect x='12' y='1' width='9' height='9' fill='#00a4ef' />
              <rect x='1' y='12' width='9' height='9' fill='#ffb900' />
              <rect x='12' y='12' width='9' height='9' fill='#7fba00' />
            </svg>
            Sign in with Microsoft
          </Button>
        </div>
      </div>
    </div>
  );
}
