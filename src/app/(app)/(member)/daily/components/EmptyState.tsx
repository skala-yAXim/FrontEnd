/**
 * 설계서 제약사항: "아직 생성된 데일리 보고서가 없습니다." 예외 문구 표시
 */
export function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="mb-6">
        <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <span className="text-4xl">📝</span>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        아직 생성된 데일리 보고서가 없습니다.
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        첫 번째 데일리 보고서를 작성해서 업무 진행 상황을 기록해보세요.
      </p>
      
      <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center space-x-2">
        <span>✏️</span>
        <span>첫 보고서 작성하기</span>
      </button>
    </div>
  );
}
