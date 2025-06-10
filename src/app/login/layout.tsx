import LoginLayoutClient from "./LoginLayoutClient";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 서버 컴포넌트에서는 쿠키를 읽는 등의 로직은 유지할 수 있으나,
  // authStore의 상태를 직접 사용한 리디렉션은 클라이언트 컴포넌트에서 처리합니다.
  // 여기서는 LoginLayoutClient에게 children을 전달하는 역할만 합니다.
  return <LoginLayoutClient>{children}</LoginLayoutClient>;
}
