import React from "react";
import { cn } from "@/lib/utils";

const StockIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4.5 w-4.5 shrink-0"
    >
      <path
        d="M7.5 16.6998C6.86362 16.6998 6.25571 16.4437 5.03983 15.9316C2.01328 14.6569 0.5 14.0195 0.5 12.9473V5.45491M7.5 16.6998C8.13638 16.6998 8.74429 16.4437 9.96019 15.9316C12.9868 14.6569 14.5 14.0195 14.5 12.9473V5.45491M7.5 16.6998V8.94469M0.5 5.45491C0.5 5.93126 1.12344 6.23205 2.37034 6.83365L4.64238 7.92985C6.04462 8.60644 6.74579 8.94469 7.5 8.94469M0.5 5.45491C0.5 4.97857 1.12344 4.67778 2.37034 4.07619L3.61111 3.47754M14.5 5.45491C14.5 5.93126 13.8765 6.23205 12.6297 6.83365L10.3576 7.92985C8.95538 8.60644 8.25421 8.94469 7.5 8.94469M14.5 5.45491C14.5 4.97857 13.8765 4.67777 12.6297 4.07619L11.3889 3.47754M2.83333 9.72022L4.38889 10.4957"
        stroke="#424546"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 0.5V2.69989M7.5 2.69989V4.89978M7.5 2.69989H5.30011M7.5 2.69989H9.69989"
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

export default StockIcon;
