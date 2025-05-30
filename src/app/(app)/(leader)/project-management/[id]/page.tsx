// TODO: API 연동 필요 (프로젝트 상세 조회)
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Edit, 
  FolderOpen, 
  Calendar,
  Users,
  FileText,
  Download
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import React from "react";

// 프로젝트 상세 인터페이스
interface ProjectDetail {
  id: string;
  name: string;
  description: string;
  status: "진행중" | "완료" | "대기" | "중단";
  startDate: string;
  endDate: string;
  teamMembers: string[];
  progress: number;
  files: ProjectFile[];
  createdAt: string;
  updatedAt: string;
}

// 프로젝트 파일 인터페이스
interface ProjectFile {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
}

// 더미 프로젝트 상세 데이터 생성
const generateProjectDetail = (id: string): ProjectDetail => {
  const projectNames = [
    "사용자 인증 시스템 개발",
    "모바일 앱 UI/UX 개선", 
    "데이터베이스 최적화",
    "API 서버 구축",
    "웹사이트 리뉴얼"
  ];

  const descriptions = [
    "사용자 로그인 및 회원가입 시스템을 개발하여 보안성을 강화하고 사용자 경험을 개선하는 프로젝트입니다. JWT 토큰 기반 인증과 소셜 로그인 기능을 포함합니다.",
    "모바일 애플리케이션의 사용자 인터페이스와 사용자 경험을 전면적으로 개선하는 프로젝트입니다. 사용성 테스트를 통해 도출된 개선사항들을 반영합니다.",
    "기존 데이터베이스의 성능을 최적화하고 쿼리 속도를 개선하는 프로젝트입니다. 인덱싱 전략 수립과 쿼리 최적화를 통해 전반적인 시스템 성능을 향상시킵니다.",
    "RESTful API 서버를 구축하여 프론트엔드와 모바일 앱에서 사용할 수 있는 백엔드 시스템을 개발하는 프로젝트입니다.",
    "기존 웹사이트를 최신 기술스택으로 리뉴얼하여 성능과 사용자 경험을 개선하는 프로젝트입니다."
  ];

  const statuses: ("진행중" | "완료" | "대기" | "중단")[] = ["진행중", "완료", "대기", "중단"];
  const members = ["김개발", "이기획", "박디자인", "최백엔드", "정테스터"];
  
  const projectIndex = parseInt(id.split('-')[1]) || 1;
  const nameIndex = (projectIndex - 1) % projectNames.length;
  
  return {
    id,
    name: projectNames[nameIndex],
    description: descriptions[nameIndex],
    status: statuses[(projectIndex - 1) % statuses.length], // 고정된 패턴 사용
    startDate: "2025-05-01",
    endDate: "2025-08-31",
    teamMembers: members.slice(0, ((projectIndex - 1) % 3) + 2), // 고정된 패턴
    progress: (projectIndex * 15) % 101, // 고정된 진행률
    files: [
      {
        id: "file-1",
        name: "요구사항정의서.docx",
        size: 2560000, // 2.56MB
        uploadedAt: "2025-05-15"
      },
      {
        id: "file-2", 
        name: "WBS.xlsx",
        size: 1280000, // 1.28MB
        uploadedAt: "2025-05-20"
      },
      {
        id: "file-3",
        name: "설계서.docx",
        size: 3840000, // 3.84MB
        uploadedAt: "2025-05-25"
      }
    ],
    createdAt: "2025-05-01",
    updatedAt: "2025-05-30"
  };
};

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

// 파일 크기 포맷팅
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  // 더미 데이터 로드
  const projectDetail = generateProjectDetail(projectId);

  // 뒤로가기 핸들러
  const handleGoBack = () => {
    router.push("/project-management");
  };

  // 프로젝트 수정 핸들러
  const handleEditProject = () => {
    // LDR04M02 - 프로젝트 등록 페이지로 이동 (수정 모드)
    router.push(`/project-management/create?edit=${projectId}`);
  };

  // 파일 다운로드 핸들러
  const handleFileDownload = (fileId: string, fileName: string) => {
    // TODO: API 호출 - 파일 다운로드
    console.log("파일 다운로드:", fileId, fileName);
    alert(`파일 다운로드 기능은 개발 중입니다. (${fileName})`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 헤더 - 뒤로가기 & 수정 버튼 */}
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          onClick={handleGoBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          뒤로가기
        </Button>
        
        <Button
          onClick={handleEditProject}
          className="flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          프로젝트 수정
        </Button>
      </div>

      <Card className="w-full max-w-none">
        <CardHeader className="border-b">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <FolderOpen className="w-8 h-8 text-blue-600 mt-1" />
              <div>
                <CardTitle className="text-2xl mb-2">{projectDetail.name}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>프로젝트 ID: {projectDetail.id}</span>
                  <span>•</span>
                  <span>생성일: {new Date(projectDetail.createdAt).toLocaleDateString("ko-KR")}</span>
                  <span>•</span>
                  <span>수정일: {new Date(projectDetail.updatedAt).toLocaleDateString("ko-KR")}</span>
                </div>
              </div>
            </div>
            <Badge className={getStatusColor(projectDetail.status)}>
              {projectDetail.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          {/* 프로젝트 기본 정보 */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5" />
              프로젝트 개요
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {projectDetail.description}
            </p>
          </div>

          <Separator />

          {/* 프로젝트 진행 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 기간 정보 */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                프로젝트 기간
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">시작일:</span>
                  <span>{new Date(projectDetail.startDate).toLocaleDateString("ko-KR")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">종료일:</span>
                  <span>{new Date(projectDetail.endDate).toLocaleDateString("ko-KR")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">진행률:</span>
                  <span className="font-medium">{projectDetail.progress}%</span>
                </div>
              </div>
              
              {/* 진행률 바 */}
              <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${projectDetail.progress}%` }}
                ></div>
              </div>
            </div>

            {/* 팀원 정보 */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" />
                참여 팀원 ({projectDetail.teamMembers.length}명)
              </h4>
              <div className="flex flex-wrap gap-2">
                {projectDetail.teamMembers.map((member, index) => (
                  <Badge key={index} variant="outline">
                    {member}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* 첨부 파일 목록 */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4" />
              첨부 파일 ({projectDetail.files.length}개)
            </h4>
            
            {projectDetail.files.length === 0 ? (
              <p className="text-muted-foreground text-sm">첨부된 파일이 없습니다.</p>
            ) : (
              <div className="space-y-3">
                {projectDetail.files.map(file => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString("ko-KR")} 업로드
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleFileDownload(file.id, file.name)}
                      className="flex items-center gap-2"
                    >
                      <Download className="w-3 h-3" />
                      다운로드
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
