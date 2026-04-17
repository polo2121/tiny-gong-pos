import React from "react";
import DualText from "@/components/DualText";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import ProductDetailsFooter from "@/features/products/components/variants/details/ProductDetailsFooter";
import ProductDetailsHeader from "@/features/products/components/variants/details/ProductDetailsHeader";
import ProductVariantsList from "@/features/products/components/variants/details/ProductVariantsList";
import { ProductDetails } from "@/features/products/types/product.types";

const BREADCRUMBS = [
  { label: "Inventory", href: "/workspace/inventory" },
  { label: "Products", href: "/workspace/inventory/products" },
  { label: "Details", href: "/workspace/inventory/products/details" },
];

const PRODUCT_DETAILS_MOCK: ProductDetails = {
  productId: "3443808d-bcbc-4724-ab38-f3cddfa3c81e",
  productName: "Flower Dress",
  productSeriesCode: "DR0001",
  categoryName: "Dresses",
  price: 35000,
  cost: 22000,
  variantItems: [
    {
      variantId: "73e5b3c7-c809-44f2-bdac-569ad82fb48c",
      color: "Rose Pink",
      size: "S",
      gender: "Girl",
      stock: 12,
    },
    {
      variantId: "02f0ae60-37e3-4b42-b93f-6e98b3384f2b",
      color: "Butter Yellow",
      size: "M",
      gender: "Girl",
      stock: 8,
    },
    {
      variantId: "1b91ebdb-fd60-42f6-a1f9-c8076ac4d5e0",
      color: "Sage Green",
      size: "L",
      gender: "Girl",
      stock: 4,
    },
  ],
};

const ProductDetailsPage = () => {
  return (
    <main className="flex flex-col text-slate-800">
      <BreadcrumbNav breadcrumbs={BREADCRUMBS} className="px-4" />

      <section className="flex items-start justify-between px-4 py-2">
        <DualText
          primary="product details"
          secondary="ကုန်ပစ္စည်းများ"
          size="lg"
          className="capitalize"
        />
      </section>

      <section className="mt-4 flex flex-col gap-4 px-4">
        <ProductDetailsHeader details={PRODUCT_DETAILS_MOCK} />
        <ProductVariantsList variantItems={PRODUCT_DETAILS_MOCK.variantItems} />
        <ProductDetailsFooter />
      </section>
    </main>
  );
};

export default ProductDetailsPage;
