"use client";

import { containerVariants, itemVariants } from "@/const/animate";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedLayoutProps {
  children: React.ReactNode;
}

export function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div
      initial='hidden'
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
      className='w-full'
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={itemVariants} className='w-full'>
      {children}
    </motion.div>
  );
}
