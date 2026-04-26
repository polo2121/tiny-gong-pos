import React from "react";
import { cn } from "@/lib/utils";

const ProfitIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      viewBox="0 0 14 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 shrink-0"
    >
      <path
        d="M6.91667 0.5C3.37284 0.5 0.5 3.37283 0.5 6.91667C0.5 10.4605 3.37284 13.3333 6.91667 13.3333C10.4605 13.3333 13.3333 10.4605 13.3333 6.91667C13.3333 3.37284 10.4605 0.5 6.91667 0.5Z"
        fill="white"
        stroke="#424546"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.66675 15.1667C7.83341 15.1667 6.91675 16.5417 6.91675 16.5417C6.91675 16.5417 7.83341 17.9167 9.66675 17.9167C11.5001 17.9167 12.4167 16.5417 12.4167 16.5417C12.4167 16.5417 11.5001 15.1667 9.66675 15.1667Z"
        stroke="#424546"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.16675 15.1667C2.33341 15.1667 1.41675 16.5417 1.41675 16.5417C1.41675 16.5417 2.33341 17.9167 4.16675 17.9167C6.00008 17.9167 6.91675 16.5417 6.91675 16.5417C6.91675 16.5417 6.00008 15.1667 4.16675 15.1667Z"
        stroke="#424546"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.91675 18.8335V13.3335"
        stroke="#424546"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.48438 9.36114V4.47222M6.91667 4.47222V3.25M6.91667 10.5833V9.36114M5.48438 6.91667H8.34896M8.34896 6.91667C8.82361 6.91667 9.20833 7.32708 9.20833 7.83333V8.44448C9.20833 8.95075 8.82361 9.36114 8.34896 9.36114H4.625M8.34896 6.91667C8.82361 6.91667 9.20833 6.50626 9.20833 6V5.38889C9.20833 4.88263 8.82361 4.47222 8.34896 4.47222H4.625"
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

export default ProfitIcon;
