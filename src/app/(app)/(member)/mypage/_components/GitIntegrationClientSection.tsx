"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Github,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";

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
  const [gitIntegration, setGitIntegration] = useState<GitIntegration>({
    isConnected: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 마운트 시 GitHub 연동 상태 확인
  useEffect(() => {
    const fetchGitStatus = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 백엔드의 연동 상태 확인 API 호출 (실제 엔드포인트로 수정 필요)
        const response = await fetch("/api/user/git-integration-status"); // 예시 API 경로
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.message || "연동 상태를 가져오는데 실패했습니다."
          );
        }
        const data: GitIntegration = await response.json();
        setGitIntegration(data);
        if (data.isConnected) {
          // 성공 메시지는 여기서 직접 설정하기보다,
          // OAuth 콜백 성공 후 리디렉션 시 쿼리 파라미터 등으로 전달받는 것이 일반적입니다.
          // setSuccess("GitHub 계정이 성공적으로 연동되어 있습니다.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
        // 연동 정보가 없는 경우 (e.g. 404)는 에러가 아닐 수 있으므로, API 응답에 따라 처리
        setGitIntegration({ isConnected: false });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitStatus();
  }, []);

  // Git OAuth 연동 시작 핸들러
  const handleGitConnect = async () => {
    setIsProcessing(true);
    setError(null);
    setSuccess(null);
    // 백엔드의 GitHub 로그인 시작 API 엔드포인트로 리디렉션
    // 실제로는 환경변수 등을 통해 백엔드 URL을 관리하는 것이 좋습니다.
    window.location.href = "/api/auth/github/login"; // 예시 API 경로
    // setIsProcessing(false)는 페이지가 리디렉션되므로 보통 필요 없습니다.
    // 오류 발생 시를 대비한다면 try-catch로 감싸고 setIsProcessing(false)를 finally에 넣을 수 있습니다.
  };

  // Git 연동 해제 핸들러
  const handleGitDisconnect = async () => {
    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      // 백엔드의 연동 해제 API 호출 (실제 엔드포인트로 수정 필요)
      const response = await fetch("/api/user/git-disconnect", {
        // 예시 API 경로
        method: "POST", // 또는 적절한 HTTP 메소드
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "연동 해제에 실패했습니다.");
      }

      setGitIntegration({
        isConnected: false,
        username: undefined,
        avatar: undefined,
        connectedAt: undefined,
      });
      setSuccess("GitHub 연동이 성공적으로 해제되었습니다.");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("연동 해제 중 알 수 없는 오류가 발생했습니다.");
      }
      console.error("Git disconnect error:", err);
    } finally {
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
                      // 이미지 로드 실패 시 기본 아이콘 표시 (플레이스홀더 사용)
                      const target = e.currentTarget as HTMLImageElement;
                      target.onerror = null; // 무한 루프 방지
                      target.src =
                        "https://via.placeholder.com/40/cccccc/969696?text=GH"; // 간단한 플레이스홀더
                    }}
                  />
                )}
                {!gitIntegration.avatar && (
                  <div className='w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center'>
                    <Github className='w-5 h-5 text-muted-foreground' />
                  </div>
                )}
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
