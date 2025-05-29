"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: Props) {
  useEffect(() => {
    // 페이지 로드 시 다크모드 클래스 강제 확인
    const checkTheme = () => {
      const theme = localStorage.getItem("theme");
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (
        theme === "dark" ||
        (theme === "system" && systemDark) ||
        (!theme && systemDark)
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    checkTheme();
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="theme"
      forcedTheme={undefined}
    >
      {children}
    </NextThemesProvider>
  );
}
