import React from "react";
import { Button } from "./ui/button";

const EditRowButton = () => {
  return (
    <Button className="w-16 py-5 rounded-full border border-brown-450 bg-brown-300 shadow-drop-mobile-menu relative hover:bg-accent group cursor-pointer focus-visible:none will-change-transform transition-transform select-none touch-none animate-(--anim-bubble) active:animate-(--anim-bubble-press) bubble-button overflow-hidden">
      {/* Up Hightlight */}
      <svg
        className="absolute top-0.5 left-1.5 z-10"
        style={{ width: 10 }}
        viewBox="0 0 17 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.7"
          d="M1.5 12C4.5 6 9 3 15.5003 1.5"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />
      </svg>

      {/* SVG Edit Icon */}
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.49189 1.87675L10.53 0.837994C10.7464 0.62158 11.04 0.5 11.346 0.5C11.6521 0.5 11.9456 0.62158 12.162 0.837994C12.3784 1.05441 12.5 1.34793 12.5 1.65398C12.5 1.96004 12.3784 2.25356 12.162 2.46997L3.31966 11.3123C2.99432 11.6375 2.59312 11.8765 2.15229 12.0077L0.5 12.5L0.992301 10.8477C1.12355 10.4069 1.36253 10.0057 1.68768 9.68034L9.4925 1.87675H9.49189ZM9.49189 1.87675L11.1152 3.50011"
          stroke="#895C32"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Down Highlight */}
      <svg
        className="absolute bottom-0.5 right-1.5"
        style={{ width: 10 }}
        width="14"
        height="11"
        viewBox="0 0 14 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.7"
          d="M1.5 9.5C5.73077 8.55882 9.53846 6.67647 12.5 1.5"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />
      </svg>
    </Button>
  );
};

export default EditRowButton;
