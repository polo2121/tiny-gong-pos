import React from "react";
import { Button } from "@/components/ui/button";

const PrimaryButton = ({ type, text }) => {
  const buttonColor = {
    sale: "bg-green-500 hover:bg-green-600 text-white",
  };

  return (
    <a
      href="/sales"
      className={`relative overflow-hidden group select-none touch-none flex flex-col justify-end gap-2 w-fit h-fit px-2 py-1.5 rounded-home border border-brown-550 bg-brown-600 text-white shadow-drop-primary-sale-btn transition-transform will-change-transform animate-(--anim-bubble) active:animate-(--anim-bubble-press) focus-visible:none bubble-button`}
      style={{ WebkitTouchCallout: "none" }}
    >
      {/* shine effect */}
      <div className="w-full h-full absolute left-0 bottom-0  z-30 touch-none select-none bg-amer-300 shine animate-(--anim-shine-origin-xs)">
        <div className=" w-4 h-20 relative -top-4 left-0 flex bg-white/20 rotate-45"></div>
        <div className=" w-4 h-20 relative -top-24 left-7 flex bg-white/20 rotate-45"></div>
      </div>

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
      <div className="w-fit h-fit overflow-hidden flex justify-end relative z-10">
        <Button className="bg-transparent border-none text-white text-sm font-margarine">
          {text}
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
        </Button>
      </div>

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
    </a>
  );
};

export default PrimaryButton;
