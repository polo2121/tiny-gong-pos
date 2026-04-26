import React from "react";
import Image from "next/image";
import DualText from "@/components/DualText";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import MetricCard from "@/features/products/components/cards/MetricCard";
import ProductCard from "@/features/products/components/cards/ProductCard";
import CategoryTag, {
  CategoryTagBack,
  CategoryTagFront,
} from "@/features/products/components/cards/CategoryTag";
import InventoryMetricsSection from "@/features/products/components/sections/InventoryMetricsSection";
import CategoryExploreSection from "@/features/products/components/sections/CategoryExploreSection";
import TodayDate from "@/features/products/components/TodayDate";
import { productService } from "@/features/products/server/product.server.service";
import { MetricCardItem } from "@/features/products/types/product.types";

const BREADCRUMBS = [
  { label: "Inventory", href: "/inventory" },
  { label: "Readability Demo", href: "/workspace/inventory/readability-demo" },
];

type InventoryReadabilityDemoPageProps = {
  searchParams?: Promise<{ view?: string }>;
};

const CATEGORY_PREVIEW = {
  name: "Flower",
  seriesCode: "DR0001",
  sizes: ["100", "200", "300", "300", "300"],
  colors: ["Red", "Blue", "Green", "Yellow", "Black"],
};

const TABLE_COLUMNS = ["Product", "Series", "Category", "Color", "Size"] as const;

function buildMetricCards(metrics: {
  totalProducts: number;
  totalCost: number;
  totalInStock: number;
  totalOutOfStock: number;
}): MetricCardItem[] {
  return [
    {
      title: "Total Products",
      subtitle: "စုစုပေါင်းပစ္စည်း",
      number: metrics.totalProducts,
      unit: "MMK",
    },
    {
      title: "Total Cost",
      subtitle: "စုစုပေါင်းကုန်ကျစရိတ်",
      number: metrics.totalCost,
      unit: "MMK",
    },
    {
      title: "Total In Stock",
      subtitle: "လက်ကျန်ပစ္စည်း",
      number: metrics.totalInStock,
      unit: "Item(s)",
    },
    {
      title: "Total Out of Stock",
      subtitle: "လက်ကျန်မရှိပစ္စည်း",
      number: metrics.totalOutOfStock,
      unit: "Item(s)",
    },
  ];
}

const InventoryReadabilityDemoPage = async ({
  searchParams,
}: InventoryReadabilityDemoPageProps) => {
  const params = (await searchParams) ?? {};
  const viewMode = params.view === "table" ? "table" : "list";

  const inventoryMetricsResult = await productService.getInventoryMetrics();
  const groupedProductCardsResult = await productService.searchProducts({
    query: "",
    searchBy: "name",
    cursor: null,
    limit: 24,
  });

  if (inventoryMetricsResult.isErr()) {
    return <div>Failed to load metrics</div>;
  }

  if (groupedProductCardsResult.isErr()) {
    return <div>Failed to load products</div>;
  }

  const inventoryMetrics = inventoryMetricsResult.value;
  const groupedProductCards = groupedProductCardsResult.value.productCards;

  // Frontend-only fallback: infer flat rows from grouped colors and sizes.
  const flatTableRows = groupedProductCards.flatMap((groupedProductCard) => {
    const colors = groupedProductCard.colors.length
      ? groupedProductCard.colors
      : ["-"];
    const sizes = groupedProductCard.sizes.length
      ? groupedProductCard.sizes
      : ["-"];

    return colors.flatMap((color) =>
      sizes.map((size, index) => ({
        rowId: `${groupedProductCard.productId}-${color}-${size}-${index}`,
        productName: groupedProductCard.productName,
        productSeriesCode: groupedProductCard.productSeriesCode,
        categoryName: groupedProductCard.category.categoryName,
        color,
        size,
      })),
    );
  });

  const visibleGroupedProductCards = groupedProductCards.slice(0, 8);
  const hiddenGroupedProductCards = groupedProductCards.slice(8);
  const visibleFlatTableRows = flatTableRows.slice(0, 8);
  const hiddenFlatTableRows = flatTableRows.slice(8);
  const metricCards = buildMetricCards(inventoryMetrics);

  const renderGroupedProductCard = (
    groupedProductCard: (typeof groupedProductCards)[number],
  ) => (
    <ProductCard
      key={groupedProductCard.productId}
      productId={groupedProductCard.productId}
      productName={groupedProductCard.productName}
      seriesCode={groupedProductCard.productSeriesCode}
      colors={groupedProductCard.colors}
      sizes={groupedProductCard.sizes}
      genders={[]}
      searchQuery=""
      searchBy="name"
    />
  );

  const renderFlatTableRow = (
    flatTableRow: (typeof flatTableRows)[number],
  ) => (
    <tr
      key={flatTableRow.rowId}
      className="border-b border-theme-primary-100 last:border-b-0"
    >
      <td className="px-4 py-3 font-chewy text-lg text-theme-primary-700">
        {flatTableRow.productName}
      </td>
      <td className="px-4 py-3 font-quicksand text-sm font-semibold text-theme-primary-900/80">
        {flatTableRow.productSeriesCode}
      </td>
      <td className="px-4 py-3 font-quicksand text-sm font-medium text-theme-primary-900/80">
        {flatTableRow.categoryName}
      </td>
      <td className="px-4 py-3 font-quicksand text-sm font-medium text-theme-primary-900/80">
        {flatTableRow.color}
      </td>
      <td className="px-4 py-3 font-quicksand text-sm font-medium text-theme-primary-900/80">
        {flatTableRow.size}
      </td>
    </tr>
  );

  return (
    <section className="m-auto flex max-w-5xl flex-col">
      <BreadcrumbNav breadcrumbs={BREADCRUMBS} />

      <div className="flex justify-between px-4 py-2">
        <DualText primary="inventory" secondary="ကုန်ပစ္စည်းများ" size="lg" />
        <TodayDate />
      </div>

      <InventoryMetricsSection>
        {metricCards.map((metricCard, index) => (
          <MetricCard
            key={metricCard.title}
            title={metricCard.title}
            subtitle={metricCard.subtitle}
            number={metricCard.number}
            unit={metricCard.unit}
            order={index}
          />
        ))}
      </InventoryMetricsSection>

      <CategoryExploreSection>
        <DualText
          primary="Explore"
          secondary="ကုန်ပစ္စည်းများ"
          size="md"
          className="capitalize"
        />

        <section className="relative m-auto grid grid-cols-3 gap-8 gap-y-26 sm:max-w-3xl sm:grid-cols-3 md:grid-cols-4">
          <Image
            width={200}
            height={200}
            className="absolute -top-10 w-full"
            src="/inventory/category-big-handler.svg"
            alt="category-tag-spark-icon"
            loading="eager"
          />

          <CategoryTag>
            <CategoryTagFront>
              <div className="w-full space-y-1 text-left">
                <h2 className="font-margarine text-xl leading-none text-theme-primary-500">
                  {CATEGORY_PREVIEW.name}
                </h2>
                <p className="line-clamp-2 font-quicksand text-sm font-semibold text-theme-primary-900/80">
                  {CATEGORY_PREVIEW.seriesCode}
                </p>
              </div>
            </CategoryTagFront>

            <CategoryTagBack>
              <div className="relative z-20 h-fit w-full overflow-hidden rounded-[10px] border border-theme-primary-900/50 bg-white/70">
                <h3 className="border-b border-theme-primary-900/50 py-2 text-center font-margarine text-sm text-theme-primary-900/50">
                  Sizes
                </h3>

                <ul className="grid max-h-40 grid-cols-2 gap-2 overflow-y-auto p-3 font-quicksand text-sm font-bold capitalize text-theme-primary-900">
                  {CATEGORY_PREVIEW.sizes.map((size, index) => (
                    <li key={`${size}-${index}`}>{size}</li>
                  ))}
                </ul>

                <h3 className="border-y border-theme-primary-900/50 py-2 text-center font-margarine text-sm text-theme-primary-900/50">
                  Colors
                </h3>

                <ul className="grid max-h-40 grid-cols-2 gap-2 overflow-y-auto p-3 font-quicksand text-sm font-bold capitalize text-theme-primary-900">
                  {CATEGORY_PREVIEW.colors.map((color) => (
                    <li key={color}>{color}</li>
                  ))}
                </ul>
              </div>
            </CategoryTagBack>
          </CategoryTag>
        </section>

        <div className="flex w-full justify-center">
          <Button variant="bubble" size="lg">
            Explore Category More
          </Button>
        </div>
      </CategoryExploreSection>

      <section className="mb-4 mt-4 flex flex-col gap-6 px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <DualText
            primary="Products Snapshot"
            secondary="ပစ္စည်းအကျဉ်းချုပ်"
            size="md"
          />

          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className="font-quicksand text-sm font-medium text-theme-primary-900/70">
              Showing{" "}
              {viewMode === "table"
                ? Math.min(8, flatTableRows.length)
                : Math.min(8, groupedProductCards.length)}{" "}
              of{" "}
              {viewMode === "table"
                ? flatTableRows.length
                : groupedProductCards.length}{" "}
              {viewMode === "table" ? "rows" : "products"}
            </p>

            <div className="flex items-center rounded-full border border-theme-primary-200 bg-white/70 p-1">
              <a
                href="/workspace/inventory/readability-demo?view=list"
                className={`rounded-full px-4 py-1.5 font-quicksand text-sm font-semibold transition-colors ${
                  viewMode === "list"
                    ? "bg-theme-primary-500 text-white"
                    : "text-theme-primary-900/65"
                }`}
              >
                List
              </a>
              <a
                href="/workspace/inventory/readability-demo?view=table"
                className={`rounded-full px-4 py-1.5 font-quicksand text-sm font-semibold transition-colors ${
                  viewMode === "table"
                    ? "bg-theme-primary-500 text-white"
                    : "text-theme-primary-900/65"
                }`}
              >
                Table
              </a>
            </div>
          </div>
        </div>

        {viewMode === "list" ? (
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {visibleGroupedProductCards.map(renderGroupedProductCard)}
            </div>

            {hiddenGroupedProductCards.length > 0 ? (
              <details className="group mt-4 rounded-[24px] border border-theme-primary-200 bg-white/60 p-4">
                <summary className="cursor-pointer list-none font-chewy text-lg text-theme-primary-700 marker:content-none">
                  <div className="flex items-center justify-between gap-4">
                    <span>See More Products</span>
                    <span className="font-quicksand text-sm font-semibold text-theme-primary-900/60 transition-transform duration-200 group-open:rotate-180">
                      v
                    </span>
                  </div>
                </summary>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {hiddenGroupedProductCards.map(renderGroupedProductCard)}
                </div>
              </details>
            ) : null}
          </div>
        ) : (
          <div>
            <div className="overflow-hidden rounded-[24px] border border-theme-primary-200 bg-white/70">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-theme-primary-200 bg-theme-primary-50/70">
                    {TABLE_COLUMNS.map((columnName) => (
                      <th
                        key={columnName}
                        className="px-4 py-3 text-left font-quicksand text-sm font-bold text-theme-primary-900"
                      >
                        {columnName}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>{visibleFlatTableRows.map(renderFlatTableRow)}</tbody>
              </table>
            </div>

            {hiddenFlatTableRows.length > 0 ? (
              <details className="group mt-4 rounded-[24px] border border-theme-primary-200 bg-white/60 p-4">
                <summary className="cursor-pointer list-none font-chewy text-lg text-theme-primary-700 marker:content-none">
                  <div className="flex items-center justify-between gap-4">
                    <span>See More Rows</span>
                    <span className="font-quicksand text-sm font-semibold text-theme-primary-900/60 transition-transform duration-200 group-open:rotate-180">
                      v
                    </span>
                  </div>
                </summary>

                <div className="mt-4 overflow-hidden rounded-[24px] border border-theme-primary-200 bg-white/70">
                  <table className="w-full border-collapse">
                    <tbody>{hiddenFlatTableRows.map(renderFlatTableRow)}</tbody>
                  </table>
                </div>
              </details>
            ) : null}
          </div>
        )}
      </section>
    </section>
  );
};

export default InventoryReadabilityDemoPage;
