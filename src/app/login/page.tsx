"use client";

import { ThemeToggleButton } from "@/components/theme/ThemeToggleButton";
import { motion } from "framer-motion";
import { BrandingSection } from "./components/BrandingSection";
import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className='min-h-screen flex relative overflow-hidden'>
      {/* 배경 그라데이션 애니메이션 */}
      <motion.div
        className='absolute inset-0 -z-10 bg-gradient-to-br from-background/80 to-muted/50 opacity-60'
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* 장식용 원형 요소들 */}
      <motion.div
        className='absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl'
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className='absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl'
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      {/* 테마 토글 */}
      <motion.div
        className='absolute top-4 right-4 z-10'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ThemeToggleButton />
      </motion.div>

      {/* 좌측 브랜딩 영역 */}
      <BrandingSection />

      {/* 우측 로그인 폼 */}
      <motion.div
        className='flex-1 flex items-center justify-center'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.2,
        }}
      >
        <LoginForm />
      </motion.div>
    </div>
  );
}
