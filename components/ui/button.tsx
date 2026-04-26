"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { CurveIcon } from "@/components/SVG/CurveIcon";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { useLayoutEffect, useRef, useState } from "react";
import { BubbleEffect, CurveDecor, MagicalEffect } from "./button-effects";

const sparkleAnim = (delay = 0, offset = 0) => ({
  initial: { opacity: 1, scale: 1, y: 0 },
  active: {
    opacity: [0, 1, 0, 1],
    scale: [0.6, 1.2 + offset, 0.8],
    y: [0, -4 - offset * 5, 0],
    transition: {
      duration: 0.8,
      delay,
    },
  },
});

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-chewy font-medium transition-all text-theme-primary-800 text-white relative  border-3 border-[#EEEEEE] group cursor-pointer disabled:pointer-events-none disabled:opacity-50 capitalize ",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        bubble:
          "bg-theme-primary-btn-bg btn-press active:scale-80 overflow-hidden",
        magical:
          "border border-theme-primary-600 font-chewy text-theme-primary-600 btn-press hover:scale-99",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        sm: "px-6 shadow-[inset_0_4px_0_0_rgba(255,255,255,0.25)]",
        lg: "px-9 py-2 gap-1.5 shadow-[inset_0_6px_0_0_rgba(255,255,255,0.25)] text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  const isBubble = variant === "bubble";
  const isMagical = variant === "magical";

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useLayoutEffect(() => {
    const width = buttonRef.current?.getBoundingClientRect().width ?? 0;
    setButtonWidth(width);
  }, []);

  if (!size) size = "default";

  return (
    <motion.div
      initial="initial"
      whileHover="active"
      whileTap="active"
      className=""
    >
      <ButtonPrimitive
        ref={buttonRef}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isBubble && (
          <>
            <BubbleEffect size={size} width={buttonWidth} />
            <CurveDecor size={size} />
          </>
        )}

        {isMagical && <MagicalEffect size={size ?? "default"} />}

        <span className="relative z-10 line-clamp-1">{children}</span>
      </ButtonPrimitive>
    </motion.div>
  );
}

export { Button, buttonVariants };
