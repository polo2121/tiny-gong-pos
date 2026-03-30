import React from "react";
import DualText from "@/components/DualText";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import TodayDate from "@/features/products/components/TodayDate";
import ProductInStockSection from "@/features/products/components/sections/ProductInStockSection";

const BREADCRUMBS = [
  { label: "Inventory", href: "/workspace/inventory" },
  { label: "Products", href: "/workspace/inventory/products" },
];

const ProductsPage = async () => {
  //   const productsByCategory = await getProductsInStockByCategory();

  return (
    <main className="flex flex-col text-slate-800">
      <BreadcrumbNav breadcrumbs={BREADCRUMBS} className="px-4" />

      <section className="flex items-start justify-between px-4 py-2">
        <DualText
          primary="products"
          secondary="ကုန်ပစ္စည်းများ"
          size="lg"
          className="capitalize"
        />
        <TodayDate />
      </section>

      <section className="mt-4 flex flex-col gap-4 px-4">
        <DualText
          primary="Category Types"
          secondary="ကုန်ပစ္စည်းအမျိုးအစား"
          size="md"
          className="capitalize"
        />

        <div className="flex flex-wrap gap-3">
          {/* {productsByCategory.map((category) => (
            <div
              key={category.categoryId}
              className="min-w-40 rounded-3xl border bg-white px-4 py-3 shadow-sm"
            >
              <h2 className="text-sm font-semibold capitalize text-slate-900">
                {category.categoryName}
              </h2>
              <p className="text-[10px] text-slate-500">
                ({category.categoryNameMm})
              </p>
              <p className="mt-3 text-xs text-slate-500">
                {category.products.length} products
              </p>
            </div>
          ))} */}
        </div>
      </section>

      <section className="mt-6 px-4 pb-6">
        <ProductInStockSection />
      </section>
    </main>
  );
};

export default ProductsPage;
