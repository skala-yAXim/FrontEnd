"use client";

import {
  Command,
  FileText,
  FolderKanban,
  // routes.ts 및 정적 UI에 필요한 아이콘들
  Home,
  LayoutDashboard,
  Minus,
  Settings,
  UserCircle,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

// Store 및 Config import
import { RouteConfig, sidebarRoutes } from "@/config/routes";
import { AuthState, useAuthStore } from "@/store/authStore";

// Nav 컴포넌트 import (정의는 사용자 프로젝트 내에 있다고 가정)
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
// import { NavUser } from "@/components/nav-user"; // UserDisplay로 대체

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// ScrollArea는 SidebarContent 내부에서 자체적으로 처리될 수 있으므로 여기서는 직접 사용하지 않음
// 만약 NavMain 등이 자체 스크롤을 지원하지 않으면 SidebarContent에 ScrollArea를 다시 적용해야 할 수 있음

// 아이콘 매핑
const iconMap: { [key: string]: LucideIcon } = {
  Home,
  FileText,
  UserCircle,
  LayoutDashboard,
  FolderKanban,
  Settings,
  Command,
  // Minus는 직접 사용하므로 map에 없어도 됨
};

// Footer 사용자 표시 컴포넌트 (기존 NavUser 대체)
const UserFooterDisplay = () => {
  const userRole = useAuthStore((state: AuthState) => state.userRole);
  // AuthState에 email 또는 name이 있다면 가져와서 사용 가능
  // const userEmail = useAuthStore((state: AuthState) => state.email);

  if (!userRole) {
    // 로그인하지 않았거나 역할을 아직 모를 경우 (예: 로딩 중)
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className="w-full justify-start">
            <UserCircle className="mr-2 size-4" />
            로그인 필요
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const displayName =
    userRole === "LEADER"
      ? "팀장님"
      : userRole === "MEMBER"
        ? "팀원님"
        : userRole;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="w-full">
          <div className="bg-muted text-muted-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <UserCircle className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {/* 실제 사용자 이름이 있다면 표시, 여기서는 displayName 사용 */}
              {displayName}
            </span>
            <span className="truncate text-xs capitalize">
              {userRole.toLowerCase()}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

// Helper function to convert RouteConfig to NavMain item format
const convertRoutesToNavItems = (routes: RouteConfig[], pathname: string) => {
  return routes.map(route => {
    const IconComponent: LucideIcon | undefined = route.icon
      ? iconMap[route.icon]
      : undefined;
    const resolvedIcon: LucideIcon = IconComponent || Minus; // Fallback icon
    return {
      title: route.name,
      url: route.path,
      icon: resolvedIcon,
      isActive: pathname === route.path,
      items: [], // Assuming no sub-items for now
    };
  });
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userRole = useAuthStore((state: AuthState) => state.userRole);
  const pathname = usePathname();

  let memberMenuItems: any[] = [];
  let leaderMenuItems: any[] = [];

  if (userRole) {
    // userRole이 null이 아닐 때만 메뉴 필터링 실행
    // Filter MEMBER routes (visible to both MEMBER and LEADER)
    const memberAccessibleRoutes = sidebarRoutes.filter(
      // userRole이 null이 아님을 보장하므로 || "" 제거
      route =>
        route.viewType === "MEMBER_MENU" && route.roles.includes(userRole)
    );
    memberMenuItems = convertRoutesToNavItems(memberAccessibleRoutes, pathname);

    // Filter LEADER-specific routes (visible only to LEADER)
    if (userRole === "LEADER") {
      const leaderSpecificRoutes = sidebarRoutes.filter(
        route =>
          route.viewType === "LEADER_MENU" && route.roles.includes("LEADER")
      );
      leaderMenuItems = convertRoutesToNavItems(leaderSpecificRoutes, pathname);
    }
  } else {
    // userRole이 null이거나 로딩 중일 때 (옵션: 로딩 상태 표시 또는 빈 메뉴)
    // memberMenuItems와 leaderMenuItems는 이미 빈 배열로 초기화되어 있음
  }

  const navProjectsItems: any[] = [];
  const navSecondaryItems: any[] = [];

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">주간 보고서</span>
                  <span className="truncate text-xs">메인</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={memberMenuItems} groupLabel="개인 메뉴" />
        {userRole === "LEADER" && (
          <NavMain items={leaderMenuItems} groupLabel="팀장 메뉴" />
        )}
        <NavProjects projects={navProjectsItems} />
        <NavSecondary items={navSecondaryItems} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <UserFooterDisplay />
      </SidebarFooter>
    </Sidebar>
  );
}
