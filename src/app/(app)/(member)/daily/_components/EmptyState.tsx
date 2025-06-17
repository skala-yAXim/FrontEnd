import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

/**
 * 설계서 제약사항: "아직 생성된 데일리 보고서가 없습니다." 예외 문구 표시
 * 서버 컴포넌트 - 상태가 없고 정적인 UI
 */
export function EmptyState() {
  return (
    <Card className='overflow-hidden border bg-gradient-to-b from-card to-card/80 shadow-xl shadow-primary/5'>
      <CardContent className='flex flex-col items-center justify-center py-16'>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className='text-6xl mb-6 bg-primary/10 p-6 rounded-full'
        >
          📝
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <CardTitle className='mb-3 text-2xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80'>
            아직 생성된 데일리 보고서가 없습니다.
          </CardTitle>
        </motion.div>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className='text-muted-foreground mb-8 text-center max-w-md'
        >
          데일리 보고서는 자동으로 생성됩니다. 잠시 후 다시 확인해보세요.
        </motion.p>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            variant='outline'
            className='border-primary/20 hover:border-primary/40 hover:bg-primary/5'
          >
            새로고침
          </Button>
        </motion.div>

        {/* 배경 효과 */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none' />
        <div className='absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl' />
        <div className='absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl' />
      </CardContent>
    </Card>
  );
}
