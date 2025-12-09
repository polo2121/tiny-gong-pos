import React from "react";
import Image from "next/image";

type ButtonName =
  | "sales"
  | "stocks"
  | "products"
  | "profits"
  | "expenses"
  | "customers";

type ButtonType = {};

const BubbleButton = ({ name }: { name: ButtonName }) => {
  const buttonType = {
    sales: {
      name: "Daily Sale",
      fillColor: "bg-brown-600",
      strokeColor: "border-brown-550",
      dropShadowColor: "shadow-drop-brown-card",
      mmText: "",
      image: "sale-stand.svg",
    },
    stocks: {
      name: "Stocks",
      fillColor: "bg-stock-600",
      strokeColor: "border-stock-550",
      dropShadowColor: "shadow-drop-stock-card",
      mmText: "",
      image: "stock.svg",
    },
    products: {
      name: "Products",
      fillColor: "bg-product-600",
      strokeColor: "border-product-550",
      dropShadowColor: "shadow-drop-product-card",
      mmText: "",
      image: "child-clothes.svg",
    },
    profits: {
      name: "Daily Sale",
      fillColor: "bg-brown-600",
      strokeColor: "border-brown-550",
      dropShadowColor: "shadow-drop-brown-card",
      mmText: "",
      image: "",
    },
    expenses: {
      name: "Daily Sale",
      fillColor: "bg-brown-600",
      strokeColor: "border-brown-550",
      dropShadowColor: "shadow-drop-brown-card",
      mmText: "",
      image: "",
    },
    customers: {
      name: "Daily Sale",
      fillColor: "bg-brown-600",
      strokeColor: "border-brown-550",
      dropShadowColor: "shadow-drop-brown-card",
      mmText: "",
      image: "",
    },
  } as const;

  return (
    <a
      href="#hello"
      className={`flex flex-col gap-2 justify-end w-full h-44 px-4 py-6 rounded-home ${buttonType[name]?.fillColor} text-white relative border ${buttonType[name]?.strokeColor} ${buttonType[name]?.dropShadowColor} overflow-hidden group focus-visible:none will-change-transform transition-transform select-none touch-none animate-(--anim-bubble) active:animate-(--anim-bubble-press) bubble-button`}
      style={{ WebkitTouchCallout: "none" }}
    >
      {/* shine effect */}
      <div className="w-full h-full absolute left-0 bottom-0  z-30 touch-none select-none animate-(--anim-shine-origin-xs) shine">
        <div className="absolute w-7 h-100 -top-40 left-0 flex bg-white/20 rotate-45"></div>
        <div className="absolute w-7 h-100 -top-26 left-[0%] flex bg-white/20 rotate-45"></div>
      </div>

      <svg
        className="absolute top-3 z-10"
        width="17"
        height="14"
        viewBox="0 0 17 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.7"
          d="M1.5 12C4.5 6 9 3 15.5003 1.5"
          stroke="#FFFDFD"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />
      </svg>
      <div className="w-full h-fit overflow-hidden flex justify-end">
        <Image
          src={`/svg/${buttonType[name]?.image}`}
          width={100}
          height={100}
          alt="icon"
          className="flex w-fit"
        />
      </div>
      <p className="text-xl font-margarine relative z-10">
        {buttonType[name]?.name}
      </p>
      <p className="text-xs font-quicksand font-medium relative z-10">
        View current inventory levels, product ava.....
      </p>

      <svg
        className="absolute bottom-3 right-4"
        width="14"
        height="11"
        viewBox="0 0 14 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.7"
          d="M1.5 9.5C5.73077 8.55882 9.53846 6.67647 12.5 1.5"
          stroke="#FFFDFD"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />
      </svg>
    </a>
  );
};

export default BubbleButton;
