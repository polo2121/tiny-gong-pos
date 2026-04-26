"use client";

import { useState, type ReactNode } from "react";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* =========================
   TYPES
========================= */

type CategoryTagProps = {
  children: ReactNode;
  className?: string;
  interaction?: "flip" | "modal" | "none";
  modalContent?: ReactNode;
};

type CategoryTagFrontProps = {
  children?: ReactNode;
  className?: string;
};

type CategoryTagBackProps = {
  children?: ReactNode;
  className?: string;
};

/* =========================
   MAIN COMPONENT
========================= */

export default function CategoryTag({
  children,
  className,
  interaction = "none",
  modalContent,
}: CategoryTagProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  /* =========================
     HANDLERS
  ========================= */

  const handleClick = () => {
    switch (interaction) {
      case "modal":
        setIsModalOpen(true);
        break;
      case "flip":
        setIsFlipped((prev) => !prev);
        break;
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* =========================
         CARD
      ========================= */}
      <div
        className={cn(
          "relative mb-8 h-70 w-36 cursor-pointer perspective-distant",
          "rounded-tl-[30px] rounded-br-[30px]",
          className,
        )}
      >
        {/* Knot */}
        <Image
          src="/inventory/category-tag-handle.svg"
          alt=""
          width={100}
          height={100}
          priority
          className="absolute -top-14 left-16 z-20 w-6"
        />

        <motion.div
          initial={false}
          animate={{
            rotateY: interaction === "flip" && isFlipped ? 180 : 0,
          }}
          whileHover={{ y: -10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
          onClick={handleClick}
          className="relative h-full w-full"
        >
          {children}
        </motion.div>

        {/* Footer */}
        <div className="flex justify-items-end">
          <Link
            href="/#"
            className="w-full p-2 font-chewy text-center text-slate-300 hover:text-theme-primary-700 hover:scale-120 transition-transform underline"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* =========================
         MODAL
      ========================= */}
      {interaction === "modal" && isModalOpen && (
        <CategoryTagModal
          onClose={closeModal}
          content={modalContent}
          fallback={children}
        />
      )}
    </>
  );
}

/* =========================
   MODAL
========================= */

type CategoryTagModalProps = {
  onClose: () => void;
  content?: ReactNode;
  fallback: ReactNode;
};

function CategoryTagModal({
  onClose,
  content,
  fallback,
}: CategoryTagModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex w-full items-center justify-center  bg-black/50">
      <div
        className={cn(
          "relative mt-auto px-4 pb-10 bg-white shadow-xl",
          "rounded-tl-[30px] rounded-tr-[30px]",
          "wrap-break-word",
          "xs:px-10 sm:m-auto sm:w-[90%] sm:rounded-[30px]",
          "md:w-[74%] lg:w-[50%]",
        )}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-8 top-4 z-20 font-chewy text-slate-400 transition-all hover:scale-120 hover:text-theme-primary-500 cursor-pointer"
        >
          Close
        </button>

        {/* Content */}
        <section className="relative flex h-full gap-6 xs:gap-8">
          {/* Line */}
          <div className="w-full absolute top-8 overflow-hidden">
            <svg
              className="pointer-events-none"
              width="513"
              height="19"
              viewBox="0 0 513 19"
              fill="none"
            >
              <path
                d="M0.5 0.5C148.991 9.40003 472.062 34.929 512.5 2.6079"
                stroke="#CDCDCD"
                strokeLinecap="round"
                strokeDasharray="6 6"
              />
            </svg>
          </div>

          {/* Preview */}
          <div>
            <Image
              src="/inventory/category-tag-handle.svg"
              alt="category-tag-handle"
              width={100}
              height={100}
              priority
              className="relative left-16 top-8 z-20 w-6"
            />

            <div className="relative h-70 w-36 perspective-distant rounded-tl-[30px] rounded-br-[30px]">
              {fallback}
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="mt-auto flex flex-col justify-center gap-3 text-theme-primary-900">
            {content ?? (
              <>
                <span className="text-base font-margarine text-theme-primary-500">
                  Description
                </span>

                <h3 className="text-sm font-semibold font-quicksand sm:text-base">
                  T-shirts, polo shirts, and casual short-sleeve button-downs
                  designed for everyday comfort and warm weather.
                </h3>

                <h3 className="text-sm font-umoe sm:text-base">
                  နေ့စဉ်ဝတ်ဆင်ရန် သက်တောင့်သက်သာရှိသော လက်တိုတီရှပ်များ၊
                  ပိုလိုအင်္ကျီများနှင့် လက်တိုအင်္ကျီများ။
                </h3>

                <Link href="helo" className="mt-2 cursor-pointer">
                  <Button variant="magical">View All SS' Products</Button>
                </Link>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

/* =========================
   FRONT
========================= */

export function CategoryTagFront({
  children,
  className,
}: CategoryTagFrontProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col justify-end overflow-hidden",
        "px-3 pb-4 pt-8",
        "bg-theme-primary-100",
        "rounded-tl-[30px] rounded-br-[30px]",
        "shadow-[8px_8px_0_0_rgba(221,221,221,0.25)]",
        "backface-hidden",
        className,
      )}
    >
      <Image
        src="/inventory/category-tag-spark.svg"
        alt=""
        width={100}
        height={100}
        priority
        className="relative top-0 w-full opacity-80"
      />

      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center">
        {children}

        <Image
          src="/inventory/category-tag-line.svg"
          alt="category-tag-line-icon"
          width={100}
          height={100}
          loading="eager"
          className="absolute -bottom-4 left-2 z-10 size-34 object-contain opacity-60"
        />
      </div>
    </div>
  );
}

/* =========================
   BACK
========================= */

export function CategoryTagBack({ children, className }: CategoryTagBackProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-end justify-end",
        "p-3 text-white",
        "bg-theme-primary-100",
        "rounded-tr-[30px] rounded-bl-[30px]",
        "shadow-[4px_4px_0_0_rgba(216,216,216,0.25)]",
        "transform-[rotateY(180deg)] backface-hidden",
        className,
      )}
    >
      <Image
        src="/inventory/category-tag-spark.svg"
        alt=""
        width={100}
        height={100}
        priority
        className="absolute top-4 w-[80%] opacity-40"
      />

      {children}
    </div>
  );
}
