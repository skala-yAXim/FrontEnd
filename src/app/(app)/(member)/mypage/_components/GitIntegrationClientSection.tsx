"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteGitHubInfo, useGetGitHubInfo } from "@/hooks/useGitHubInfo";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Github,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

// Git OAuth 상태 타입
interface GitIntegration {
  isConnected: boolean;
  username?: string;
  avatar?: string;
  connectedAt?: string;
}

// 애니메이션 변수 정의
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

/**
 * GitHub 연동 상태를 관리하고 관련 UI를 렌더링하는 클라이언트 컴포넌트입니다.
 * @returns {JSX.Element}
 */
export default function GitIntegrationClientSection() {
  const { data: gitInfo, isLoading, isError } = useGetGitHubInfo();
  const { mutate: deleteGitHubInfo, isPending: isDeleting } =
    useDeleteGitHubInfo();

  // Git OAuth 연동 시작 핸들러
  const handleGitConnect = async () => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_SERVER_CLIENT_SIDE_URL}/oauth2/authorization/github`;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("GitHub 연동 중 오류가 발생했습니다.");
      }
    }
  };

  // Git 연동 해제 핸들러
  const handleGitDisconnect = async () => {
    try {
      deleteGitHubInfo(undefined, {
        onSuccess: () => {
          toast.success("GitHub 연동이 성공적으로 해제되었습니다.");
        },
        onError: error => {
          toast.error("GitHub 연동 해제에 실패했습니다.");
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        toast.error("GitHub 연동 해제 중 오류가 발생했습니다.");
      } else {
        toast.error("GitHub 연동 해제 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  // 로딩 중 UI
  if (isLoading) {
    return (
      <div>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Github className='w-5 h-5' />
            GitHub 연동
          </CardTitle>
        </CardHeader>
        <CardContent className='p-6'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col items-center justify-center p-8 space-y-3 bg-muted/30 rounded-xl border border-border/50 animate-pulse'
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className='relative w-12 h-12 rounded-full bg-muted flex items-center justify-center'
            >
              <Settings className='w-6 h-6 text-primary/70' />
              <span className='absolute -bottom-1 -right-1 w-4 h-4 bg-muted-foreground/20 rounded-full animate-ping'></span>
            </motion.div>
            <p className='font-medium text-muted-foreground'>
              연동 정보를 불러오는 중입니다...
            </p>
          </motion.div>
        </CardContent>
      </div>
    );
  }

  // 에러 발생 시 UI
  if (isError) {
    return (
      <div>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Github className='w-5 h-5' />
            GitHub 연동
          </CardTitle>
        </CardHeader>
        <CardContent className='p-6'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              variant='destructive'
              className='border border-destructive/30 bg-destructive/5'
            >
              <AlertCircle className='h-5 w-5' />
              <AlertDescription className='font-medium'>
                GitHub 연동 정보를 불러오는데 실패했습니다.
              </AlertDescription>
            </Alert>
          </motion.div>
        </CardContent>
      </div>
    );
  }

  return (
    <div>
      <AnimatePresence>
        {isError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              variant='destructive'
              className='mb-4 border border-destructive/30 bg-destructive/5'
            >
              <AlertCircle className='h-5 w-5' />
              <AlertDescription className='font-medium'>
                {isError}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Git 연동 카드 */}
      <CardHeader className='pb-2'>
        <CardTitle className='flex items-center gap-2 text-xl'>
          <Github className='w-6 h-6' />
          GitHub 연동
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6 p-6'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {gitInfo?.connected ? (
            /* 연동됨 상태 */
            <div className='space-y-6'>
              <motion.div
                variants={itemVariants}
                className='flex items-center justify-between p-6 bg-gradient-to-br from-green-50 to-emerald-50/70 dark:from-green-900/30 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800/50 shadow-sm transition-all duration-300 hover:shadow-md'
                whileHover={{
                  scale: 1.01,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className='flex items-center gap-4'>
                  {gitInfo.avatarUrl ? (
                    <motion.img
                      src={gitInfo.avatarUrl}
                      alt='GitHub Avatar'
                      className='w-16 h-16 rounded-full border-4 border-background shadow-sm'
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      onError={e => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.onerror = null;
                        target.src =
                          "https://via.placeholder.com/40/cccccc/969696?text=GH";
                      }}
                    />
                  ) : (
                    <motion.div
                      className='w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center border-4 border-background shadow-sm'
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Github className='w-8 h-8 text-muted-foreground' />
                    </motion.div>
                  )}
                  <div>
                    <div className='flex items-center gap-2 mb-1'>
                      <p className='text-lg font-semibold'>@{gitInfo.gitId}</p>
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 15,
                          delay: 0.2,
                        }}
                      >
                        <Badge
                          variant='secondary'
                          className='bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-800 dark:to-emerald-800 dark:text-green-100 flex items-center whitespace-nowrap px-2 py-0.5 shadow-sm'
                        >
                          <CheckCircle className='w-3 h-3 mr-1 shrink-0' />
                          연동됨
                        </Badge>
                      </motion.div>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {gitInfo.createdAt &&
                        `${new Date(gitInfo.createdAt).toLocaleDateString("ko-KR")} 연동`}
                    </p>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      window.open(
                        `https://github.com/${gitInfo.gitId}`,
                        "_blank"
                      )
                    }
                    className='px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow group'
                  >
                    <ExternalLink className='w-4 h-4 mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
                    <span>GitHub 보기</span>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className='flex gap-2 justify-end'>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant='outline'
                      onClick={handleGitDisconnect}
                      disabled={isDeleting}
                      className='text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-900/20 transition-all duration-300'
                    >
                      {isDeleting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Settings className='w-4 h-4 mr-2' />
                          </motion.div>
                          처리 중...
                        </>
                      ) : (
                        "연동 해제"
                      )}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ) : (
            /* 연동 안됨 상태 */
            <div className='space-y-6'>
              <motion.div
                variants={itemVariants}
                className='p-6 bg-gradient-to-br from-gray-50 to-gray-50/70 dark:from-gray-900/30 dark:to-gray-800/20 rounded-xl border shadow-sm'
                whileHover={{
                  scale: 1.01,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className='flex items-center gap-3 mb-4'>
                  <motion.div
                    className='w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm'
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    <Github className='w-6 h-6 text-muted-foreground' />
                  </motion.div>
                  <p className='text-lg font-semibold'>
                    GitHub 연동이 필요합니다
                  </p>
                </div>
                <p className='text-muted-foreground leading-relaxed'>
                  위클리 보고서 생성을 위해 GitHub 계정을 연동해주세요. 코드
                  기여도, 커밋 내역 등을 분석하여 더 정확한 보고서를 생성할 수
                  있습니다.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='mb-8'
              >
                <Button
                  onClick={handleGitConnect}
                  className='w-full flex items-center gap-2 bg-gradient-to-r from-[#24292e] to-[#2c3137] hover:from-[#1b1f23] hover:to-[#24292e] text-white shadow-md hover:shadow-lg transition-all duration-300 py-6'
                >
                  <motion.div
                    animate={{
                      rotate: 0,
                      y: [0, -2, 0, 2, 0],
                    }}
                    transition={{
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                      y: { duration: 2, repeat: Infinity, repeatType: "loop" },
                    }}
                  >
                    <Github className='w-5 h-5' />
                  </motion.div>
                  GitHub 연동하기
                </Button>
              </motion.div>
            </div>
          )}

          {/* 연동 안내 */}

          <div className='flex items-start gap-3'>
            <Settings className='w-4 h-4 text-primary' />
            <div>
              <p className='font-semibold mb-2'>연동 시 제공되는 기능:</p>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <motion.li
                  className='flex items-center gap-2'
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <CheckCircle className='w-4 h-4 text-green-500' />
                  <span>주간 코드 기여도 자동 집계</span>
                </motion.li>
                <motion.li
                  className='flex items-center gap-2'
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <CheckCircle className='w-4 h-4 text-green-500' />
                  <span>커밋 내역 및 PR 통계 분석</span>
                </motion.li>
                <motion.li
                  className='flex items-center gap-2'
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <CheckCircle className='w-4 h-4 text-green-500' />
                  <span>개인 활동 대시보드 제공</span>
                </motion.li>
              </ul>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </div>
  );
}
