import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export function LoadingSpinner({
  size = "md",
  className,
}: LoadingSpinnerProps) {
  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* 보라색 그라데이션 스피너 */}
      <div
        className='absolute inset-0 rounded-full animate-spin'
        style={{
          background: `conic-gradient(from 0deg, transparent, hsl(var(--primary)))`,
        }}
      />
      {/* 내부 흰색 원 */}
      <div className='absolute inset-1 bg-background rounded-full' />
    </div>
  );
}
