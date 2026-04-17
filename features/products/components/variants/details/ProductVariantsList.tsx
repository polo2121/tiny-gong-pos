"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import EditVariantDrawer from "@/features/products/components/variants/EditVariantDrawer";
import VariantItemCard from "@/features/products/components/variants/VariantItemCard";
import DualText from "@/components/DualText";
import { ProductVariantItem } from "@/features/products/types/product.types";

type ProductVariantsListProps = {
  variantItems: ProductVariantItem[];
};

const ProductVariantsList = ({ variantItems }: ProductVariantsListProps) => {
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariantItem | null>(null);

  return (
    <>
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardContent className="space-y-5 py-5">
          <div className="flex items-center justify-between gap-4">
            <DualText
              primary="Variants"
              secondary="အမျိုးအစားခွဲများ"
              size="md"
            />

            <p className="text-sm text-slate-500">
              {variantItems.length} variant(s)
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {variantItems.map((item) => (
              <button
                key={item.variantId}
                type="button"
                onClick={() => setSelectedVariant(item)}
                className="text-left group"
              >
                <VariantItemCard variantItem={item} />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedVariant ? (
        <EditVariantDrawer
          key={selectedVariant.variantId}
          selectedVariant={selectedVariant}
          onClose={() => setSelectedVariant(null)}
        />
      ) : null}
    </>
  );
};

export default ProductVariantsList;
