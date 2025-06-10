"use client";

import { Button } from "@/components/ui/button"; // ShadCN 버튼 경로에 맞게 수정해주세요.
import { useRouter } from "next/navigation";

/**
 * @returns {JSX.Element} 이전 페이지로 돌아가는 버튼을 렌더링합니다.
 */
export function GoBackButton() {
  const router = useRouter();

  /**
   * 이전 페이지로 이동합니다.
   * @returns {void}
   */
  const handleGoBack = () => {
    try {
      router.back();
    } catch (error) {
      console.error("이전 페이지로 돌아가는 중 에러 발생:", error);
      // 사용자를 홈페이지로 리디렉션하는 등의 대체 동작을 추가할 수 있습니다.
      router.push("/");
    }
  };

  return (
    <Button onClick={handleGoBack} variant='outline'>
      이전 페이지로 돌아가기
    </Button>
  );
}
