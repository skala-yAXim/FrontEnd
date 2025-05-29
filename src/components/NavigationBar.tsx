import Link from "next/link";

export function NavigationBar() {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            {/* 로고 */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                yAXim
              </span>
            </Link>
            
            {/* 메뉴 */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                홈
              </Link>
              
              <Link
                href="/daily-reports"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>📅</span>
                <span>Daily 보고서</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
