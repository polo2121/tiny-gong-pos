import React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { StripeShape } from "./StripeShape";
import { CurveIcon } from "./CurveIcon";

const navigationLinkVariants = cva(
  "flex h-48 flex-col justify-end rounded-[36px] border-5 border-[#EEEEEE] px-5 py-6 text-white shadow-[inset_0_8px_0_0_rgba(255,255,255,0.25)] transition-colors  relative group bubble-press active:scale-95 btn-press",
  {
    variants: {
      variant: {
        default: "bg-theme-inventory text-slate-900 ",
        inventory: "bg-theme-inventory  ",
        sales: "bg-theme-sales  ",
        stocks: "bg-theme-stocks ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type NavigationLinkProps = {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
} & VariantProps<typeof navigationLinkVariants>;

const NavigationLink = ({
  href,
  children,
  icon,
  variant,
  className,
}: NavigationLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(navigationLinkVariants({ variant }), className)}
    >
      <StripeShape className="relative right-52 bottom-18 transition-transform duration-300 ease-out group-hover:translate-x-full bg-amer-900 h-100" />
      <CurveIcon className="absolute left-4 top-4 rotate-180 size-3" />
      <CurveIcon className="absolute right-4 bottom-4 size-3" />
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span className="flex flex-col gap-3">{children}</span>
    </Link>
  );
};

export default NavigationLink;
