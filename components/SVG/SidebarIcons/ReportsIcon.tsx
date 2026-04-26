import React from "react";
import { cn } from "@/lib/utils";

const ReportsIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 shrink-0"
    >
      <path
        d="M3.81592 11.9209V10.4473"
        stroke="#424546"
        strokeLinecap="round"
      />
      <path d="M7.5 11.921V9.71045" stroke="#424546" strokeLinecap="round" />
      <path
        d="M11.1841 11.921V8.23682"
        stroke="#424546"
        strokeLinecap="round"
      />
      <path
        d="M0.5 7.5C0.5 4.20017 0.5 2.55026 1.52512 1.52512C2.55026 0.5 4.20017 0.5 7.5 0.5C10.7998 0.5 12.4497 0.5 13.4749 1.52512C14.5 2.55026 14.5 4.20017 14.5 7.5C14.5 10.7998 14.5 12.4497 13.4749 13.4749C12.4497 14.5 10.7998 14.5 7.5 14.5C4.20017 14.5 2.55026 14.5 1.52512 13.4749C0.5 12.4497 0.5 10.7998 0.5 7.5Z"
        stroke="#424546"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.073 7.12142C4.66097 7.17433 8.26177 6.93463 10.3099 3.68407M8.96782 3.29135L10.3498 3.06893C10.5182 3.04748 10.7655 3.18046 10.8263 3.33898L11.1917 4.54625"
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

export default ReportsIcon;
