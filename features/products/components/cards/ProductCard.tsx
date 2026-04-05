import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type ProductCardProps = {
  productName: string;
  seriesCode: string;
  colors: string[];
  sizes: string[];
  genders: string[];
};

const ProductCard = ({
  productName,
  seriesCode,
  colors,
  sizes,
  genders,
}: ProductCardProps) => {
  return (
    <Link href="/" className="block h-full">
      <Card className="h-full flex-row overflow-hidden border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        <div className="flex flex-3  w-full h-full bg-slate-50 p-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-[16px] bg-amber-100">
            {/* <img src="" alt="product-image" /> */}
          </div>
        </div>

        <div className="flex flex-7 flex-col">
          <CardHeader className="gap-2">
            <CardTitle className="text-base font-semibold text-slate-900">
              {productName}
            </CardTitle>
            <CardDescription className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
              {seriesCode}x 
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <ProductAttributePills label="Colors" values={colors} />
            <ProductAttributePills label="Sizes" values={sizes} />
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

type ProductAttributePillsProps = {
  label: "Colors" | "Genders" | "Sizes";
  values: string[];
};

const ProductAttributePills = ({
  label,
  values,
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
            {value}
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
