import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full resize-none rounded-[1.6rem] border border-border/70 bg-white/55 px-5 py-4 text-sm leading-6 shadow-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-primary/40 focus:bg-white/80 focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/12 dark:bg-[#171717]/88 dark:text-white dark:placeholder:text-white/34 dark:focus:border-white/32 dark:focus:bg-[#171717]/88 dark:focus:ring-white/10",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
