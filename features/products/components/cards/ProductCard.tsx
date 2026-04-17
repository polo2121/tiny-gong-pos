import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { highlightMatch } from "@/features/products/utils/highlight-match";

type ProductCardProps = {
  productId: string;
  productName: string;
  seriesCode: string;
  colors: string[];
  sizes: string[];
  genders: string[];
  searchQuery: string;
  searchBy: "name" | "gender" | "color" | "size";
};

const ProductCard = ({
  productId,
  productName,
  seriesCode,
  colors,
  sizes,
  genders,
  searchQuery,
  searchBy,
}: ProductCardProps) => {
  return (
    <Link
      href={`/workspace/inventory/products/${productId}`}
      className="block h-full"
    >
      <Card className="h-full flex-row overflow-hidden border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        <div className="flex flex-3  w-full h-full bg-slate-50 p-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-[16px] bg-amber-100">
            {/* <img src="" alt="product-image" /> */}
          </div>
        </div>

        <div className="flex flex-7 flex-col">
          <CardHeader className="gap-2">
            <CardTitle className="text-base font-semibold text-slate-900">
              {searchBy === "name"
                ? highlightMatch(productName, searchQuery)
                : productName}
            </CardTitle>
            <CardDescription className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
              {seriesCode}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <ProductAttributePills
              label="Colors"
              values={colors}
              searchQuery={searchQuery}
              shouldHighlight={searchBy === "color"}
            />
            <ProductAttributePills
              label="Sizes"
              values={sizes}
              searchQuery={searchQuery}
              shouldHighlight={searchBy === "size"}
            />
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

type ProductAttributePillsProps = {
  label: "Colors" | "Genders" | "Sizes";
  values: string[];
  searchQuery: string;
  shouldHighlight: boolean;
};

const ProductAttributePills = ({
  label,
  values,
  searchQuery,
  shouldHighlight,
}: ProductAttributePillsProps) => {
  if (!values.length) {
    return null;
  }

  const visibleValues = values.slice(0, 3);
  const remainingCount = values.length - visibleValues.length;

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <div className="flex flex-wrap gap-2">
        {visibleValues.map((value) => (
          <span
            key={`${label}-${value}`}
            className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
          >
            {shouldHighlight ? highlightMatch(value, searchQuery) : value}
          </span>
        ))}

        {remainingCount > 0 ? (
          <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
            +{remainingCount}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default ProductCard;
