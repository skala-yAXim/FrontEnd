export function BrandingSection() {
  return (
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
          SK AX 보고서 자동 생성 플랫폼에 오신 것을 환영합니다
        </p>
        <div className="space-y-4 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span>강력한 보안의 Microsoft Teams 인증 시스템</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span>개인 데일리 보고서 자동 생성</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span>위클리 보고서 팀별 자동 관리</span>
          </div>
        </div>
      </div>
    </div>
  );
}
