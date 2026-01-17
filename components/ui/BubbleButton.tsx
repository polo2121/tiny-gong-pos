import React from "react";
import { Button } from "@/components/ui/button";

type BaseProps = {
  href?: string;
  variant?: "brown" | "stock" | "product";
  icon: boolean;
  children?: React.ReactNode;
};
type AnchorProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };
type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type BubbleButtonProps = AnchorProps | ButtonProps;

const BubbleButton = ({
  href,
  variant,
  icon = false,
  children,
}: BubbleButtonProps) => {
  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      style={{ WebkitTouchCallout: "none" }}
      className={`bubble-button group`}
      data-variant="brown"
    >
      {/* shine effect */}
      <div className="w-full h-full absolute left-0 bottom-0  z-30 pointer-events-none bg-amer-300 shine animate-(--anim-shine-origin-xs)">
        <div className=" w-4 h-20 relative -top-4 left-0 flex bg-white/20 rotate-45"></div>
        <div className=" w-4 h-20 relative -top-24 left-7 flex bg-white/20 rotate-45"></div>
      </div>

      {/* Top Highlight */}
      <svg
        className="absolute top-1 left-1 z-10"
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.00024 7.5C1.83358 5.5 4.40024 1.4 8.00024 1"
          stroke="#EEE1D4"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Button Content  */}
      <span className="flex justify-center items-center gap-2 border-none text-white text-sm font-margarine">
        {children}
        {icon ? (
          <svg
            className="size-2"
            viewBox="0 0 2 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.989743 3.08898e-08L-2.38419e-07 2L1.97949 2L0.989743 3.08898e-08Z"
              fill="#FCFFF8"
            />
          </svg>
        ) : (
          ""
        )}
      </span>

      {/* Bottom Right Highlight */}
      <svg
        className="absolute bottom-1 right-1"
        width="9"
        height="10"
        viewBox="0 0 9 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.00024 8.5C3.33358 8 8.00024 5.8 8.00024 1"
          stroke="#EEE1D4"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Component>
  );
};

export default BubbleButton;
