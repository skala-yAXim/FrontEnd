"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/ModeToggleButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AuthState, useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userRole = useAuthStore((state: AuthState) => state.userRole);
  const isAuthenticated = useAuthStore(
    (state: AuthState) => state.isAuthenticated
  );
  const isLoadingAuth = useAuthStore((state: AuthState) => state.isLoading);
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingAuth && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoadingAuth, isAuthenticated, router]);

  if (isLoadingAuth) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p>Loading authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (userRole === undefined || userRole === null) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p>Loading user role...</p>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        {/* 헤더 */}
        <header className='flex h-16 shrink-0 items-center border-b'>
          <div className='flex h-full w-full items-center justify-between px-4'>
            {/* 왼쪽 요소 그룹 */}
            <div className='flex items-center gap-2'>
              <SidebarTrigger className='-ml-1' />
              <Separator
                orientation='vertical'
                className='mr-2 data-[orientation=vertical]:h-4'
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className='hidden md:block'>
                    <BreadcrumbLink href='#'>
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className='hidden md:block' />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* 오른쪽 요소 그룹 (다크모드 버튼) */}
            <div className='flex items-center'>
              <ModeToggle />
            </div>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>
          <main className='flex flex-1 flex-col bg-muted/30 dark:bg-muted/50 rounded-2xl'>
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
