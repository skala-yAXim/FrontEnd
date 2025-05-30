// TODO: 리팩토링 (use client 남발, 더미 데이터 사용)
"use client";

import PageHeader from "@/components/PageHeader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Github,
  Mail,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";

// 더미 사용자 데이터
const dummyUser = {
  id: "1",
  name: "홍길동",
  email: "hong@example.com",
  roles: ["developer"],
};

// Git OAuth 상태 타입
interface GitIntegration {
  isConnected: boolean;
  username?: string;
  avatar?: string;
  connectedAt?: string;
}

export default function ProfilePage() {
  // 더미 데이터 사용
  const user = dummyUser;

  const [gitIntegration, setGitIntegration] = useState<GitIntegration>({
    isConnected: false, // 기본값: 연동 안됨
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Git OAuth 연동 핸들러
  const handleGitConnect = async () => {
    setIsConnecting(true);
    setError(null);
    setSuccess(null);

    try {
      // 데모용 연동 처리 (2초 대기)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 연동 성공으로 처리
      setGitIntegration({
        isConnected: true,
        username: "hong-gildong",
        avatar: "https://github.com/hong-gildong.png",
        connectedAt: new Date().toISOString(),
      });
      setSuccess("GitHub 계정이 성공적으로 연동되었습니다.");
    } catch (error) {
      setError("Git 연동에 실패했습니다.");
    } finally {
      setIsConnecting(false);
    }
  };

  // Git 연동 해제 핸들러
  const handleGitDisconnect = async () => {
    setIsConnecting(true);
    setError(null);
    setSuccess(null);

    try {
      // 데모용 해제 처리 (1초 대기)
      await new Promise(resolve => setTimeout(resolve, 1000));

      setGitIntegration({
        isConnected: false,
      });
      setSuccess("GitHub 연동이 해제되었습니다.");
    } catch (error) {
      setError("연동 해제에 실패했습니다.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className='w-full'>
      <PageHeader title='개인 정보' />
      {/* 성공/에러 메시지 */}
      {success && (
        <Alert>
          <CheckCircle className='h-4 w-4' />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 개인 정보 카드 */}

      <div>
        <CardContent className='space-y-4'>
          {/* 이름 */}
          <div className='flex items-center justify-between py-3 border-b'>
            <div className='flex items-center gap-3'>
              <User className='w-4 h-4 text-muted-foreground' />
              <div>
                <p className='font-medium'>이름</p>
                <p className='text-sm text-muted-foreground'>{user.name}</p>
              </div>
            </div>
          </div>

          {/* 이메일 */}
          <div className='flex items-center justify-between py-3'>
            <div className='flex items-center gap-3'>
              <Mail className='w-4 h-4 text-muted-foreground' />
              <div>
                <p className='font-medium'>이메일</p>
                <p className='text-sm text-muted-foreground'>{user.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Git 연동 카드 */}
      <div>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Github className='w-5 h-5' />
            GitHub 연동
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {gitIntegration.isConnected ? (
            /* 연동됨 상태 */
            <div className='space-y-4'>
              <div className='flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800'>
                <div className='flex items-center gap-3'>
                  {gitIntegration.avatar && (
                    <img
                      src={gitIntegration.avatar}
                      alt='GitHub Avatar'
                      className='w-10 h-10 rounded-full'
                      onError={e => {
                        // 이미지 로드 실패 시 기본 아이콘으로 대체
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  <div className='w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center'>
                    <Github className='w-5 h-5 text-muted-foreground' />
                  </div>
                  <div>
                    <div className='flex items-center gap-2'>
                      <p className='font-medium'>@{gitIntegration.username}</p>
                      <Badge
                        variant='secondary'
                        className='bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                      >
                        <CheckCircle className='w-3 h-3 mr-1' />
                        연동됨
                      </Badge>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {gitIntegration.connectedAt &&
                        `${new Date(gitIntegration.connectedAt).toLocaleDateString("ko-KR")} 연동`}
                    </p>
                  </div>
                </div>

                <Button
                  variant='outline'
                  size='sm'
                  onClick={() =>
                    window.open(
                      `https://github.com/${gitIntegration.username}`,
                      "_blank"
                    )
                  }
                >
                  <ExternalLink className='w-4 h-4 mr-2' />
                  GitHub 보기
                </Button>
              </div>

              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  onClick={handleGitDisconnect}
                  disabled={isConnecting}
                  className='text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-900/20'
                >
                  {isConnecting ? "연동 해제 중..." : "연동 해제"}
                </Button>
              </div>
            </div>
          ) : (
            /* 연동 안됨 상태 */
            <div className='space-y-4'>
              <div className='p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg border'>
                <div className='flex items-center gap-3 mb-2'>
                  <Github className='w-5 h-5 text-muted-foreground' />
                  <p className='font-medium'>GitHub 연동이 필요합니다</p>
                </div>
                <p className='text-sm text-muted-foreground'>
                  위클리 보고서 생성을 위해 GitHub 계정을 연동해주세요. 코드
                  기여도, 커밋 내역 등을 분석하여 더 정확한 보고서를 생성할 수
                  있습니다.
                </p>
              </div>

              <Button
                onClick={handleGitConnect}
                disabled={isConnecting}
                className='w-full flex items-center gap-2 bg-[#24292e] hover:bg-[#1b1f23] text-white'
              >
                <Github className='w-4 h-4' />
                {isConnecting ? "GitHub 연동 중..." : "GitHub 연동하기"}
              </Button>
            </div>
          )}

          {/* 연동 안내 */}
          <div className='text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg'>
            <div className='flex items-start gap-2'>
              <Settings className='w-4 h-4 mt-0.5 flex-shrink-0' />
              <div>
                <p className='font-medium mb-1'>연동 시 제공되는 기능:</p>
                <ul className='space-y-1'>
                  <li>• 커밋 기록 기반 업무 활동 분석</li>
                  <li>• Pull Request 및 Issue 활동 요약</li>
                  <li>• 코드 기여도 통계</li>
                  <li>• 프로젝트별 활동 분석</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
