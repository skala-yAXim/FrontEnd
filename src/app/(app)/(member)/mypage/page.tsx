export const dynamic = "force-dynamic";

import { AnimatedItem, AnimatedLayout } from "@/components/AnimatedLayout";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import GitIntegrationClientSection from "./_components/GitIntegrationClientSection";
import UserInfoSection from "./_components/UserInfoSection";

export default function ProfilePage() {
  return (
    <div className='w-full space-y-6'>
      <AnimatedLayout>
        <AnimatedItem>
          <PageHeader
            title='개인 정보'
            description='계정 정보 및 연동 서비스를 관리합니다'
          />
        </AnimatedItem>

        <div className='flex flex-col gap-6 px-6'>
          {/* 사용자 정보 섹션 */}
          <AnimatedItem>
            <Card className='lg:col-span-1 border-0 shadow-md bg-gradient-to-br from-card to-card/80 backdrop-blur-sm'>
              <div className='px-6 py-4 border-b'>
                <h2 className='text-xl font-semibold'>프로필 정보</h2>
              </div>
              <UserInfoSection />
            </Card>
          </AnimatedItem>

          {/* Git 연동 섹션 */}
          <AnimatedItem>
            <Card className='lg:col-span-2 border-0 shadow-md bg-gradient-to-br from-card to-card/80 backdrop-blur-sm'>
              <GitIntegrationClientSection />
            </Card>
          </AnimatedItem>
        </div>
      </AnimatedLayout>
    </div>
  );
}
