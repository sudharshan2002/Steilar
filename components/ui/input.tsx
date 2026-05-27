import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-full border border-border/70 bg-white/55 px-5 text-sm shadow-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-primary/40 focus:bg-white/80 focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/12 dark:bg-[#171717]/88 dark:text-white dark:placeholder:text-white/34 dark:focus:border-white/32 dark:focus:bg-[#171717]/88 dark:focus:ring-white/10",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
