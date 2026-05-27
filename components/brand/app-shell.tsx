"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Images, Shirt, Sparkles, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/generate", label: "Create", icon: Shirt },
  { href: "/results", label: "Gallery", icon: Images },
  { href: "/stylist", label: "Stylist", icon: Sparkles },
  { href: "/profile", label: "Profile", icon: UserRound }
];

export function AppShell({
  children,
  tone = "light",
  showNav = true
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  showNav?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className={cn("min-h-dvh", tone === "dark" && "dark bg-black text-white")}>
      <main className={cn("mx-auto min-h-dvh w-full max-w-md", showNav ? "pb-24" : "pb-0")}>{children}</main>
      {showNav && <nav className="safe-x safe-bottom fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md">
        <div className="grid grid-cols-5 rounded-[1.55rem] border border-black/10 bg-white/85 p-1.5 shadow-glass backdrop-blur-2xl dark:border-white/10 dark:bg-black/70">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-12 flex-col items-center justify-center gap-0.5 rounded-[1.15rem] text-[9px] font-medium text-muted-foreground transition",
                  active && "bg-black text-white shadow-glass dark:bg-white dark:text-black"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>}
    </div>
  );
}
