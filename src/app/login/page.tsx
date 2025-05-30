import { ThemeToggle } from "@/components/theme-toggle";
import { BrandingSection } from "./components/BrandingSection";
import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className='min-h-screen flex'>
      {/* 테마 토글 */}
      <div className='absolute top-4 right-4'>
        <ThemeToggle />
      </div>

      {/* 좌측 브랜딩 영역 */}
      <BrandingSection />

      {/* 우측 로그인 폼 */}
      <LoginForm />
    </div>
  );
}
