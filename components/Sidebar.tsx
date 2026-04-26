"use client";

import { ReactNode, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { motion } from "motion/react";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";

/* =========================
   ICONS
========================= */

import InventoryIcon from "@/components/SVG/SidebarIcons/InventoryIcon";
import SalesIcon from "@/components/SVG/SidebarIcons/SalesIcon";
import CapitalsIcon from "@/components/SVG/SidebarIcons/CapitalsIcon";
import ReportsIcon from "@/components/SVG/SidebarIcons/ReportsIcon";
import ExpensesIcon from "@/components/SVG/SidebarIcons/ExpensesIcon";
import CustomersIcon from "@/components/SVG/SidebarIcons/CustomersIcon";
import InvoicesIcon from "@/components/SVG/SidebarIcons/InvoicesIcon";
import StockIcon from "@/components/SVG/SidebarIcons/StocksIcon";
import SettingIcon from "@/components/SVG/SidebarIcons/SettingIcon";

/* =========================
   TYPES
========================= */

type SidebarProps = {
  children: React.ReactNode;
  onSignOut: () => void;
};

/* =========================
   NAV CONFIG
========================= */

const NAV_ITEMS = [
  { label: "sales", href: "/workspace/sales" },
  { label: "stocks", href: "/workspace/stocks" },
  { label: "inventory", href: "/workspace/inventory" },
  { label: "capitals", href: "/workspace/capitals" },
  { label: "reports", href: "/workspace/reports" },
  { label: "expenses", href: "/workspace/expenses" },
  { label: "customers", href: "/workspace/customers" },
  { label: "invoices", href: "/workspace/invoices" },
  { label: "settings", href: "/workspace/settings" },
];

/* =========================
   ICON MAP (cleaner than switch)
========================= */

const ICON_MAP: Record<string, (active: boolean) => ReactNode> = {
  inventory: (active) => <InventoryIcon active={active} />,
  stocks: (active) => <StockIcon active={active} />,
  sales: (active) => <SalesIcon active={active} />,
  capitals: (active) => <CapitalsIcon active={active} />,
  reports: (active) => <ReportsIcon active={active} />,
  expenses: (active) => <ExpensesIcon active={active} />,
  customers: (active) => <CustomersIcon active={active} />,
  invoices: (active) => <InvoicesIcon active={active} />,
  settings: (active) => <SettingIcon active={active} />,
};

const getIcon = (name: string, active: boolean) =>
  ICON_MAP[name]?.(active) ?? null;

/* =========================
   COMPONENT
========================= */

export default function SidebarLayout({ children, onSignOut }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-40",
          "transform bg-white font-quicksand font-semibold transition-transform duration-300",
          "lg:translate-x-0 lg:bg-slate-100",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-center">
          <span className="text-base font-bold">Tiny Gong</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-2">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "group relative flex items-center justify-start gap-2",
                  "rounded-full px-4 py-2 text-sm font-semibold capitalize",
                  "text-slate-900 transition hover:text-theme-primary-500",
                  "hover:scale-90 hover:scale-3d",
                  active && "bg-theme-primary-100 text-theme-primary-900",
                )}
              >
                <span className="flex items-center justify-center">
                  {getIcon(item.label, active)}
                </span>

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <motion.div
          whileHover={{ y: 4 }}
          whileTap={{ scale: 0.6 }}
          className="mt-auto cursor-pointer p-4"
        >
          <button
            onClick={onSignOut}
            className={cn(
              "w-full rounded-lg border px-4 py-2 text-sm",
              "font-quicksand font-semibold text-slate-700",
              "hover:bg-slate-50",
            )}
          >
            Sign out
          </button>
        </motion.div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex flex-1 flex-col">
        {/* Topbar (mobile) */}
        <header
          className={cn(
            "fixed left-0 top-0 z-30 flex w-full items-center justify-between",
            "border-b border-white/20 bg-white/70 px-4 py-3 backdrop-blur-md",
            "font-quicksand lg:hidden",
          )}
        >
          <Button variant="bubble" size="sm" onClick={() => setOpen(true)}>
            Menu
          </Button>

          <div className="flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="logo-text"
              width={100}
              height={100}
              priority
              className="w-20 object-contain"
            />
          </div>

          <div />
        </header>

        {/* Content */}
        <main className="flex-1 p-2 mt-12 lg:mt-0 lg:ml-40">{children}</main>
      </div>
    </div>
  );
}
