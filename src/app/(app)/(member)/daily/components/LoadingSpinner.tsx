export function LoadingSpinner() {
  return (
    <div className='flex flex-col items-center justify-center py-16'>
      <div className='relative'>
        <div className='w-12 h-12 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin'>
          <div className='absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
        </div>
      </div>

      <p className='mt-4 text-gray-600 dark:text-gray-400'>
        데일리 보고서를 불러오는 중...
      </p>
    </div>
  );
}
