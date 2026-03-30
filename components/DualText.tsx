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
    primary: "text-sm font-semibold",
    secondary: "text-[10px] text-gray-500",
  },
  md: {
    primary: "text-lg font-bold",
    secondary: "text-[10px] text-gray-500",
  },
  lg: {
    primary: "text-3xl font-black",
    secondary: "text-sm text-gray-500",
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
    <div className={className}>
      <h2 className={styles.primary}>{primary}</h2>
      <p className={styles.secondary}>({secondary})</p>
    </div>
  );
};

export default DualText;
