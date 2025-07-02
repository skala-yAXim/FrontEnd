"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AuthState, useAuthStore } from "@/store/authStore";
import { ChevronsUpDown, LogOut, UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Footer 사용자 표시 컴포넌트
export const SidebarFooterDisplay = () => {
  const user = useAuthStore((state: AuthState) => state.user);
  const router = useRouter();

  if (!user || !user.userRole) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className='w-full justify-start' asChild>
            <Link href='/login'>
              <UserCircle className='mr-2 size-4' />
              로그인 필요
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='w-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='mr-2 size-8 rounded-lg'>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name || "User"}`}
                  alt={user.name || "User"}
                />
                <AvatarFallback className='rounded-lg bg-gradient-to-br from-primary/80 to-primary/40 text-white font-bold'>
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>
                  {user.name || "사용자 이름"}
                </span>
                <span className='truncate text-xs'>
                  {user.email || "사용자 이메일"}
                </span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[calc(var(--radix-dropdown-menu-trigger-width)-8px)] min-w-56 rounded-lg'
            side='right'
            align='end'
            sideOffset={8}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-2 py-1.5 text-left text-sm'>
                <Avatar className='size-8 rounded-lg'>
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name || "User"}`}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback className='rounded-lg bg-gradient-to-br from-primary/80 to-primary/40 text-white font-bold'>
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>
                    {user.name || "사용자 이름"}
                  </span>
                  <span className='truncate text-xs'>
                    {user.email || "사용자 이메일"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href='/mypage'>
                  <UserCircle className='mr-2 size-4' />
                  마이페이지
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                useAuthStore.getState().logout();
                router.push("/login");
              }}
            >
              <LogOut className='mr-2 size-4' />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
