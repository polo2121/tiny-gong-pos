import { Card, CardContent } from "@/components/ui/card";
import DualText from "@/components/DualText";
import { ProductDetails } from "@/features/products/types/product.types";
import { formatPrice } from "@/features/products/utils/format-price";

type ProductDetailsHeaderProps = {
  details: ProductDetails;
};

const ProductDetailsHeader = ({ details }: ProductDetailsHeaderProps) => {
  return (
    <Card className="border-slate-200 bg-white shadow-sm ">
      <CardContent className="flex justify-between lg:flex-row lg:items-start lg:justify-between">
        <InfoTag
          label={details.productSeriesCode}
          value={details.productName}
        />
        <div className="flex gap-2">
          <InfoTag label="Price" value={`${formatPrice(details.price)}`} />
          <InfoTag label="Cost" value={`${formatPrice(details.cost)}`} />
        </div>
      </CardContent>
    </Card>
  );
};

type InfoTagProps = {
  label: string;
  value: string;
};

const InfoTag = ({ label, value }: InfoTagProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
};

export default ProductDetailsHeader;
