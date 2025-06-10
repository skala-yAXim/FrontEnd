export const dynamic = "force-dynamic";

// TODO: 리팩토링 (use client 남발, 더미 데이터 사용)

import PageHeader from "@/components/PageHeader";
import GitIntegrationClientSection from "./_components/GitIntegrationClientSection";
import UserInfoSection from "./_components/UserInfoSection";

// 더미 사용자 데이터 (실제 사용 시에는 API 호출 등을 통해 가져옵니다)
const dummyUser = {
  id: "1",
  name: "홍길동",
  email: "hong@example.com",
  roles: ["developer"], // UserInfoSectionProps에 맞게 필요시 사용
};

/**
 * 마이페이지 메인 컴포넌트 (서버 컴포넌트)
 * 사용자 정보와 Git 연동 섹션을 표시합니다.
 * @returns {JSX.Element}
 */
export default function ProfilePage() {
  // 실제 애플리케이션에서는 API를 통해 사용자 정보를 가져옵니다.
  // 예: const user = await fetchUser();
  const user = dummyUser;

  // Git 연동 관련 상태 및 핸들러는 GitIntegrationClientSection으로 이동

  return (
    <div className='w-full'>
      <PageHeader title='개인 정보' />

      {/* 개인 정보 섹션 */}
      {/* user 객체에 roles가 있다면 UserInfoSectionProps에 맞게 전달하거나, UserInfoSection 내부에서 처리 */}
      <UserInfoSection />

      {/* Git 연동 섹션 (클라이언트 컴포넌트) */}
      <GitIntegrationClientSection />
    </div>
  );
}
