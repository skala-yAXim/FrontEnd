// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // 전역 스타일

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "yAXim | 사내 주간 보고서 자동 생성 서비스",
  description: "사내 주간 보고서 자동 생성 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
