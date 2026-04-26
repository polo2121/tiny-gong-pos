"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function getThemeClass(pathname: string) {
  if (pathname.startsWith("/workspace/inventory")) return "theme-inventory";
  if (pathname.startsWith("/workspace/sales")) return "theme-sales";
  if (pathname.startsWith("/workspace/reports")) return "theme-reports";
  if (pathname.startsWith("/workspace/settings")) return "theme-settings";
  return "theme-workspace";
}

export function SectionTheme({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const themeClass = getThemeClass(pathname);

  return <main className={cn(themeClass)}>{children}</main>;
}
