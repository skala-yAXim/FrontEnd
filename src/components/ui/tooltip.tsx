'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TooltipProviderProps {
  children: React.ReactNode;
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
  return <>{children}</>;
};

interface TooltipProps {
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  return <>{children}</>;
};

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const TooltipTrigger = React.forwardRef<HTMLDivElement, TooltipTriggerProps>(
  ({ className, asChild, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref,
        className: cn(className, children.props.className),
        ...props,
      } as any);
    }

    return (
      <div
        ref={ref}
        className={cn('cursor-pointer', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TooltipTrigger.displayName = 'TooltipTrigger';

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, side = 'top', align = 'center', ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
          {
            'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2': side === 'top',
            'absolute top-full left-1/2 transform -translate-x-1/2 mt-2': side === 'bottom',
            'absolute left-full top-1/2 transform -translate-y-1/2 ml-2': side === 'right',
            'absolute right-full top-1/2 transform -translate-y-1/2 mr-2': side === 'left',
          },
          className
        )}
        {...props}
      />
    );
  }
);
TooltipContent.displayName = 'TooltipContent';

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
};
