"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const handleMicrosoftLogin = () => {
    console.log("Microsoft 로그인");
    // Microsoft OAuth 로직
  };

  return (
    <div className="min-h-screen flex">
      {/* 테마 토글 */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* 좌측 브랜딩 영역 */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 to-orange-500 dark:from-red-600 dark:to-orange-500 items-center justify-center p-12">
        <div className="text-center text-white">
          <div className="mb-8">
            {/* X 로고 */}
            <div className="w-32 h-32 mx-auto bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <svg
                className="w-16 h-16 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">yAXim</h1>
          <p className="text-xl opacity-90 mb-8">
            현대적이고 안전한 플랫폼에 오신 것을 환영합니다
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>보안 강화된 인증 시스템</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>직관적인 사용자 경험</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>다크모드 완벽 지원</span>
            </div>
          </div>
        </div>
      </div>

      {/* 우측 로그인 폼 */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* 헤더 */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              로그인
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Microsoft 계정으로 로그인하십시오
            </p>
          </div>

          {/* 소셜 로그인 버튼들 */}
          <div className="space-y-3">
            <Button
              onClick={handleMicrosoftLogin}
              variant="outline"
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                <rect x="12" y="1" width="9" height="9" fill="#00a4ef" />
                <rect x="1" y="12" width="9" height="9" fill="#ffb900" />
                <rect x="12" y="12" width="9" height="9" fill="#7fba00" />
              </svg>
              Sign in with Microsoft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
