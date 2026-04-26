"use client";

import Image from "next/image";
import { CATEGORIES_LIST } from "@/features/products/data/categoriesList";
import DualText from "@/components/DualText";
import CategoryTag, {
  CategoryTagFront,
  CategoryTagBack,
} from "@/features/products/components/cards/CategoryTag";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

/* =========================
   CONSTANTS
========================= */

const BREADCRUMBS = [
  { label: "Workspace", href: "/workspace" },
  { label: "Inventory", href: "/workspace/inventory" },
  { label: "Categories", href: "/workspace/categories" },
];

const page = () => {
  const maxItems = 5;
  return (
    <section className="flex flex-col gap-20 p-2 md:p-4">
      {/* Header */}
      <header className="flex flex-col gap-4 px-4 py-2">
        {/* Breadcrumb */}
        <BreadcrumbNav breadcrumbs={BREADCRUMBS} />

        <div className="flex justify-between">
          <DualText primary="categories" secondary="အမျိုးအစားများ" size="lg" />
        </div>
      </header>
      <div className="mx-auto grid grid-cols-2 gap-6 xs:grid-cols-3 xs:gap-4 md:grid-cols-4 md:gap-8 lg:grid-cols-5">
        {CATEGORIES_LIST.map((category) => (
          <CategoryTag
            key={category.prefix}
            interaction="modal"
            className="mb-20"
            modalContent={
              <>
                <span className="text-base font-margarine text-theme-primary-500">
                  Description
                </span>

                <h3 className="text-sm font-semibold font-quicksand sm:text-base">
                  {category.description}
                </h3>

                <h3 className="text-base font-umoe sm:text-lg">
                  {category.descriptionMM}
                </h3>

                <Link href="helo" className="mt-2 cursor-pointer">
                  <Button variant="magical">
                    View All {category.name} Products
                  </Button>
                </Link>
              </>
            }
          >
            <CategoryTagFront>
              <h1 className="w-full font-margarine text-2xl text-theme-primary-500">
                {category.prefix}
              </h1>

              <p className="w-full font-quicksand font-medium text-base capitalize text-gray-500 line-clamp-2 min-h-14">
                {category.name}
              </p>

              <div className="bg-mber-400">
                <Image
                  src="/inventory/set-two-pieces.webp"
                  alt="clothing image"
                  width={100}
                  height={100}
                  loading="eager"
                  className="relative right-4 z-20 w-full object-contain"
                />
              </div>
            </CategoryTagFront>
          </CategoryTag>
        ))}
      </div>
      <CategoryTag interaction="flip" className="mb-20">
        <CategoryTagFront>
          <h1 className="w-full font-margarine text-2xl text-theme-primary-500">
            DR0001
          </h1>

          <p className="w-full font-quicksand font-medium text-base capitalize text-gray-500 line-clamp-2 min-h-14">
            Flower Dress
          </p>

          <div className="bg-mber-400">
            <Image
              src="/inventory/set-two-pieces.webp"
              alt="clothing image"
              width={100}
              height={100}
              loading="eager"
              className="relative right-4 z-20 w-full object-contain"
            />
          </div>
        </CategoryTagFront>
        <CategoryTagBack>
          <div className="relative z-20 h-fit w-full overflow-hidden rounded-[10px] border border-theme-primary-900/50 bg-white/70">
            <h3 className="border-b border-theme-primary-900/50 py-2 text-center font-margarine text-sm text-theme-primary-900/50">
              Sizes
            </h3>

            <ul className="grid grid-cols-3 gap-2 p-3 text-xs font-bold capitalize text-theme-primary-900 font-quicksand">
              {["100", "100", "100", "100", "100", "100", "100"]
                .slice(0, maxItems)
                .map((num, index) => (
                  <li key={index}>{num}</li>
                ))}

              {["100", "100", "100", "100", "100", "100", "100", "100"].length >
                maxItems && (
                <li className="text-gray-400">
                  +
                  {["100", "100", "100", "100", "100", "100", "100", "100"]
                    .length - maxItems}
                </li>
              )}
            </ul>

            <h3 className="border-y border-theme-primary-900/50 py-2 text-center font-margarine text-xs text-theme-primary-900/50">
              Colors
            </h3>

            <ul className="grid max-h-40 grid-cols-2 gap-2 overflow-y-auto p-3 font-quicksand text-xs font-bold capitalize text-theme-primary-900">
              <li>Red</li>
              <li>Blue</li>
              <li className="line-clamp-1">Navy Blue Red</li>
              <li>Green</li>
              <li>Green</li>
              <li>Green</li>
            </ul>
          </div>
        </CategoryTagBack>
      </CategoryTag>
    </section>
  );
};

export default page;
