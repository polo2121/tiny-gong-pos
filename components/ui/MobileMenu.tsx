"use client";

import React from "react";
import { Button } from "./button";
import { useState } from "react";
import Image from "next/image";
import MenuBearSVG from "@/app/sales/components/ui/MenuBearSVG";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItems {
  label: string;
  href: string;
}

const MobileMenu = () => {
  const pathname = usePathname();

  const navItems: NavItems[] = [
    { label: "sales", href: "/sales" },
    { label: "profits", href: "/profits" },
    { label: "capitals", href: "/capitals" },
    { label: "expenses", href: "/expenses" },
    { label: "delivery", href: "/delivery" },
  ];

  const currentPath: NavItems | undefined = navItems.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );

  console.log(currentPath);

  // console.log(isActive);
  // const [menuType, setMenuType] = useState<NavItems>([
  //   "delivery",
  //   "sale",
  //   "capital",
  //   "expenses",
  //   "profit",
  // ]);

  return (
    <section className="fixed z-20 bottom-0 right-0">
      <nav className="flex flex-col gap-3 absolute right-0 bottom-12 px-10 py-2 rounded-4xl bg-gray-100/90 border-2 border-white text-brown-900 font-margarine shadow-drop-mobile-menu capitalize">
        {/* Bear Imagae */}
        <MenuBearSVG />

        {/* Non-Active Menu */}
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href="/sale"
              className={`w-full relative bottom-0  text-brown-800 text-lg ${
                isActive ? " text-brown-800" : " text-brown-900 opacity-50"
              }`}
            >
              {item.label}

              {isActive ? (
                <Image
                  className="absolute top-6"
                  src="/svg/active-menu-line.svg"
                  width={100}
                  height={100}
                  alt="active menu line icon"
                />
              ) : null}
            </Link>
          );
        })}

        <Button className="bg-white text-sm  text-brown-900 opacity-50">
          Close
        </Button>
      </nav>
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
    </section>
  );
};

export default MobileMenu;
