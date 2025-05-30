// app/(app)/(leader)/project-management/page.tsx
import PageHeader from "@/components/PageHeader";

export default function ProjectManagementPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="프로젝트 관리"
        description="환영합니다! 여기는 Project Management 페이지입니다."
      />
    </div>
  );
}
