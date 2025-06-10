"use client";

import {
  Command,
  FileText,
  FolderKanban,
  Home,
  LayoutDashboard,
  LogOut,
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

// Nav 컴포넌트 import
import { NavMain } from "@/components/sidebar/NavMain";

// Avatar 컴포넌트 import
// DropdownMenu 컴포넌트 import
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { SidebarFooterDisplay } from "./SidebarFooterDisplay"; // 새로 추가

// 아이콘 매핑
const iconMap: { [key: string]: LucideIcon } = {
  Home,
  FileText,
  UserCircle,
  LayoutDashboard,
  FolderKanban,
  Settings,
  Command,
  LogOut,
};

// Helper function to convert RouteConfig to NavMain item format
const convertRoutesToNavItems = (routes: RouteConfig[], pathname: string) => {
  return routes.map(route => {
    const IconComponent: LucideIcon | undefined = route.icon
      ? iconMap[route.icon]
      : undefined;
    const resolvedIcon: LucideIcon = IconComponent || Minus; // Fallback icon
    const isActive = pathname === route.path;
    return {
      title: route.name,
      url: route.path,
      icon: resolvedIcon,
      isActive: isActive,
      disabled: isActive,
      items: [], // Assuming no sub-items for now
    };
  });
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userRole = useAuthStore((state: AuthState) => state.user?.userRole);
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

  return (
    <Sidebar variant='inset' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href='/dashboard'>
                {/* <div className='text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'> */}
                <Image
                  src='/favicon.png'
                  alt='SK Logo'
                  className='rounded-sm'
                  width={30}
                  height={30}
                />
                {/* </div> */}
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>yAXim</span>
                  <span className='truncate text-xs'>
                    사내 주간 보고서 자동 생성 서비스
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={memberMenuItems} groupLabel='개인 메뉴' />
        {userRole === "LEADER" && (
          <NavMain items={leaderMenuItems} groupLabel='팀장 메뉴' />
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarFooterDisplay />
      </SidebarFooter>
    </Sidebar>
  );
}
