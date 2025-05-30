// app/(app)/(leader)/team-dashboard/page.tsx
import PageHeader from "@/components/PageHeader";

export default function TeamDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="팀 대시보드"
        description="환영합니다! 여기는 Team Dashboard 페이지입니다."
      />
    </div>
  );
}
