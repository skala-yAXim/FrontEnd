import { cn } from "@/lib/utils";
import * as React from "react";

const CardAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-end p-6 pt-0 space-x-2",
      className
    )}
    {...props}
  />
));
CardAction.displayName = "CardAction";

export { CardAction };
