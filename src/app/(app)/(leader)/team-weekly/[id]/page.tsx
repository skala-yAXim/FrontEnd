// TODO: API 연동 필요 (보고서 상세 조회, PDF 다운로드)
"use client";

import { ReportActions } from "@/components/reports/ReportActions";
import { ReportError, ReportNotFound } from "@/components/reports/ReportError";
import { ReportSkeleton } from "@/components/reports/ReportSkeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetTeamWeeklyReport } from "@/hooks/useTeamWeeklyQueries";
import { useWordDownload } from "@/hooks/useWordDownload";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import ReportHeader from "./_components/ReportHeader";
import TeamWeeklyReport from "./_components/TeamWeeklyReport";
import TeamWeeklyReportDetail from "./_components/TeamWeeklyReportDetail";

// 애니메이션 변수
const detailVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -20,
    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 },
      y: { duration: 0.2 },
      boxShadow: { duration: 0.2 },
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    transition: {
      height: { duration: 0.4 },
      opacity: { duration: 0.3, delay: 0.1 },
      y: { duration: 0.3, delay: 0.1 },
      boxShadow: { duration: 0.5, delay: 0.2 },
    },
  },
};

export default function TeamWeeklyDetailPage() {
  const params = useParams();
  const reportId = params.id as string;
  const detailRef = useRef<HTMLDivElement>(null);
  const detailContentRef = useRef<HTMLDivElement>(null);
  const detailContainerRef = useRef<HTMLDivElement>(null);

  const { downloadWord } = useWordDownload({
    filename: `팀 주간 업무 보고서_${new Date().toISOString().split("T")[0]}.docx`,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    data: reportData,
    isLoading,
    isError,
  } = useGetTeamWeeklyReport(Number(reportId));

  // MD 다운로드 핸들러
  const handleDownloadWord = () => {
    if (reportData?.reportMd) {
      // 한글 파일명: 팀 주간 업무 보고서_날짜.md
      const filename = `팀 주간 업무 보고서_${reportData.startDate || new Date().toISOString().split("T")[0]}.docx`;
      downloadWord(reportData.reportMd, filename);
    } else {
      toast.error("마크다운 데이터가 없습니다.");
    }
  };

  // 스크롤 함수
  const scrollToElement = (element: HTMLElement | null, offset: number = 0) => {
    if (!element) return;

    // 현재 스크롤 위치와 목표 위치 간의 거리 계산
    const elementTop = element.getBoundingClientRect().top;
    const offsetPosition = elementTop + window.pageYOffset - offset;

    // 스크롤 애니메이션
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  // 상세 정보 토글 핸들러
  const toggleDetail = () => {
    if (isAnimating) return; // 애니메이션 중복 방지

    setIsAnimating(true);

    if (isOpen) {
      // 접을 때 애니메이션
      setIsClosing(true);

      // 먼저 컨텐츠를 숨기고 (애니메이션 시작)
      setIsOpen(false);

      // 애니메이션이 시작된 후 스크롤 (스크롤이 더 부드럽게 보이도록)
      setTimeout(() => {
        if (detailRef.current) {
          scrollToElement(detailRef.current, 100);
        }

        // 애니메이션과 스크롤이 완료된 후 상태 초기화
        setTimeout(() => {
          setIsClosing(false);
          setIsAnimating(false);
        }, 400);
      }, 800);
    } else {
      // 펼칠 때는 먼저 열고 애니메이션 완료 후 한 번만 스크롤
      setIsOpen(true);

      // 애니메이션 완료 후 상태 업데이트
      setTimeout(() => {
        setIsAnimating(false);
      }, 200);
    }
  };

  if (isLoading) {
    return <ReportSkeleton />;
  }

  if (isError) {
    return <ReportError error={isError.toString()} href='/team-weekly' />;
  }

  if (!reportData) {
    return <ReportNotFound href='/team-weekly' />;
  }

  return (
    <div className='space-y-6 bg-muted rounded-2xl'>
      <ReportActions
        backHref='/team-weekly'
        title='팀 주간 보고서 상세'
        onPdfDownload={handleDownloadWord}
        pdfButtonText='Word 다운로드'
      />

      {/* 보고서 */}
      <div className='min-h-screen bg-white w-full max-w-5xl rounded-lg mx-auto py-8 px-4 sm:px-6 lg:px-16'>
        <ReportHeader {...reportData} />
        <Separator className='border-border' />
        <TeamWeeklyReport reportMd={reportData.reportMd} />
      </div>

      <div className='flex justify-center mb-16' ref={detailRef}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={toggleDetail}
            variant='outline'
            className='flex items-center gap-2 transition-all duration-300 px-6 py-5 text-base'
            disabled={isClosing || isAnimating}
          >
            {isOpen ? "상세 정보 접기" : "상세 정보 펼치기"}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              }}
            >
              <ChevronDown className='h-4 w-4' />
            </motion.div>
          </Button>
        </motion.div>
      </div>

      <div ref={detailContainerRef} id='detail-container'>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key='detail-container'
              initial='hidden'
              animate='visible'
              exit='hidden'
              variants={detailVariants}
              className='overflow-hidden'
              onAnimationComplete={definition => {
                // 애니메이션 완료 후 한 번만 스크롤 (visible 애니메이션 완료 후)
                if (
                  definition === "visible" &&
                  isOpen &&
                  detailContentRef.current
                ) {
                  scrollToElement(detailContentRef.current, 50);
                }
              }}
            >
              <motion.div
                ref={detailContentRef}
                id='detail-content'
                initial={{ backgroundColor: "hsl(var(--muted))" }}
                animate={{
                  backgroundColor: "hsl(var(--muted))",
                  transition: { duration: 0.3, delay: 0.2 },
                }}
                className='min-h-screen w-full mx-auto py-8 px-4 sm:px-6 lg:px-8'
              >
                <div className='pt-2'>
                  {/* 팀 주간 보고서 상세 정보 */}
                  <TeamWeeklyReportDetail {...reportData} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 하단 안내 */}
      {/* <div className='mt-4 text-center text-sm text-muted-foreground'>
        <p>
          출처가 표시된 부분에 마우스를 올리면 상세 정보를 확인할 수 있습니다.
        </p>
      </div> */}
    </div>
  );
}
