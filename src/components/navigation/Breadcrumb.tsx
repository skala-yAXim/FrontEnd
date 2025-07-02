"use client";

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumb as BreadcrumbUI,
} from "@/components/ui/breadcrumb";
import { useGetDailyReport } from "@/hooks/useUserDailyQueries";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

// 최상위 경로 목록
const TOP_LEVEL_PATHS = ["/dashboard", "/weekly", "/daily", "/mypage"];

// 경로에 대한 커스텀 레이블 정의
const PATH_LABELS: Record<string, string> = {
  "/dashboard": "대시보드",
  "/weekly": "위클리 보고서",
  "/daily": "데일리 보고서",
  "/mypage": "마이페이지",
  "/settings": "설정",
  "/users": "사용자 관리",
  "/products": "제품 관리",
  "/reports": "보고서",
  "/analytics": "분석",
  "/profile": "프로필",
};

export function Breadcrumb() {
  const pathname = usePathname();

  // daily 경로의 ID 추출
  const dailyIdMatch = pathname.match(/\/daily\/(\d+)$/);
  const dailyId = dailyIdMatch ? Number(dailyIdMatch[1]) : null;

  // ID가 있으면 데이터 가져오기
  const { data: reportData } = useGetDailyReport(dailyId!);

  // 현재 경로에서 Breadcrumb 생성
  const breadcrumbs = useMemo(() => {
    // 앱 레이아웃의 기본 경로 제거 후 경로 분할
    const pathWithoutApp = pathname.replace(/^\/(\(app\))?/, "");
    const segments = pathWithoutApp.split("/").filter(Boolean);

    // 경로가 비어 있는 경우
    if (segments.length === 0) {
      return [
        {
          href: "/dashboard",
          label: PATH_LABELS["/dashboard"] || "대시보드",
          isCurrentPage: true,
        },
      ];
    }

    // 첫 번째 세그먼트 경로 (최상위 경로)
    const firstSegment = `/${segments[0]}`;
    const isTopLevel = TOP_LEVEL_PATHS.includes(firstSegment);

    // 첫 번째 세그먼트가 최상위 경로에 포함되는 경우
    if (isTopLevel) {
      // 첫 번째 세그먼트만 있는 경우 (최상위 페이지에 있는 경우)
      if (segments.length === 1) {
        return [
          {
            href: firstSegment,
            label: PATH_LABELS[firstSegment] || segments[0],
            isCurrentPage: true,
          },
        ];
      }

      // 최상위 경로 이하의 하위 경로가 있는 경우
      const items = [
        {
          href: firstSegment,
          label: PATH_LABELS[firstSegment] || segments[0],
          isCurrentPage: false,
        },
      ];

      // 나머지 세그먼트에 대한 breadcrumb 항목 생성
      let currentPath = firstSegment;
      for (let i = 1; i < segments.length; i++) {
        const segment = segments[i];
        currentPath += `/${segment}`;
        const isCurrentPage = i === segments.length - 1;

        // 커스텀 레이블이 있으면 사용, 없으면 세그먼트를 변환하여 사용
        const customLabel = PATH_LABELS[currentPath];

        // daily 경로의 ID인 경우 처리
        let displayLabel = customLabel;
        if (!customLabel) {
          if (firstSegment === "/daily" && /^\d+$/.test(segment)) {
            // 실제 날짜가 있으면 포맷된 날짜 사용, 없으면 기본값
            if (reportData?.date) {
              displayLabel = new Date(reportData.date)
                .toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .replace(/\s/g, ""); // "2025. 6. 4." 형태
            } else {
              displayLabel = "보고서 상세";
            }
          } else {
            const formattedSegment = segment
              .replace(/-/g, " ")
              .split(" ")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
            displayLabel = formattedSegment;
          }
        }

        items.push({
          href: currentPath,
          label: displayLabel,
          isCurrentPage,
        });
      }

      return items;
    }
    // 최상위 경로가 아닌 다른 경로인 경우 (기본적으로 대시보드를 최상위로 설정)
    else {
      const items = [
        {
          href: "/dashboard",
          label: PATH_LABELS["/dashboard"] || "대시보드",
          isCurrentPage: false,
        },
      ];

      // 모든 세그먼트에 대한 breadcrumb 항목 생성
      let currentPath = "";
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        currentPath += `/${segment}`;
        const isCurrentPage = i === segments.length - 1;

        // 커스텀 레이블이 있으면 사용, 없으면 세그먼트를 변환하여 사용
        const customLabel = PATH_LABELS[currentPath];

        // daily 경로의 ID인 경우 처리
        let displayLabel = customLabel;
        if (!customLabel) {
          if (currentPath.includes("/daily/") && /^\d+$/.test(segment)) {
            // 실제 날짜가 있으면 포맷된 날짜 사용, 없으면 기본값
            if (reportData?.date) {
              displayLabel = new Date(reportData.date)
                .toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .replace(/\s/g, ""); // "2025. 6. 4." 형태
            } else {
              displayLabel = "보고서 상세";
            }
          } else {
            const formattedSegment = segment
              .replace(/-/g, " ")
              .split(" ")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
            displayLabel = formattedSegment;
          }
        }

        items.push({
          href: currentPath,
          label: displayLabel,
          isCurrentPage,
        });
      }

      return items;
    }
  }, [pathname, reportData]); // reportData 의존성 추가

  // 모바일에서는 마지막 항목만, 데스크톱에서는 모든 항목 표시
  const displayedBreadcrumbs = useMemo(() => {
    if (breadcrumbs.length <= 2) return breadcrumbs;

    // 모바일 화면에서는 첫 항목과 마지막 항목만 표시
    const mobileItems = [
      breadcrumbs[0],
      {
        href: "#",
        label: "...",
        isCurrentPage: false,
        isEllipsis: true,
        icon: null,
      },
      breadcrumbs[breadcrumbs.length - 1],
    ];

    return mobileItems;
  }, [breadcrumbs]);

  return (
    <BreadcrumbUI>
      <BreadcrumbList>
        {/* 모바일 뷰 */}
        <div className='md:hidden flex items-center'>
          {displayedBreadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.href + index}>
              <BreadcrumbItem>
                {breadcrumb.isCurrentPage ? (
                  <BreadcrumbPage className='flex items-center gap-1'>
                    {breadcrumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={breadcrumb.href}
                    className='flex items-center gap-1'
                  >
                    {breadcrumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < displayedBreadcrumbs.length - 1 && (
                <BreadcrumbSeparator>
                  <ChevronRight className='h-4 w-4' />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 데스크톱 뷰 */}
        <div className='hidden md:flex items-center'>
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.href}>
              <BreadcrumbItem>
                {breadcrumb.isCurrentPage ? (
                  <BreadcrumbPage className='flex items-center gap-1'>
                    {breadcrumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={breadcrumb.href}
                    className='flex items-center gap-1'
                  >
                    {breadcrumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator>
                  <ChevronRight className='h-4 w-4' />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </div>
      </BreadcrumbList>
    </BreadcrumbUI>
  );
}
