import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";
import { serverHttpInterface } from "@/lib/api/server/interface";
import { Calendar, Mail, User } from "lucide-react";
import React from "react";

export const dynamic = "force-dynamic";

interface UserInfo {
  name: string;
  email: string;
  // 백엔드 API 응답에 따른 추가 필드 정의
}

/**
 * 사용자 프로필 정보(이름, 이메일)를 서버에서 직접 가져와 표시하는 서버 컴포넌트입니다.
 * 내부적으로 serverHttpInterface를 사용하여 쿠키와 함께 백엔드 API를 직접 호출합니다.
 * @returns {Promise<React.ReactElement>}
 */

export default async function UserInfoSection(): Promise<React.ReactElement> {
  let data: UserInfo | undefined;

  try {
    data = await serverHttpInterface.getMyInfo();
  } catch (error) {
    console.error("UserInfoSection: Error fetching user info:", error);
    return (
      <CardContent className='p-6'>
        <div className='flex flex-col items-center gap-4 p-6 bg-red-50/50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800/30'>
          <div className='w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center'>
            <User className='w-6 h-6 text-red-500' />
          </div>
          <div className='text-center'>
            <p className='font-medium text-red-600 dark:text-red-400'>
              정보를 불러오는 중 오류가 발생했습니다.
            </p>
            {error instanceof Error && (
              <p className='text-sm text-red-500 mt-1'>
                Details: {error.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    );
  }

  // 데이터가 없거나 (예: API가 204 반환 후 serverFetch가 undefined 반환)
  // 또는 data 객체는 있지만 name, email 필드가 없는 경우 등 상세한 조건 추가 가능
  if (!data || !data.name || !data.email) {
    return (
      <CardContent className='p-6'>
        <div className='flex flex-col items-center gap-4 p-6 bg-amber-50/50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-800/30'>
          <div className='w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center'>
            <User className='w-6 h-6 text-amber-500' />
          </div>
          <p className='font-medium text-amber-600 dark:text-amber-400'>
            사용자 데이터를 표시할 수 없습니다.
          </p>
        </div>
      </CardContent>
    );
  }

  // 사용자 이니셜 생성 (이름의 첫 글자)
  const initials = data.name.charAt(0).toUpperCase();

  return (
    <CardContent className='p-6'>
      <div className='flex flex-col items-center mb-6'>
        <Avatar className='w-24 h-24 border-4 border-background shadow-lg mb-4'>
          <AvatarImage
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${data.name}`}
            alt={data.name}
          />
          <AvatarFallback className='text-2xl font-bold bg-gradient-to-br from-primary/80 to-primary/40'>
            {initials}
          </AvatarFallback>
        </Avatar>
        <h3 className='text-xl font-bold'>{data.name}</h3>
        <p className='text-sm text-muted-foreground'>{data.email}</p>
      </div>

      <div className='space-y-4'>
        <div className='flex items-center gap-3 p-3 rounded-lg transition-colors'>
          <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
            <User className='w-5 h-5 text-primary' />
          </div>
          <div>
            <p className='text-sm text-muted-foreground'>이름</p>
            <p className='font-medium'>{data.name}</p>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-3 p-3 rounded-lg transition-colors'>
        <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
          <Mail className='w-5 h-5 text-primary' />
        </div>
        <div>
          <p className='text-sm text-muted-foreground'>이메일</p>
          <p className='font-medium'>{data.email}</p>
        </div>
      </div>

      <div className='flex items-center gap-3 p-3 rounded-lg transition-colors'>
        <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
          <Calendar className='w-5 h-5 text-primary' />
        </div>
        <div>
          <p className='text-sm text-muted-foreground'>가입일</p>
          <p className='font-medium'>
            {new Date().toLocaleDateString("ko-KR")}
          </p>
        </div>
      </div>
    </CardContent>
  );
}
