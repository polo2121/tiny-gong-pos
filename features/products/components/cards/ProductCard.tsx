import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { highlightMatch } from "@/features/products/utils/highlight-match";
import { cn } from "@/lib/utils";

/* =========================
   TYPES
========================= */

type ProductCardProps = {
  productId: string;
  productName: string;
  seriesCode: string;
  colors: string[];
  bgColors: string[];
  sizes: string[];
  genders: string[];
  searchQuery: string;
  searchBy: "name" | "gender" | "color" | "size";
};

type ProductAttributePillsProps = {
  label: "Colors" | "Genders" | "Sizes";
  values: string[];
  searchQuery: string;
  shouldHighlight: boolean;
};

/* =========================
   MAIN COMPONENT
========================= */

const ProductCard = ({
  productId,
  productName,
  seriesCode,
  colors,
  bgColors = ["#f1f5f9", "#cbd5e1", "#94a3b8"],
  sizes,
  genders,
  searchQuery,
  searchBy,
}: ProductCardProps) => {
  return (
    <Link
      href={`/workspace/inventory/products/${productId}`}
      className="relative block h-full px-2 py-4 font-margarine border border-dashed rounded-4xl bg-amber-00"
    >
      <Card className="flex h-full flex-row gap-10 overflow-hidden p-0 sm:gap-4">
        {/* IMAGE */}
        <div className="flex w-full h-full flex-1 justify-center md:flex-3">
          <span className="flex h-20 w-20 items-center justify-center rounded-[16px] bg-slate-100 text-theme-primary-900/40">
            No Image
          </span>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-9 gap-4 md:flex-7">
          {/* HEADER */}
          <CardHeader className="gap-0 p-0">
            <CardTitle className="text-base font-semibold capitalize text-theme-primary-900">
              {searchBy === "name"
                ? highlightMatch(productName, searchQuery)
                : productName}
            </CardTitle>

            <CardDescription className="text-sm font-semibold uppercase font-quicksand">
              {seriesCode}
            </CardDescription>
          </CardHeader>

          {/* ATTRIBUTES */}
          <CardContent className="p-0">
            <ProductAttributePills
              label="Sizes"
              values={sizes}
              searchQuery={searchQuery}
              shouldHighlight={searchBy === "size"}
            />

            <ProductAttributePills
              label="Colors"
              values={bgColors}
              searchQuery={searchQuery}
              shouldHighlight={searchBy === "color"}
            />
          </CardContent>

          {/* FOOTER */}
          <CardFooter className="flex w-full gap-0 border-none bg-transparent p-0">
            <Button className="w-full px-6" variant="magical">
              View Details
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

/* =========================
   SUB COMPONENT
========================= */

const ProductAttributePills = ({
  label,
  values,
  searchQuery,
  shouldHighlight,
}: ProductAttributePillsProps) => {
  if (!values?.length) return null;

  const visibleValues = values.slice(0, 3);
  const remainingCount = values.length - visibleValues.length;

  return (
    <div className="flex flex-wrap relative gap-2 space-y-2">
      {visibleValues.map((value) => (
        <span
          key={`${label}-${value}`}
          className={cn(
            "flex items-center justify-center h-8 w-8 px-2.5 py-1 text-xs font-medium font-margarine rounded-full border-2 border-white text-theme-primary-900 shadow-[-2px_2px_0_0_rgba(146,146,146,0.25)]",
            label !== "Colors" && "bg-theme-primary-100",
          )}
          style={
            label === "Colors"
              ? { backgroundColor: value || "var(--theme-primary-100)" }
              : undefined
          }
        >
          {label !== "Colors"
            ? shouldHighlight
              ? highlightMatch(value, searchQuery)
              : value
            : null}
        </span>
      ))}

      {remainingCount > 0 && (
        <span className="flex items-center justify-center pb-2 text-xs font-medium text-slate-500 font-quicksand text-center rounded-full ">
          +{remainingCount}
        </span>
      )}
    </div>
  );
};

export default ProductCard;
