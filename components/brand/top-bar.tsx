import Link from "next/link";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

export function TopBar({ title, dark = false }: { title?: string; dark?: boolean }) {
  return (
    <header
      className={cn(
        "safe-x safe-top sticky top-0 z-40 flex items-center justify-between pb-3 backdrop-blur-2xl",
        dark ? "bg-black/82 text-white" : "bg-background/82 text-foreground"
      )}
    >
      <Link href="/home" aria-label="Steilar home">
        {title ? <span className="text-[12px] font-semibold">{title}</span> : <Logo dark={dark} />}
      </Link>
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="icon" className={cn("h-9 w-9", dark && "text-white hover:bg-white/8")} aria-label="Notifications">
          <Link href="/notifications">
            <Bell className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="ghost" size="icon" className={cn("h-9 w-9", dark && "text-white hover:bg-white/8")} aria-label="Settings">
          <Link href="/settings">
            <Menu className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
