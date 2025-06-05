"use client";

import { api } from "@/lib/api/http"; // Assuming your api object is here
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"; // useEffect might still be needed for other logic, or removed if not.

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useGetProjects } from "@/hooks/useGetProjects";
import { Project } from "@/types/projectType";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

// API 응답이 프로젝트 배열만 반환하고 페이지 정보가 없다면,
// TanStack Query는 페이지네이션 정보를 직접 다루진 않습니다.
// 응답에서 totalItems/totalPages를 받아오거나, useInfiniteQuery를 고려해야 할 수 있습니다.
// 여기서는 API가 프로젝트 배열만 반환하고, totalItems를 임의로 계산한다고 가정합니다.

// 만약 API가 { content: Project[], totalElements: number, ... } 형태라면:
// interface ProjectsResponse { content: Project[]; totalElements: number; totalPages: number; number: number; size: number; }

// 상태별 색상
const getStatusColor = (status: string): string => {
  switch (status.toUpperCase()) {
    case "PLANNING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "COMPLETED":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "PENDING":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    case "CANCELLED":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
};

export default function ProjectListClient() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(0); // API page (0-indexed)
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sort, setSort] = useState<string[]>(["startDate,desc"]); // API sort format

  // State for delete confirmation dialog
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const {
    data: projectsData, // This will be the array of projects or the full API response object
    isLoading,
    isError,
    // isFetching, // can be used for background loading indicators
  } = useGetProjects(currentPage, itemsPerPage);

  // Determine projects list and total items
  // This logic depends HEAVILY on your actual API response structure.
  // If API returns { content: [], totalElements: number }, use that.
  // For now, assuming projectsData IS the array of projects.
  const projects: Project[] = Array.isArray(projectsData) ? projectsData : [];

  // CRITICAL: For proper pagination, API MUST return total item count or total pages.
  // The following is a VERY ROUGH ESTIMATE if API only returns current page's items.
  // This will lead to inaccurate pagination UI.
  const totalItems =
    projectsData && Array.isArray(projectsData)
      ? currentPage * itemsPerPage +
        projectsData.length +
        (projectsData.length === itemsPerPage ? itemsPerPage : 0)
      : 0;
  // If your API returns totalElements: `const totalItems = projectsData?.totalElements || 0;`
  // And projects: `const projects = projectsData?.content || [];`

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const deleteMutation = useMutation<void, Error, number>({
    // Returns void, Error type, projectId is number
    mutationFn: (projectId: number) => api.delete(`/projects/${projectId}`),
    onSuccess: (_, deletedProjectId) => {
      alert(`프로젝트 (ID: ${deletedProjectId})가 삭제되었습니다.`);
      setProjectToDelete(null); // Close confirmation
      setDeleteError(null);
      // Invalidate the projects query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["projects"] }); // More specific: queryClient.invalidateQueries({ queryKey: projectsQueryKey }) will refetch current page.
      // Using just ['projects'] will refetch any query starting with 'projects'.
    },
    onError: err => {
      setDeleteError(`삭제 실패: ${err.message}`);
      // projectToDelete remains so user can see the error in the dialog
    },
  });

  const handleDeleteRequest = (project: Project) => {
    setProjectToDelete(project);
    setDeleteError(null); // Clear previous delete error
  };

  const handleDeleteConfirm = () => {
    if (projectToDelete) {
      deleteMutation.mutate(projectToDelete.id);
    }
  };

  const handleDeleteCancel = () => {
    setProjectToDelete(null);
    setDeleteError(null);
  };

  const handleProjectDetail = (projectId: number) => {
    router.push(`/project-management/${projectId}`);
  };

  const handlePageChange = (page: number) => {
    // page is 1-indexed from UI
    setCurrentPage(page - 1); // Convert to 0-indexed for API
  };

  // Pagination display logic (remains largely the same, uses `totalPages`)
  const getVisiblePages = () => {
    const uiCurrentPage = currentPage + 1;
    const simplifiedPages: (number | string)[] = [];
    if (totalPages <= 0) return [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) simplifiedPages.push(i);
    } else {
      simplifiedPages.push(1);
      if (uiCurrentPage > 4) simplifiedPages.push("...");
      let startPage = Math.max(2, uiCurrentPage - 2);
      let endPage = Math.min(totalPages - 1, uiCurrentPage + 2);
      if (uiCurrentPage <= 4) {
        startPage = 2;
        endPage = Math.min(totalPages - 1, 5);
      } else if (uiCurrentPage >= totalPages - 3) {
        startPage = Math.max(2, totalPages - 4);
        endPage = totalPages - 1;
      }
      for (let i = startPage; i <= endPage; i++) {
        simplifiedPages.push(i);
      }
      if (uiCurrentPage < totalPages - 3 && endPage < totalPages - 1)
        simplifiedPages.push("...");
      simplifiedPages.push(totalPages);
    }
    // Remove duplicate "..." and ensure "..." is not next to 1 or totalPages if range is small
    return simplifiedPages
      .filter((item, idx, arr) => {
        if (item === "...") {
          // if it's the first or last item, or surrounded by numbers, keep it.
          const prev = arr[idx - 1];
          const next = arr[idx + 1];
          if (
            typeof prev === "number" &&
            typeof next === "number" &&
            next === prev + 2
          )
            return true;
          if (idx === 0 && typeof next === "number" && next > 1) return true; // ... 2 (if 1 is not shown)
          if (
            idx === arr.length - 1 &&
            typeof prev === "number" &&
            prev < totalPages
          )
            return true; // 2 ... (if totalPages is not shown)
          // Avoid consecutive ...
          if (prev === "...") return false;
          // Avoid 1 ... 2 or N-1 ... N
          if (prev === 1 && next === 2) return false;
          if (prev === totalPages - 1 && next === totalPages) return false;
          return true; // Default keep
        }
        return true;
      })
      .filter(
        (item, idx, arr) =>
          item !== "..." || (idx > 0 && arr[idx - 1] !== "...")
      ); // Final pass for consecutive
  };

  const visiblePages = getVisiblePages();

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

  // queryError is of type Error, error.message should be used.
  if (isError && !projectToDelete) {
    // Show general query error if not in delete confirmation dialog
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
                {" "}
                {/* warning for confirm, destructive on error*/}
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>
                  <div className='space-y-3'>
                    <p>
                      <strong>"{projectToDelete.name}"</strong> 프로젝트를
                      삭제하시겠습니까?
                      <br />
                      삭제된 프로젝트는 복구할 수 없습니다.
                      {deleteError && (
                        <span className='block text-red-700 dark:text-red-400 mt-2'>
                          오류: {deleteError}
                        </span>
                      )}
                      {/* {deleteMutation.isLoading && (
                        <span className='block text-blue-700 dark:text-blue-400 mt-2'>
                          삭제 중...
                        </span>
                      )} */}
                    </p>
                    <div className='flex gap-2'>
                      <Button
                        size='sm'
                        variant='destructive'
                        onClick={handleDeleteConfirm}
                        // disabled={deleteMutation.isLoading}
                      >
                        {/* {deleteMutation.isLoading ? "삭제 중..." : "삭제"} */}
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={handleDeleteCancel}
                        // disabled={deleteMutation.isLoading}
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
                      className='border-b hover:bg-muted/20 transition-colors'
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
                            onClick={() => handleDeleteRequest(project)}
                            // disabled={
                            //   projectToDelete !== null ||
                            //   deleteMutation.isLoading
                            // }
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
          {totalPages > 0 && (
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t'>
              <div className='text-sm text-muted-foreground'>
                총 <strong>{totalItems.toLocaleString()}</strong>개 중{" "}
                <strong>{currentPage * itemsPerPage + 1}</strong>-
                <strong>
                  {Math.min((currentPage + 1) * itemsPerPage, totalItems)}
                </strong>
                개 표시 (페이지: {currentPage + 1}/{totalPages})
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 0}
                  className='hidden sm:flex'
                >
                  <ChevronsLeft className='w-4 h-4' />
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handlePageChange(currentPage)}
                  disabled={currentPage === 0}
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
                    } else if (typeof page === "number") {
                      const isCurrentPage = page === currentPage + 1;
                      return (
                        <Button
                          key={page}
                          variant={isCurrentPage ? "default" : "outline"}
                          size='sm'
                          onClick={() => handlePageChange(page)}
                          className={`min-w-[32px] h-8 ${isCurrentPage ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                        >
                          {page}
                        </Button>
                      );
                    }
                    return null;
                  })}
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handlePageChange(currentPage + 2)}
                  disabled={currentPage >= totalPages - 1}
                >
                  <span className='hidden sm:inline mr-1'>다음</span>
                  <ChevronRight className='w-4 h-4' />
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage >= totalPages - 1}
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
  );
}
