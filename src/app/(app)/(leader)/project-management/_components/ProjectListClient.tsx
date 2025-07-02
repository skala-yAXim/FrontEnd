"use client";

import { useState } from "react";

import Pagination from "@/components/Pagination";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import DataTable, { Column } from "@/components/ui/data-table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useDeleteProject, useGetProjects } from "@/hooks/useProjectQueries";
import { useServerPagination } from "@/hooks/useServerPagination";
import { Project } from "@/types/projectType";
import { getStatusColor } from "@/utils/statusColor";
import { AlertCircle, Trash2 } from "lucide-react";
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

  const handleProjectDetail = (item: Project) => {
    router.push(`/project-management/${item.id}`);
  };

  // 테이블 컬럼 정의
  const columns: Column<Project>[] = [
    {
      key: "name",
      label: "프로젝트명",
      render: value => <div className='font-medium'>{value}</div>,
    },
    {
      key: "startDate",
      label: "기간",
      render: (value, item) => (
        <div className='text-sm text-muted-foreground'>
          <div>
            {new Date(item.startDate).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            ~
          </div>
          <div>
            {new Date(item.endDate).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "상태",
      render: value => (
        <Badge
          className={`${getStatusColor(value)} !hover:bg-current !hover:text-current pointer-events-none`}
        >
          {value}
        </Badge>
      ),
    },
    {
      key: "id",
      label: "작업",
      render: (value, item) => (
        <div className='flex items-center' onClick={e => e.stopPropagation()}>
          <Button
            size='sm'
            variant='outline'
            onClick={() => handleDeleteRequest(item)}
          >
            <Trash2 className='w-3 h-3' />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-10'>
        <LoadingSpinner size='lg' className='text-muted-foreground' />
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
    <div className='w-full mt-6'>
      <div className='w-full max-w-none'>
        <CardContent className='p-6'>
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

          <DataTable
            data={projects}
            columns={columns}
            onRowClick={handleProjectDetail}
            isLoading={isLoading}
            emptyMessage='아직 프로젝트가 없습니다.'
          />

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
