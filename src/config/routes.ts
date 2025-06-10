// config/routes.ts
import { ROLE_LEADER, ROLE_MEMBER } from "@/const/role";
import { UserRole } from "@/types/userType"; // UserRole 타입 import

export interface RouteConfig {
  path: string;
  name: string;
  icon?: string; // lucide-react 아이콘 이름
  roles: UserRole[]; // 'MEMBER' | 'LEADER' | 'ADMIN' | null
  viewType: "MEMBER_MENU" | "LEADER_MENU"; // MEMBER용, LEADER 전용 메뉴 구분
}

// sidebarRoutes를 export하고 빈 배열로 초기화하여 'sidebarRoutes' 없음 오류를 해결합니다.
export const sidebarRoutes: RouteConfig[] = [
  // MEMBER 및 LEADER 공통 메뉴 (또는 MEMBER 주력 메뉴)
  {
    path: "/dashboard",
    name: "대시보드",
    icon: "Home", // lucide-react 아이콘 이름 (예: "Home")
    roles: [ROLE_MEMBER, ROLE_LEADER],
    viewType: "MEMBER_MENU",
  },
  {
    path: "/daily",
    name: "데일리 보고서",
    icon: "FileText", // 예시
    roles: [ROLE_MEMBER, ROLE_LEADER],
    viewType: "MEMBER_MENU",
  },
  {
    path: "/weekly",
    name: "위클리 보고서",
    icon: "FileText", // 예시
    roles: [ROLE_MEMBER, ROLE_LEADER],
    viewType: "MEMBER_MENU",
  },
  {
    path: "/mypage",
    name: "마이페이지",
    icon: "UserCircle", // 예시
    roles: [ROLE_MEMBER, ROLE_LEADER],
    viewType: "MEMBER_MENU",
  },

  // LEADER 전용 추가 메뉴
  {
    path: "/team-dashboard",
    name: "팀 대시보드",
    icon: "LayoutDashboard", // 예시
    roles: [ROLE_LEADER],
    viewType: "LEADER_MENU",
  },
  {
    path: "/team-weekly",
    name: "팀 위클리",
    icon: "FolderKanban", // 예시
    roles: [ROLE_LEADER],
    viewType: "LEADER_MENU",
  },
  {
    path: "/manager-weekly",
    name: "매니저 위클리",
    icon: "FolderKanban", // 예시
    roles: [ROLE_LEADER],
    viewType: "LEADER_MENU",
  },
  {
    path: "/project-management",
    name: "프로젝트 관리",
    icon: "Settings", // 예시
    roles: [ROLE_LEADER],
    viewType: "LEADER_MENU",
  },
];
