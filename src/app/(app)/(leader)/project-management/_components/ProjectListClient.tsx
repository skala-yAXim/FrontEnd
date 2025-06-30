"use client";

import { useState } from "react";

import Pagination from "@/components/Pagination";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useDeleteProject, useGetProjects } from "@/hooks/useProjectQueries";
import { useServerPagination } from "@/hooks/useServerPagination";
import { Project } from "@/types/projectType";
import { getStatusColor } from "@/utils/statusColor";
import { AlertCircle, ChevronLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

// API 응답이 프로젝트 배열만 반환하고 페이지 정보가 없다면,
// TanStack Query는 페이지네이션 정보를 직접 다루진 않습니다.
// 응답에서 totalItems/totalPages를 받아오거나, useInfiniteQuery를 고려해야 할 수 있습니다.
// 여기서는 API가 프로젝트 배열만 반환하고, totalItems를 임의로 계산한다고 가정합니다.

// 만약 API가 { content: Project[], totalElements: number, ... } 형태라면:
// interface ProjectsResponse { content: Project[]; totalElements: number; totalPages: number; number: number; size: number; }

export default function ProjectListClient() {
  const router = useRouter();
  const { deleteProject, isPending } = useDeleteProject();

  // 서버 페이지네이션 훅 사용
  const pagination = useServerPagination({
    initialPage: 0,
    initialSize: 10,
    initialSort: "startDate,desc",
  });

  const {
    data: projectsData,
    isLoading,
    isError,
  } = useGetProjects(pagination.pageRequest);

  // State for delete confirmation dialog
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // 서버에서 데이터 가져오기 - 페이지네이션 상태를 그대로 전달

  // 서버에서 받은 페이지네이션 정보 추출
  const projects = projectsData?.content || [];
  const totalItems = projectsData?.totalElements || 0;
  const totalPages = projectsData?.totalPages || 0;

  const handleDeleteRequest = (project: Project) => {
    setProjectToDelete(project);
    setDeleteError(null);
  };

  const handleDeleteConfirm = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      setProjectToDelete(null);
      setDeleteError(null);
    }
  };

  const handleDeleteCancel = () => {
    setProjectToDelete(null);
    setDeleteError(null);
  };

  const handleProjectDetail = (projectId: number) => {
    router.push(`/project-management/${projectId}`);
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-10'>
        <ChevronLeft className='w-8 h-8 animate-spin text-muted-foreground' />
        <p className='ml-2 text-muted-foreground'>
          프로젝트 목록을 불러오는 중입니다...
        </p>
      </div>
    );
  }

  if (isError && !projectToDelete) {
    return (
      <div className='p-6'>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            프로젝트 목록을 불러오는데 실패했습니다.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='w-full max-w-none'>
        <CardContent className='p-0'>
          {projectToDelete && (
            <div className='p-6 border-b'>
              <Alert variant={deleteError ? "destructive" : "warning"}>
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>
                  <div className='space-y-3'>
                    <p>
                      <strong>&quot;{projectToDelete.name}&quot;</strong>{" "}
                      프로젝트를 삭제하시겠습니까?
                      <br />
                      삭제된 프로젝트는 복구할 수 없습니다.
                      {deleteError && (
                        <span className='block text-red-700 dark:text-red-400 mt-2'>
                          오류: {deleteError}
                        </span>
                      )}
                      {isPending && (
                        <span className='block text-red-700 dark:text-red-400 mt-2'>
                          삭제 중...
                        </span>
                      )}
                    </p>
                    <div className='flex gap-2'>
                      <Button
                        size='sm'
                        variant='destructive'
                        onClick={handleDeleteConfirm}
                        disabled={isPending}
                      >
                        {isPending ? "삭제 중..." : "삭제"}
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={handleDeleteCancel}
                        disabled={isPending}
                      >
                        취소
                      </Button>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b bg-muted/30'>
                  <th className='text-left py-3 px-4 font-semibold text-sm'>
                    프로젝트명
                  </th>
                  <th className='text-left py-3 px-4 font-semibold text-sm'>
                    기간
                  </th>
                  <th className='text-left py-3 px-4 font-semibold text-sm'>
                    상태
                  </th>
                  <th className='text-center py-3 px-4 font-semibold text-sm'>
                    작업
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 && !isLoading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className='text-center py-8 text-muted-foreground'
                    >
                      아직 프로젝트가 없습니다.
                    </td>
                  </tr>
                ) : (
                  projects.map(project => (
                    <tr
                      key={project.id}
                      className='border-b hover:bg-slate-100 hover:shadow-lg transition-all duration-200 cursor-pointer'
                      onClick={() => handleProjectDetail(project.id)}
                    >
                      <td className='py-3 px-4'>
                        <div>
                          <div className='font-medium'>{project.name}</div>
                        </div>
                      </td>
                      <td className='py-3 px-4 text-sm text-muted-foreground'>
                        <div>
                          {new Date(project.startDate).toLocaleDateString(
                            "ko-KR",
                            { year: "numeric", month: "short", day: "numeric" }
                          )}{" "}
                          ~
                        </div>
                        <div>
                          {new Date(project.endDate).toLocaleDateString(
                            "ko-KR",
                            { year: "numeric", month: "short", day: "numeric" }
                          )}
                        </div>
                      </td>
                      <td className='py-3 px-4'>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </td>
                      <td
                        className='py-3 px-4'
                        onClick={e => e.stopPropagation()}
                      >
                        <div className='flex items-center justify-center'>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => handleDeleteRequest(project)}
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

          {/* 공통 Pagination 컴포넌트 사용 */}
          {totalPages > 0 && (
            <div className='p-6 border-t'>
              <Pagination
                {...pagination.getPaginationProps(totalItems)}
                showPageInfo={true}
                showResultInfo={true}
              />
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
}
