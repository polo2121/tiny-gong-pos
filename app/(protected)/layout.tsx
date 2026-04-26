import type { ReactNode } from "react";
import Image from "next/image";

import IdleLogout from "@/features/auth/IdleLogout";
import { requireSession } from "@/lib/auth/require-session";
import { signOut } from "@/features/auth/server/actions/sign-out";
import { SectionTheme } from "@/components/SectionTheme";
import Sidebar from "@/components/Sidebar";

type ProtectedLayoutProps = {
  children: ReactNode;
};

function getThemeClass(pathname: string) {
  if (pathname.startsWith("/workspace/inventory")) return "theme-inventory";
  if (pathname.startsWith("/workspace/sales")) return "theme-sales";
  if (pathname.startsWith("/workspace/reports")) return "theme-reports";
  if (pathname.startsWith("/workspace/settings")) return "theme-settings";
  return "theme-workspace";
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  await requireSession();

  return (
    <SectionTheme>
      <Sidebar onSignOut={signOut}>{children}</Sidebar>
      {/* Session Handling */}
      <IdleLogout />
    </SectionTheme>
  );
}
