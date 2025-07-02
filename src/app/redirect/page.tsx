"use client";

import { AnimatedItem, AnimatedLayout } from "@/components/AnimatedLayout";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { httpInterface } from "@/lib/api/httpInterface";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/types/userType";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RedirectPage() {
  const user = useAuthStore(state => state.user);
  const login = useAuthStore(state => state.login);
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  // 시간대에 따른 인사말과 아이콘 결정
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return {
        text: "좋은 아침입니다",
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        text: "환영합니다",
      };
    } else if (hour >= 17 && hour < 21) {
      return {
        text: "좋은 저녁입니다",
      };
    } else {
      return {
        text: "안녕하세요",
      };
    }
  };

  const greeting = getGreeting();

  useEffect(() => {
    const timer = setTimeout(() => {
      httpInterface
        .getMyInfo<User>()
        .then(res => {
          if (res) {
            login(res);
            setStatus("success");
            toast.success("로그인에 성공하였습니다");
            setTimeout(() => {
              router.replace("/dashboard");
            }, 2000);
          }
        })
        .catch(error => {
          console.error("Failed to fetch user info:", error);
          setStatus("error");
          setErrorMessage("로그인에 실패하였습니다");
          toast.error("로그인에 실패하였습니다");
          setTimeout(() => {
            router.replace("/login");
          }, 2000);
        });
    }, 500); // 약간의 지연으로 애니메이션 효과 강화

    return () => clearTimeout(timer);
  }, [login, router]);

  return (
    <div className='h-screen w-full flex items-center justify-center bg-background'>
      <AnimatedLayout>
        <div className='relative w-full max-w-md mx-auto'>
          {/* 배경 장식 요소 */}
          <motion.div
            className='absolute -z-10 inset-0 blur-3xl opacity-20'
            animate={{
              background: [
                "radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(99,102,241,0) 70%)",
                "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(168,85,247,0) 70%)",
              ],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          <AnimatedItem>
            <motion.div
              className='bg-card/80 backdrop-blur-md border rounded-xl shadow-lg overflow-hidden'
              animate={{
                boxShadow:
                  status === "success"
                    ? "0 0 0 2px rgba(34,197,94,0.6)"
                    : status === "error"
                      ? "0 0 0 2px rgba(239,68,68,0.6)"
                      : "none",
              }}
              transition={{ duration: 0.5 }}
            >
              {/* 상태 표시 헤더 */}
              <div className='relative h-2'>
                <motion.div
                  className={`absolute top-0 left-0 h-full ${
                    status === "loading"
                      ? "bg-primary"
                      : status === "success"
                        ? "bg-green-500"
                        : "bg-red-500"
                  }`}
                  initial={{ width: "0%" }}
                  animate={{
                    width:
                      status === "loading"
                        ? ["0%", "40%", "60%", "80%"]
                        : "100%",
                  }}
                  transition={{
                    duration: status === "loading" ? 2 : 0.5,
                    times: status === "loading" ? [0, 0.4, 0.7, 1] : undefined,
                    repeat: status === "loading" ? Infinity : 0,
                  }}
                />
              </div>

              <div className='p-8'>
                {/* 상태 아이콘 */}
                <div className='flex justify-center mb-6'>
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      status === "loading"
                        ? "bg-primary/10"
                        : status === "success"
                          ? "bg-green-100"
                          : "bg-red-100"
                    }`}
                    animate={{
                      scale: [1, 1.05, 1], // rotate 줄 삭제
                    }}
                    transition={{
                      scale: { duration: 2, repeat: Infinity }, // rotate 관련 4줄 삭제
                    }}
                  >
                    {status === "loading" && <LoadingSpinner size='lg' />}
                    {status === "success" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 10,
                        }}
                      >
                        <CheckCircle className='w-8 h-8 text-green-600' />
                      </motion.div>
                    )}
                    {status === "error" && (
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: [0, 10, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg
                          className='w-8 h-8 text-red-600'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* 상태 메시지 */}
                <motion.div
                  className='text-center'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className='text-xl font-bold mb-2'>
                    {status === "loading" && "로그인 정보 확인 중..."}
                    {status === "success" && user && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 12,
                          delay: 0.2,
                        }}
                      >
                        {`${greeting.text}, ${user.name}님!`}
                      </motion.span>
                    )}
                    {status === "error" && "로그인 실패"}
                  </h2>
                  <p className='text-muted-foreground mb-6'>
                    {status === "loading" && "잠시만 기다려주세요"}
                    {status === "success" && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 10,
                          delay: 0.4,
                        }}
                      >
                        곧 대시보드로 이동합니다
                      </motion.span>
                    )}
                    {status === "error" && errorMessage}
                  </p>
                </motion.div>

                {/* 사용자 정보 (성공 시에만 표시) */}
                {status === "success" && user && (
                  <motion.div
                    className='mt-6 p-4 bg-muted/50 rounded-lg'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className='space-y-3 text-sm'>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>이메일:</span>
                        <span className='font-medium'>{user.email}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>권한:</span>
                        <span className='font-medium'>
                          {user.userRole
                            ? user.userRole === "LEADER"
                              ? "팀장"
                              : "팀원"
                            : "권한 없음"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatedItem>
        </div>
      </AnimatedLayout>
    </div>
  );
}
