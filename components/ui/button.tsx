"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { CurveIcon } from "@/components/CurveIcon";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { useLayoutEffect, useRef, useState } from "react";

const bubbleStripeTransition = {
  duration: 0.3,
  ease: "easeOut" as const,
};

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-margarine font-medium transition-all text-theme-primary-800 text-white relative overflow-hidden border-3 border-[#EEEEEE] group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        inventory: "bg-theme-primary-500",
        bubble: "bg-theme-primary-btn-bg btn-press active:scale-80",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 p-6 shadow-[inset_0_6px_0_0_rgba(255,255,255,0.25)] text-lg",
        xl: "h-30 gap-2 px-4 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 p-6 shadow-[inset_0_6px_0_0_rgba(255,255,255,0.25)] text-xl rounded-2xl",

        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
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

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useLayoutEffect(() => {
    const width = buttonRef.current?.getBoundingClientRect().width ?? 0;
    setButtonWidth(width);
  }, []);

  return (
    <motion.div
      initial="initial"
      whileHover="active"
      whileTap="active"
      className="inline-flex"
    >
      <ButtonPrimitive
        ref={buttonRef}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isBubble && (
          <>
            <motion.div
              variants={{
                initial: { x: 0 },
                active: { x: (buttonWidth ?? 0) * 1 },
              }}
              transition={bubbleStripeTransition}
              className="absolute left-0 btn-press"
            >
              <svg
                width="119"
                height="137"
                viewBox="0 0 119 137"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  opacity="0.2"
                  x="95.3101"
                  y="10.0327"
                  width="27.3545"
                  height="130.425"
                  rx="12.5"
                  transform="rotate(30 95.3101 10.0327)"
                  fill="#FCFFF8"
                />
                <rect
                  opacity="0.2"
                  x="65.2124"
                  width="27.3545"
                  height="130.425"
                  rx="12.5"
                  transform="rotate(30 65.2124 0)"
                  fill="#FCFFF8"
                />
              </svg>
            </motion.div>

            <CurveIcon className="absolute left-2 top-2 size-3 rotate-180" />
            <CurveIcon className="absolute right-2 top-7 size-3" />
          </>
        )}
        <span className="relative z-10">{children}</span>
      </ButtonPrimitive>
    </motion.div>
  );
}

export { Button, buttonVariants };
