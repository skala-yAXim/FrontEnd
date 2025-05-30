// TODO: API 연동 필요 (프로젝트 목록, 프로젝트 삭제)
"use client";

import PageHeader from "@/components/PageHeader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  Plus,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

// 프로젝트 인터페이스
interface Project {
  id: string;
  name: string;
  description: string;
  status: "진행중" | "완료" | "대기" | "중단";
  startDate: string;
  endDate: string;
  teamMembers: string[];
  progress: number;
}

// 더미 프로젝트 데이터 생성
const generateDummyProjects = (): Project[] => {
  const projects: Project[] = [];
  const statuses: ("진행중" | "완료" | "대기" | "중단")[] = [
    "진행중",
    "완료",
    "대기",
    "중단",
  ];
  const projectNames = [
    "사용자 인증 시스템 개발",
    "모바일 앱 UI/UX 개선",
    "데이터베이스 최적화",
    "API 서버 구축",
    "웹사이트 리뉴얼",
    "보안 강화 프로젝트",
    "성능 모니터링 시스템",
    "고객 지원 시스템",
    "결제 시스템 통합",
    "검색 엔진 최적화",
    "소셜 로그인 연동",
    "푸시 알림 시스템",
    "파일 업로드 기능",
    "실시간 채팅 시스템",
    "관리자 대시보드",
  ];

  for (let i = 0; i < 25; i++) {
    const startMonth = (i % 6) + 1; // 고정된 값 사용
    const duration = (i % 4) + 1; // 고정된 값 사용
    const endMonth = Math.min(startMonth + duration, 12);

    projects.push({
      id: `project-${i + 1}`,
      name: projectNames[i % projectNames.length],
      description: `${projectNames[i % projectNames.length]}에 대한 상세 설명입니다.`,
      status: statuses[i % statuses.length], // 고정된 패턴 사용
      startDate: `2025-${startMonth.toString().padStart(2, "0")}-01`,
      endDate: `2025-${endMonth.toString().padStart(2, "0")}-28`,
      teamMembers: ["김개발", "이기획", "박디자인"].slice(0, (i % 3) + 1), // 고정된 패턴
      progress: (i * 4) % 101, // 고정된 진행률
    });
  }

  return projects.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
};

const dummyProjects = generateDummyProjects();

// 상태별 색상
const getStatusColor = (status: string): string => {
  switch (status) {
    case "진행중":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "완료":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "대기":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    case "중단":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

export default function ProjectManagementPage() {
  const router = useRouter();

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const totalItems = dummyProjects.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedProjects = dummyProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 삭제 확인 상태
  const [projectToDelete, setProjectToDelete] = React.useState<string | null>(
    null
  );

  // 프로젝트 추가 핸들러
  const handleAddProject = () => {
    // TODO: 프로젝트 등록 페이지(LDR04M02)로 이동
    console.log("프로젝트 추가 페이지로 이동");
    router.push("/project-management/create");
  };

  // 프로젝트 삭제 요청
  const handleDeleteRequest = (projectId: string) => {
    setProjectToDelete(projectId);
  };

  // 프로젝트 삭제 확정
  const handleDeleteConfirm = () => {
    if (projectToDelete) {
      // TODO: API 호출 - 프로젝트 삭제
      console.log("프로젝트 삭제:", projectToDelete);
      setProjectToDelete(null);
    }
  };

  // 삭제 취소
  const handleDeleteCancel = () => {
    setProjectToDelete(null);
  };

  // 프로젝트 상세보기
  const handleProjectDetail = (projectId: string) => {
    // LDR04P03 - 프로젝트 상세보기 페이지로 이동
    router.push(`/project-management/${projectId}`);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 페이지 번호 계산 (현재 페이지 주변만 표시)
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();
  const projectToDeleteInfo = dummyProjects.find(p => p.id === projectToDelete);

  return (
    <div>
      {/* 기존 더미 내용 */}
      <PageHeader
        title='팀 진행 프로젝트 목록'
        buttonElement={
          <Button
            onClick={handleAddProject}
            className='flex items-center gap-2'
          >
            <Plus className='w-4 h-4' />
            프로젝트 추가
          </Button>
        }
      />

      {/* 4번 페이지 내용 */}
      <div className='w-full'>
        <div className='w-full max-w-none'>
          <CardContent className='p-0'>
            {/* 삭제 확인 메시지 */}
            {projectToDelete && projectToDeleteInfo && (
              <div className='p-6 border-b'>
                <Alert variant='destructive'>
                  <AlertDescription>
                    <div className='space-y-3'>
                      <p>
                        <strong>"{projectToDeleteInfo.name}"</strong> 프로젝트를
                        삭제하시겠습니까?
                        <br />
                        삭제된 프로젝트는 복구할 수 없습니다.
                      </p>
                      <div className='flex gap-2'>
                        <Button
                          size='sm'
                          variant='destructive'
                          onClick={handleDeleteConfirm}
                        >
                          삭제
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={handleDeleteCancel}
                        >
                          취소
                        </Button>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* 프로젝트 테이블 */}
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b bg-muted/30'>
                    <th className='text-left py-3 px-4 font-semibold text-sm'>
                      프로젝트명
                    </th>
                    <th className='text-left py-3 px-4 font-semibold text-sm'>
                      상태
                    </th>
                    <th className='text-left py-3 px-4 font-semibold text-sm'>
                      진행률
                    </th>
                    <th className='text-left py-3 px-4 font-semibold text-sm'>
                      기간
                    </th>
                    <th className='text-left py-3 px-4 font-semibold text-sm'>
                      팀원
                    </th>
                    <th className='text-center py-3 px-4 font-semibold text-sm'>
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProjects.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className='text-center py-8 text-muted-foreground'
                      >
                        아직 프로젝트가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    paginatedProjects.map(project => (
                      <tr
                        key={project.id}
                        className='border-b hover:bg-muted/20 transition-colors'
                      >
                        <td className='py-3 px-4'>
                          <div>
                            <div className='font-medium'>{project.name}</div>
                            <div className='text-sm text-muted-foreground'>
                              {project.description}
                            </div>
                          </div>
                        </td>
                        <td className='py-3 px-4'>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </td>
                        <td className='py-3 px-4'>
                          <div className='flex items-center gap-2'>
                            <div className='w-16 bg-gray-200 rounded-full h-2 dark:bg-gray-700'>
                              <div
                                className='bg-blue-600 h-2 rounded-full'
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <span className='text-sm text-muted-foreground'>
                              {project.progress}%
                            </span>
                          </div>
                        </td>
                        <td className='py-3 px-4 text-sm text-muted-foreground'>
                          <div>
                            {new Date(project.startDate).toLocaleDateString(
                              "ko-KR",
                              {
                                year: "numeric",
                                month: "short",
                              }
                            )}{" "}
                            ~
                          </div>
                          <div>
                            {new Date(project.endDate).toLocaleDateString(
                              "ko-KR",
                              {
                                year: "numeric",
                                month: "short",
                              }
                            )}
                          </div>
                        </td>
                        <td className='py-3 px-4'>
                          <div className='text-sm'>
                            {project.teamMembers.join(", ")}
                          </div>
                        </td>
                        <td className='py-3 px-4'>
                          <div className='flex items-center justify-center gap-2'>
                            <Button
                              size='sm'
                              variant='outline'
                              onClick={() => handleProjectDetail(project.id)}
                            >
                              <Eye className='w-3 h-3' />
                            </Button>
                            <Button
                              size='sm'
                              variant='outline'
                              onClick={() => handleDeleteRequest(project.id)}
                              disabled={projectToDelete !== null}
                            >
                              <Trash2 className='w-3 h-3' />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className='flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t'>
                <div className='text-sm text-muted-foreground'>
                  총 <strong>{totalItems.toLocaleString()}</strong>개 중{" "}
                  <strong>{(currentPage - 1) * itemsPerPage + 1}</strong>-
                  <strong>
                    {Math.min(currentPage * itemsPerPage, totalItems)}
                  </strong>
                  개 표시
                </div>

                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className='hidden sm:flex'
                  >
                    <ChevronsLeft className='w-4 h-4' />
                  </Button>

                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className='w-4 h-4' />
                    <span className='hidden sm:inline ml-1'>이전</span>
                  </Button>

                  <div className='flex items-center gap-1'>
                    {visiblePages.map((page, index) => {
                      if (page === "...") {
                        return (
                          <span
                            key={`dots-${index}`}
                            className='px-2 py-1 text-muted-foreground'
                          >
                            ...
                          </span>
                        );
                      }

                      const pageNumber = page as number;
                      const isCurrentPage = pageNumber === currentPage;

                      return (
                        <Button
                          key={pageNumber}
                          variant={isCurrentPage ? "default" : "outline"}
                          size='sm'
                          onClick={() => handlePageChange(pageNumber)}
                          className={`min-w-[32px] h-8 ${
                            isCurrentPage
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          }`}
                        >
                          {pageNumber}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <span className='hidden sm:inline mr-1'>다음</span>
                    <ChevronRight className='w-4 h-4' />
                  </Button>

                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className='hidden sm:flex'
                  >
                    <ChevronsRight className='w-4 h-4' />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </div>
  );
}
