import { CardContent } from "@/components/ui/card";
import { serverHttpInterface } from "@/lib/api/server/interface";
import { Mail, User } from "lucide-react";
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
      <CardContent>
        <p>정보를 불러오는 중 오류가 발생했습니다.</p>
        {error instanceof Error && (
          <p className='text-sm text-red-500'>Details: {error.message}</p>
        )}
      </CardContent>
    );
  }

  // 데이터가 없거나 (예: API가 204 반환 후 serverFetch가 undefined 반환)
  // 또는 data 객체는 있지만 name, email 필드가 없는 경우 등 상세한 조건 추가 가능
  if (!data || !data.name || !data.email) {
    return (
      <CardContent>
        <p>사용자 데이터를 표시할 수 없습니다.</p>
      </CardContent>
    );
  }

  return (
    <div>
      <CardContent className='space-y-4 py-4'>
        <div className='flex items-center justify-between py-3 border-b'>
          <div className='flex items-center gap-3'>
            <User className='w-4 h-4 text-muted-foreground' />
            <div>
              <p className='font-medium'>이름</p>
              <p className='text-sm text-muted-foreground'>{data.name}</p>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between py-3'>
          <div className='flex items-center gap-3'>
            <Mail className='w-4 h-4 text-muted-foreground' />
            <div>
              <p className='font-medium'>이메일</p>
              <p className='text-sm text-muted-foreground'>{data.email}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
