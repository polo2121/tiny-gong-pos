"use client";

import React from "react";
import { Button } from "./button";
import { useState } from "react";
import Image from "next/image";

type MobileMenuType = "sale" | "profit" | "capital" | "expenses" | "delivery";

const MobileMenu = () => {
  const [activeMenu, setActiveMenu] = useState<MobileMenuType>("sale");
  return (
    <section className="fixed z-20 bottom-0 right-0">
      <Button className="w-18 py-5 rounded-full border-2 border-gray-200 bg-gray-100 shadow-drop-mobile-menu relative hover:bg-accent group cursor-pointer focus-visible:none will-change-transform transition-transform select-none touch-none animate-(--anim-bubble) active:animate-(--anim-bubble-press) bubble-button overflow-hidden">
        {/* Up Hightlight */}
        <svg
          className="absolute top-0.5 left-1.5 z-10"
          width="17"
          height="14"
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

        {/* Shine Bar */}
        <div className="w-full h-full absolute left-0 bottom-0  z-30 touch-none select-none animate-(--anim-shine-origin-xs) shine">
          <div className="absolute w-3 h-20 -top-8 left-3 flex bg-[#FCFFF8]/60 rotate-40 rounded-full"></div>
          <div className="absolute w-3 h-20 -top-5 left-6 flex bg-[#FCFFF8]/60 rotate-40 rounded-full"></div>
        </div>

        {/* SVG Bag Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#1F1919"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>

        {/* Down Highlight */}
        <svg
          className="absolute bottom-0.5 right-1.5"
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

      <nav className="absolute right-0 bottom-12 px-10 py-6 rounded-4xl bg-gray-100/90 border-2 border-white text-brown-900 font-margarine shadow-drop-mobile-menu ">
        <ul className="flex flex-col gap-4 bg-amer-700">
          <a
            href=""
            className={`w-full flex gap-2 items-center relative ${
              activeMenu === "sale" ? "opacity-100" : "opacity-40"
            }`}
          >
            <span className="w-2 h-0.5 absolute bottom-0 bg-brown-800 rounded-full "></span>
            <span className="w-5 h-0.5 absolute bottom-0 left-3 bg-brown-800 rounded-full "></span>

            <li>Sale</li>
            <Image
              src="/svg/menu-active-bear.svg"
              width={20}
              height={20}
              alt="bear icon"
            />
          </a>
          <a
            href=""
            className={`flex  gap-2 items-center ${
              activeMenu === "profit" ? "opacity-100" : "opacity-40"
            }`}
          >
            <li>Profit</li>
          </a>
          <a
            href=""
            className={`flex  gap-2 items-center ${
              activeMenu === "capital" ? "opacity-100" : "opacity-40"
            }`}
          >
            <li>Capital</li>
          </a>
          <a
            href=""
            className={`flex  gap-2 items-center ${
              activeMenu === "expenses" ? "opacity-100" : "opacity-40"
            }`}
          >
            <li>Expense</li>
          </a>
          <a
            href=""
            className={`flex  gap-2 items-center ${
              activeMenu === "delivery" ? "opacity-100" : "opacity-40"
            }`}
          >
            <li>Delivery</li>
          </a>
          <Button className="bg-white text-left text-brown-900">Close</Button>
        </ul>
      </nav>
    </section>
  );
};

export default MobileMenu;
