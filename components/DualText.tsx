import { cn } from "@/lib/utils";
import React from "react";

type DualTextSize = "sm" | "md" | "lg";

type DualTextProps = {
  primary: string;
  secondary: string;
  size: DualTextSize;
  className?: string;
};

const SIZE_STYLES: Record<
  DualTextSize,
  { primary: string; secondary: string }
> = {
  sm: {
    primary: "text-xs sm:text-base line-clamp-1",
    secondary: "text-[10px]  md:text-xs lg:text-sm text-gray-500 line-clamp-1",
  },
  md: {
    primary: "text-2xl font-bold",
    secondary: "text-base text-gray-500 line-clamp-1",
  },
  lg: {
    primary: "text-3xl font-black",
    secondary: "text-sm text-gray-500 sm:text-lg",
  },
};

const DualText = ({
  primary,
  secondary,
  size = "md",
  className = "",
}: DualTextProps) => {
  const styles = SIZE_STYLES[size];

  return (
    <div
      className={cn(
        "font-margarine capitalize text-theme-primary-800 ",
        className,
      )}
    >
      <h2 className={cn("", styles.primary)}>{primary}</h2>
      <p className={cn("font-umoe", styles.secondary)}>({secondary})</p>
    </div>
  );
};

export default DualText;
