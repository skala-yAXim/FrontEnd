"use client";

import { motion } from "framer-motion";

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.8 + i * 0.2,
      duration: 0.5,
    },
  }),
};

export function BrandingSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 to-orange-500 dark:from-red-600 dark:to-orange-500 items-center justify-center p-12 relative overflow-hidden'
    >
      {/* 장식용 배경 요소 */}
      <motion.div
        className='absolute inset-0 bg-gradient-to-br from-red-600/80 to-orange-500/80'
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className='absolute top-0 left-0 w-full h-full'
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)",
        }}
      />

      <motion.div
        className='absolute bottom-0 right-0 w-full h-full'
        style={{
          background:
            "radial-gradient(circle at 70% 80%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)",
        }}
      />

      <div className='text-center text-white relative z-10'>
        <motion.div
          className='mb-8'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.3,
          }}
        >
          {/* 보고서 로고 */}
          <div className='w-32 h-32 mx-auto bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm'>
            <motion.div
              className='flex items-center justify-center'
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.5,
              }}
            >
              <motion.svg
                className='w-20 h-20 text-white'
                viewBox='0 0 32 32'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.7,
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <g>
                  <motion.rect
                    x='10'
                    y='18'
                    width='8'
                    height='2'
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.1 }}
                  />
                  <motion.rect
                    x='10'
                    y='13'
                    width='12'
                    height='2'
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.0 }}
                  />
                  <motion.rect
                    x='10'
                    y='23'
                    width='5'
                    height='2'
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2 }}
                  />
                  <motion.path
                    d='M25,5H22V4a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2V5H7A2,2,0,0,0,5,7V28a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V7A2,2,0,0,0,25,5ZM12,4h8V8H12ZM25,28H7V7h3v3H22V7h3Z'
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      delay: 0.8,
                    }}
                  />
                </g>
              </motion.svg>
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          className='text-4xl font-bold mb-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          yAXim
        </motion.h1>

        <motion.p
          className='text-xl opacity-90 mb-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          SK AX 업무 관리 플랫폼에 오신 것을 환영합니다
        </motion.p>

        <div className='space-y-4 text-left'>
          <motion.div
            className='flex items-center space-x-3'
            custom={0}
            initial='hidden'
            animate='visible'
            variants={featureVariants}
          >
            <motion.div
              className='w-6 h-6 bg-white/30 rounded-full flex items-center justify-center'
              whileHover={{
                scale: 1.2,
                backgroundColor: "rgba(255,255,255,0.4)",
              }}
            >
              <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </motion.div>
            <span>강력한 보안의 Microsoft Teams 인증 시스템</span>
          </motion.div>

          <motion.div
            className='flex items-center space-x-3'
            custom={1}
            initial='hidden'
            animate='visible'
            variants={featureVariants}
          >
            <motion.div
              className='w-6 h-6 bg-white/30 rounded-full flex items-center justify-center'
              whileHover={{
                scale: 1.2,
                backgroundColor: "rgba(255,255,255,0.4)",
              }}
            >
              <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </motion.div>
            <span>개인 데일리 보고서 자동 생성</span>
          </motion.div>

          <motion.div
            className='flex items-center space-x-3'
            custom={2}
            initial='hidden'
            animate='visible'
            variants={featureVariants}
          >
            <motion.div
              className='w-6 h-6 bg-white/30 rounded-full flex items-center justify-center'
              whileHover={{
                scale: 1.2,
                backgroundColor: "rgba(255,255,255,0.4)",
              }}
            >
              <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </motion.div>
            <span>위클리 보고서 팀별 자동 관리</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
