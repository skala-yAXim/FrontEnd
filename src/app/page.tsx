import { ModeToggle } from "@/components/ModeToggleButton";

export default function Home() {
  return (
    <main className='min-h-screen p-8'>
      <div className='absolute top-4 right-4'>
        <ModeToggle />
      </div>

      <div className='max-w-4xl mx-auto mt-16'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-4'>Hello, Next.js!</h1>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            다크모드가 적용된 간단하고 깔끔한 시작 페이지입니다.
          </p>
        </div>

        <div className='space-y-6'>
          {/* 메인 카드 */}
          <div className='p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700'>
            <h2 className='text-xl font-semibold mb-3'>다크모드 예시</h2>
            <p className='text-gray-600 dark:text-gray-300 mb-4'>
              우측 상단의 버튼을 클릭해서 다크모드를 토글해보세요!
            </p>

            <div className='p-3 bg-gray-100 dark:bg-gray-700 rounded'>
              <p className='text-sm'>
                💡 이 카드는 라이트/다크 모드에 따라 색상이 자동으로 변경됩니다.
              </p>
            </div>
          </div>

          {/* 컬러 테스트 카드들 */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700'>
              <h3 className='font-semibold text-blue-800 dark:text-blue-200 mb-2'>
                파란색 테마
              </h3>
              <p className='text-blue-600 dark:text-blue-300 text-sm'>
                브랜드 컬러나 주요 액센트에 활용
              </p>
            </div>

            <div className='p-4 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700'>
              <h3 className='font-semibold text-green-800 dark:text-green-200 mb-2'>
                초록색 테마
              </h3>
              <p className='text-green-600 dark:text-green-300 text-sm'>
                성공 메시지나 긍정적인 상태 표시
              </p>
            </div>

            <div className='p-4 bg-purple-50 dark:bg-purple-900 rounded-lg border border-purple-200 dark:border-purple-700'>
              <h3 className='font-semibold text-purple-800 dark:text-purple-200 mb-2'>
                보라색 테마
              </h3>
              <p className='text-purple-600 dark:text-purple-300 text-sm'>
                프리미엄 기능이나 특별한 콘텐츠
              </p>
            </div>
          </div>

          {/* UI 컴포넌트 예시 */}
          <div className='p-6 bg-gray-50 dark:bg-gray-800 rounded-lg'>
            <h3 className='text-lg font-semibold mb-4'>UI 컴포넌트 예시</h3>

            <div className='space-y-4'>
              <div className='flex space-x-3'>
                <button className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors'>
                  Primary Button
                </button>
                <button className='px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors'>
                  Secondary Button
                </button>
              </div>

              <div className='p-4 border border-gray-300 dark:border-gray-600 rounded'>
                <h4 className='font-medium mb-2'>알림 박스</h4>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  이런 식으로 알림이나 정보를 표시할 수 있습니다.
                </p>
              </div>

              <div className='flex space-x-2'>
                <span className='px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-xs'>
                  중요
                </span>
                <span className='px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs'>
                  주의
                </span>
                <span className='px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs'>
                  완료
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
