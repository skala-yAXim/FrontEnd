"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleMicrosoftLogin = () => {
    setIsLoading(true);
    // Microsoft OAuth 로직
    router.push(
      `${process.env.NEXT_PUBLIC_SERVER_CLIENT_SIDE_URL}/oauth2/authorization/azure`
    );
  };

  return (
    <div className='flex-1 flex items-center justify-center h-full'>
      <motion.div
        className='w-full max-w-md space-y-8 px-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.3,
        }}
      >
        {/* 헤더 */}
        <div className='text-center'>
          <motion.h1
            className='text-3xl font-bold text-black dark:text-white'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            로그인
          </motion.h1>
          <motion.p
            className='mt-2 text-gray-600 dark:text-gray-400'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Microsoft 계정으로 로그인하십시오
          </motion.p>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <motion.div
          className='space-y-3'
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.8,
            type: "spring",
            stiffness: 120,
            damping: 10,
          }}
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={handleMicrosoftLogin}
              variant='outline'
              className='w-full flex items-center justify-center px-4 py-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 hover:text-black dark:hover:bg-gray-700 dark:hover:text-black transition-colors shadow-sm'
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner size='sm' className='mr-2' />
              ) : (
                <motion.svg
                  className='w-5 h-5 mr-3'
                  viewBox='0 0 21 21'
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    repeatDelay: 5,
                  }}
                >
                  <rect x='1' y='1' width='9' height='9' fill='#f25022' />
                  <rect x='12' y='1' width='9' height='9' fill='#00a4ef' />
                  <rect x='1' y='12' width='9' height='9' fill='#ffb900' />
                  <rect x='12' y='12' width='9' height='9' fill='#7fba00' />
                </motion.svg>
              )}
              {isLoading ? "로그인 중..." : "Sign in with Microsoft"}
            </Button>
          </motion.div>
        </motion.div>

        {/* 추가 정보 */}
        <motion.div
          className='mt-8 text-center text-sm text-gray-500 dark:text-gray-400'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p>
            로그인하면 서비스 이용약관 및 개인정보 처리방침에 동의하는 것으로
            간주됩니다.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
