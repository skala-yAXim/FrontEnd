"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteGitHubInfo, useGetGitHubInfo } from "@/hooks/useGitHubInfo";
import {
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Github,
  Settings,
} from "lucide-react";
import { useState } from "react";

// Git OAuth 상태 타입
interface GitIntegration {
  isConnected: boolean;
  username?: string;
  avatar?: string;
  connectedAt?: string;
}

/**
 * GitHub 연동 상태를 관리하고 관련 UI를 렌더링하는 클라이언트 컴포넌트입니다.
 * @returns {JSX.Element}
 */
export default function GitIntegrationClientSection() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { data: gitInfo, isLoading, isError } = useGetGitHubInfo();
  const { mutate: deleteGitHubInfo, isPending: isDeleting } =
    useDeleteGitHubInfo();

  // Git OAuth 연동 시작 핸들러
  const handleGitConnect = async () => {
    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      window.location.href = `${process.env.NEXT_PUBLIC_SERVER_CLIENT_SIDE_URL}/oauth2/authorization/github`;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("GitHub 연동 중 오류가 발생했습니다.");
      }
      setIsProcessing(false);
    }
  };

  // Git 연동 해제 핸들러
  const handleGitDisconnect = async () => {
    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      deleteGitHubInfo(undefined, {
        onSuccess: () => {
          setSuccess("GitHub 연동이 성공적으로 해제되었습니다.");
        },
        onError: error => {
          setError(error.message || "연동 해제에 실패했습니다.");
        },
        onSettled: () => {
          setIsProcessing(false);
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("연동 해제 중 알 수 없는 오류가 발생했습니다.");
      }
      setIsProcessing(false);
    }
  };

  // 로딩 중 UI
  if (isLoading) {
    return (
      <div>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Github className='w-5 h-5' />
            GitHub 연동
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-center p-8'>
            <Settings className='w-8 h-8 animate-spin text-muted-foreground' />
            <p className='ml-2 text-muted-foreground'>
              연동 정보를 불러오는 중입니다...
            </p>
          </div>
        </CardContent>
      </div>
    );
  }

  // 에러 발생 시 UI
  if (isError) {
    return (
      <div>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Github className='w-5 h-5' />
            GitHub 연동
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant='destructive'>
            <AlertCircle className='h-4 w-4' />
            <AlertDescription>
              GitHub 연동 정보를 불러오는데 실패했습니다.
            </AlertDescription>
          </Alert>
        </CardContent>
      </div>
    );
  }

  return (
    <div>
      {/* 성공/에러 메시지 */}
      {success && (
        <Alert className='mb-4'>
          <CheckCircle className='h-4 w-4' />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant='destructive' className='mb-4'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Git 연동 카드 */}
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Github className='w-5 h-5' />
          GitHub 연동
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {gitInfo?.connected ? (
          /* 연동됨 상태 */
          <div className='space-y-4'>
            <div className='flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800'>
              <div className='flex items-center gap-3'>
                {gitInfo.avatarUrl && (
                  <img
                    src={gitInfo.avatarUrl}
                    alt='GitHub Avatar'
                    className='w-10 h-10 rounded-full'
                    onError={e => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.onerror = null;
                      target.src =
                        "https://via.placeholder.com/40/cccccc/969696?text=GH";
                    }}
                  />
                )}
                {!gitInfo.avatarUrl && (
                  <div className='w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center'>
                    <Github className='w-5 h-5 text-muted-foreground' />
                  </div>
                )}
                <div>
                  <div className='flex items-center gap-2'>
                    <p className='font-medium'>@{gitInfo.gitId}</p>
                    <Badge
                      variant='secondary'
                      className='bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                    >
                      <CheckCircle className='w-3 h-3 mr-1' />
                      연동됨
                    </Badge>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {gitInfo.createdAt &&
                      `${new Date(gitInfo.createdAt).toLocaleDateString("ko-KR")} 연동`}
                  </p>
                </div>
              </div>

              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  window.open(`https://github.com/${gitInfo.gitId}`, "_blank")
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
                disabled={isProcessing}
                className='text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-900/20'
              >
                {isProcessing ? "처리 중..." : "연동 해제"}
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
              disabled={isProcessing}
              className='w-full flex items-center gap-2 bg-[#24292e] hover:bg-[#1b1f23] text-white'
            >
              <Github className='w-4 h-4' />
              {isProcessing ? "연동 페이지로 이동 중..." : "GitHub 연동하기"}
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
  );
}
