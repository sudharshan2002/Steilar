import { cn } from "@/lib/utils";

export function Logo({
  className,
  markOnly = false,
  dark = false
}: {
  className?: string;
  markOnly?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span className={cn("flex items-center justify-center overflow-hidden", markOnly ? "h-8 w-8" : "h-9 w-9 rounded-xl bg-black")}>
        <img
          src={dark || markOnly ? "/Logo/logo only.png" : "/Logo/logo filled.png"}
          alt="Steilar"
          className={cn(markOnly ? "h-8 w-8 object-contain" : "h-full w-full object-cover")}
        />
      </span>
      {!markOnly && <span className="text-[1.35rem] font-semibold tracking-[-0.03em]">Steilar</span>}
    </div>
  );
}
