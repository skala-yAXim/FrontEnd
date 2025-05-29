"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      console.log(
        "Theme changed: Current theme:",
        theme,
        "Resolved theme:",
        resolvedTheme
      );
      // next-themes가 HTML 클래스를 관리하므로 수동 조작 코드는 제거합니다.
    }
  }, [theme, resolvedTheme, mounted]);

  if (!mounted) {
    return (
      <div className="h-12 w-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md" />
    );
  }

  const handleToggle = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    console.log("Switching to:", newTheme);
  };

  return (
    <button
      onClick={handleToggle}
      className="relative inline-flex h-12 w-12 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      aria-label={`현재 테마: ${resolvedTheme}, 클릭하여 변경`}
      title={`현재: ${resolvedTheme === "dark" ? "다크" : "라이트"} 모드`}
    >
      {/* 태양 아이콘 (라이트 모드) */}
      <svg
        className={`h-6 w-6 transition-all duration-300 ${
          resolvedTheme === "dark"
            ? "scale-0 -rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* 달 아이콘 (다크 모드) */}
      <svg
        className={`absolute h-6 w-6 transition-all duration-300 ${
          resolvedTheme === "dark"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-90 opacity-0"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}
