import { Card, CardContent } from "@/components/ui/card";
import { ProductVariantItem } from "@/features/products/types/product.types";

type VariantItemCardProps = {
  variantItem: ProductVariantItem;
};

const VariantItemCard = ({ variantItem }: VariantItemCardProps) => {
  return (
    <Card className="h-full border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="space-y-4 py-4">
        <div className="flex items-start gap-6">
          <div className="flex h-20 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 sm:flex-col">
            Image
          </div>

          <div className="flex w-full flex-col justify-around gap-6 min-[450px]:flex-row">
            <div className="flex-1 space-y-1">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Color
              </p>
              <p className="text-sm font-semibold text-slate-900">
                {variantItem.color}
              </p>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                {variantItem.gender}
              </p>
            </div>

            <div className="w-2/3 space-y-2">
              <div className="grid grid-cols-2 gap-4 px-2">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Size
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Stock
                </p>
              </div>

              <div className="relative grid grid-cols-2 gap-4 rounded-full border-2 border-blue-600 px-2 py-2 transition-transform group-active:scale-[0.98]">
                <span className="z-20 text-sm font-semibold text-slate-900">
                  {variantItem.size}
                </span>
                <span className="z-20 text-sm font-semibold text-slate-900">
                  {variantItem.stock}
                </span>
              </div>

              <span>-- Tap to Edit --</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VariantItemCard;
