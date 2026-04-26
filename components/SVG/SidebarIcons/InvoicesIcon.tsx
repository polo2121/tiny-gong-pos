import React from "react";
import { cn } from "@/lib/utils";

const InvoicesIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4.5 w-4.5 shrink-0"
    >
      <path
        d="M18.516 0.5C17.4026 0.5 16.5 3.18629 16.5 6.5H18.516C19.4876 6.5 19.9734 6.5 20.2741 6.16455C20.5749 5.82909 20.5225 5.38733 20.4178 4.50381C20.1414 2.17143 19.3943 0.5 18.516 0.5Z"
        stroke="#424546"
      />
      <path
        d="M16.5 6.55426V17.1458C16.5 18.6575 16.5 19.4133 16.038 19.7108C15.2831 20.1971 14.1161 19.1774 13.5291 18.8073C13.0441 18.5014 12.8017 18.3485 12.5325 18.3397C12.2417 18.3301 11.9949 18.4768 11.4709 18.8073L9.56 20.0124C9.0445 20.3374 8.7868 20.5 8.5 20.5C8.21321 20.5 7.95546 20.3374 7.44 20.0124L5.52913 18.8073C5.04415 18.5014 4.80166 18.3485 4.53253 18.3397C4.24172 18.3301 3.99493 18.4768 3.47087 18.8073C2.88395 19.1774 1.71687 20.1971 0.96195 19.7108C0.5 19.4133 0.5 18.6575 0.5 17.1458V6.55426C0.5 3.70025 0.5 2.27325 1.37868 1.38663C2.25736 0.5 3.67157 0.5 6.5 0.5H18.5"
        stroke="#424546"
      />

      <g
        stroke="#424546"
        className={cn(
          "group-hover:stroke-theme-primary-500 transition-[stroke] ease-in-out duration-300",
          active && "stroke-theme-primary-500",
        )}
      >
        <path d="M4.5 4.5H12.5" strokeLinecap="round" />
        <path d="M10.5 8.5H4.5" strokeLinecap="round" />
        <path d="M7.5 12.5H4.5" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export default InvoicesIcon;
