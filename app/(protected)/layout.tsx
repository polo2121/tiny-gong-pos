import type { ReactNode } from "react";
import IdleLogout from "@/features/auth/IdleLogout";
import { requireSession } from "@/lib/auth/require-session";
import { signOut } from "@/features/auth/server/actions/sign-out";

type ProtectedLayoutProps = {
  children: ReactNode;
};

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  await requireSession();

  return (
    <>
      <section className="text-slate-900 bg-slate-200 p-8">
        <header className="w-full text-center font-bold text-lg">
          Tiny Gong
        </header>
      </section>
      <header className="flex items-center justify-between border-b bg-white px-4 py-3">
        <h1 className="text-sm font-semibold text-slate-900">Tiny Gong POS</h1>

        <form action={signOut}>
          <button
            type="submit"
            className="rounded-lg border px-3 py-2 text-sm font-medium text-slate-700"
          >
            Sign out
          </button>
        </form>
      </header>

      <IdleLogout />
      {children}
    </>
  );
}
