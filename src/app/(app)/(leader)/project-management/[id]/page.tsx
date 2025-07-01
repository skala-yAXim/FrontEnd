import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { serverHttpInterface } from "@/lib/api/server/interface";
import { ProjectResponse } from "@/types/projectType";
import { getStatusColor } from "@/utils/statusColor";
import { Calendar, Download, FileText, FolderOpen } from "lucide-react";
import { notFound } from "next/navigation";
import { ProjectDetailActions } from "./_components/ProjectDetailActions";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  try {
    // 서버 사이드에서 프로젝트 상세 정보 가져오기
    const { id } = await params;
    const projectDetail = (await serverHttpInterface.getProjectDetail(
      id
    )) as ProjectResponse;

    return (
      <div className='w-full max-w-4xl mx-auto mt-6'>
        {/* 헤더 - 뒤로가기 & 수정 버튼 */}
        <ProjectDetailActions projectId={projectDetail.id} />

        <Card className='w-full max-w-none'>
          <CardHeader className='border-b'>
            <div className='flex items-start justify-between'>
              <div className='flex items-start gap-4'>
                <FolderOpen className='w-8 h-8 text-blue-600 mt-1' />
                <div>
                  <CardTitle className='text-2xl mb-2'>
                    {projectDetail.name}
                  </CardTitle>
                  <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                    <span>프로젝트 ID: {projectDetail.id}</span>
                    <span>•</span>
                    <span>
                      생성일:{" "}
                      {/* {new Date(projectDetail.createdAt).toLocaleDateString(
                        "ko-KR"
                      )} */}
                    </span>
                    <span>•</span>
                    <span>
                      수정일:{" "}
                      {/* {new Date(projectDetail.updatedAt).toLocaleDateString(
                        "ko-KR"
                      )} */}
                    </span>
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(projectDetail.status)}>
                {projectDetail.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className='p-8 space-y-8'>
            {/* 프로젝트 기본 정보 */}
            <div className='space-y-6'>
              <h3 className='text-lg font-semibold flex items-center gap-2'>
                <FileText className='w-5 h-5' />
                프로젝트 개요
              </h3>
              <p className='text-muted-foreground leading-relaxed'>
                {projectDetail.description}
              </p>
            </div>

            <Separator />

            {/* 프로젝트 진행 정보 */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {/* 기간 정보 */}
              <div className='space-y-4'>
                <h4 className='font-semibold flex items-center gap-2'>
                  <Calendar className='w-4 h-4' />
                  프로젝트 기간
                </h4>
                <div className='space-y-2 text-sm'>
                  <div className='flex items-center gap-2'>
                    <span className='text-muted-foreground'>시작일:</span>
                    <span>
                      {/* {new Date(projectDetail.startDate).toLocaleDateString(
                        "ko-KR"
                      )} */}
                      {projectDetail.startDate}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-muted-foreground'>종료일:</span>
                    <span>
                      {/* {new Date(projectDetail.endDate).toLocaleDateString(
                        "ko-KR"
                      )} */}
                      {projectDetail.endDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* 첨부 파일 목록 */}
            <div className='space-y-4'>
              <h4 className='font-semibold flex items-center gap-2'>
                <FileText className='w-4 h-4' />
                첨부 파일 ({projectDetail.files.length}개)
              </h4>

              {projectDetail.files.length === 0 ? (
                <p className='text-muted-foreground text-sm'>
                  첨부된 파일이 없습니다.
                </p>
              ) : (
                <div className='space-y-3'>
                  {projectDetail.files.map(file => (
                    <div
                      key={file.id}
                      className='flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors'
                    >
                      <div className='flex items-center gap-3'>
                        <FileText className='w-5 h-5 text-blue-600' />
                        <div>
                          <p className='font-medium'>{file.originalFileName}</p>
                          <p className='text-sm text-muted-foreground'>
                            {/* {formatFileSize(file.size)} •{" "} */}
                            {/* {new Date(file.uploadedAt).toLocaleDateString(
                              "ko-KR"
                            )}{" "} */}
                            업로드
                          </p>
                        </div>
                      </div>
                      <a href={file.fileUrl} download={file.originalFileName}>
                        <Button
                          size='sm'
                          variant='outline'
                          className='flex items-center gap-2 hover:cursor-pointer'
                        >
                          <Download className='w-4 h-4' />
                          다운로드
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("프로젝트 상세 정보 조회 실패:", error);
    notFound();
  }
}
