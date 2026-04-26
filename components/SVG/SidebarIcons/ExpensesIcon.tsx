import React from "react";
import { cn } from "@/lib/utils";

const ExpensesIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      viewBox="0 0 17 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4.5 w-4.5 shrink-0"
    >
      <path
        d="M0.5 17.1458V6.55426C0.5 3.70025 0.5 2.27325 1.37868 1.38663C2.25736 0.5 3.67157 0.5 6.5 0.5H10.5C13.3284 0.5 14.7426 0.5 15.6213 1.38663C16.5 2.27325 16.5 3.70025 16.5 6.55426V17.1458C16.5 18.6575 16.5 19.4133 16.038 19.7108C15.2831 20.1971 14.1161 19.1774 13.5291 18.8073C13.0441 18.5014 12.8017 18.3485 12.5325 18.3397C12.2417 18.3301 11.9949 18.4768 11.4709 18.8073L9.56 20.0124C9.0445 20.3374 8.7868 20.5 8.5 20.5C8.2132 20.5 7.9555 20.3374 7.44 20.0124L5.52913 18.8073C5.04415 18.5014 4.80166 18.3485 4.53253 18.3397C4.24172 18.3301 3.99493 18.4768 3.47087 18.8073C2.88395 19.1774 1.71687 20.1971 0.96195 19.7108C0.5 19.4133 0.5 18.6575 0.5 17.1458Z"
        stroke="#424546"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 4.5H4.5"
        stroke="#424546"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 8.5H4.5"
        stroke="#424546"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 8.375C10.1716 8.375 9.5 8.9626 9.5 9.6875C9.5 10.4124 10.1716 11 11 11C11.8284 11 12.5 11.5876 12.5 12.3125C12.5 13.0374 11.8284 13.625 11 13.625M11 8.375C11.6531 8.375 12.2087 8.7402 12.4146 9.25M11 8.375V7.5M11 13.625C10.3469 13.625 9.7913 13.2598 9.5854 12.75M11 13.625V14.5"
        stroke="#424546"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "group-hover:stroke-theme-primary-500 transition-stroke ease-in-out duration-300",
          active && "stroke-theme-primary-500",
        )}
      />
    </svg>
  );
};

export default ExpensesIcon;
