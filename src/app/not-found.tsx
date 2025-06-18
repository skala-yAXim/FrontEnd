// app/not-found.js

"use client";

import { GoBackButton } from "@/components/ui/GoBackButton"; // 경로 확인
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // ShadCN UI 경로 확인
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 페이지 로드 시 배경 애니메이션 효과
    const interval = setInterval(() => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      const color = `rgba(${r}, ${g}, ${b}, 0.03)`;

      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.backgroundColor = color;
      bubble.style.width = `${Math.random() * 100 + 50}px`;
      bubble.style.height = `${Math.random() * 100 + 50}px`;

      const container = document.querySelector(".bubble-container");
      if (container) {
        container.appendChild(bubble);

        setTimeout(() => {
          if (bubble && bubble.parentNode) {
            bubble.parentNode.removeChild(bubble);
          }
        }, 4000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // 숫자 애니메이션 변수
  const numberVariants = {
    hidden: { opacity: 0, y: -100, scale: 0.5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2,
        duration: 0.8,
      },
    },
  };

  // 텍스트 애니메이션 변수
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.6,
      },
    }),
  };

  // 카드 애니메이션 변수
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-background/90 p-4 overflow-hidden'>
      {/* 배경 효과 */}
      <div className='bubble-container absolute inset-0 overflow-hidden pointer-events-none' />

      {/* 배경 그라디언트 원 */}
      <motion.div
        className='absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl'
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
        className='absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-secondary/20 to-secondary/5 blur-3xl'
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* 메인 카드 */}
      <motion.div
        className='relative z-10 w-full max-w-md'
        initial='hidden'
        animate={mounted ? "visible" : "hidden"}
        whileHover='hover'
        variants={cardVariants as Variants}
      >
        <Card className='w-full backdrop-blur-sm bg-card/80 border-primary/10 shadow-xl overflow-hidden'>
          <CardHeader className='relative overflow-hidden pb-8'>
            {/* 숫자 404 */}
            <motion.div
              className='flex justify-center'
              variants={numberVariants as Variants}
            >
              <span className='text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-tighter'>
                404
              </span>
            </motion.div>

            <motion.div custom={0} variants={textVariants as Variants}>
              <CardTitle className='text-2xl font-bold text-center mt-4'>
                페이지를 찾을 수 없습니다
              </CardTitle>
            </motion.div>

            <motion.div custom={1} variants={textVariants as Variants}>
              <CardDescription className='text-center text-base mt-2'>
                요청하신 페이지가 존재하지 않습니다
              </CardDescription>
            </motion.div>

            {/* 장식 요소 */}
            <motion.div
              className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full bg-gradient-to-r from-primary/40 to-secondary/40'
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
          </CardHeader>

          <CardContent>
            <motion.p
              className='text-center text-muted-foreground'
              custom={2}
              variants={textVariants as Variants}
            >
              요청하신 페이지가 이동되었거나 삭제되었을 수 있습니다.
              <br />
              URL을 다시 한번 확인해주세요.
            </motion.p>
          </CardContent>

          <CardFooter className='flex justify-center pb-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GoBackButton />
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* 부유하는 요소들 */}
      <motion.div
        className='absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-primary/20'
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className='absolute bottom-1/4 right-1/3 w-6 h-6 rounded-full bg-secondary/20'
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className='absolute top-1/3 right-1/4 w-4 h-4 rounded-sm bg-primary/10'
        animate={{
          rotate: [0, 180, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
}
