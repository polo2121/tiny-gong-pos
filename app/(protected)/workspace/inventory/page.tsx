import Link from "next/link";
import Image from "next/image";

import DualText from "@/components/DualText";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import { Button } from "@/components/ui/button";

import MetricCard from "@/features/products/components/cards/MetricCard";
import ProductCard from "@/features/products/components/cards/ProductCard";

import InventoryMetricsSection from "@/features/products/components/sections/InventoryMetricsSection";
import CategoryExploreSection from "@/features/products/components/sections/CategoryExploreSection";

import TodayDate from "@/features/products/components/TodayDate";

import { productService } from "@/features/products/server/product.server.service";
import { MetricCardItem } from "@/features/products/types/product.types";
import CategoryTag, {
  CategoryTagFront,
} from "@/features/products/components/cards/CategoryTag";
import { CATEGORIES_LIST } from "@/features/products/data/categoriesList";

/* =========================
   CONSTANTS
========================= */

const BREADCRUMBS = [
  { label: "Workspace", href: "/workspace" },
  { label: "Inventory", href: "/inventory" },
];

const DEFAULT_BG_COLORS = ["#f1f5f9", "#cbd5e1", "#94a3b8"];

/* =========================
   HELPERS
========================= */

const buildMetricCards = (metrics: any): MetricCardItem[] => [
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

const renderProductCards = (products: any[]) =>
  products.map((p) => (
    <ProductCard
      key={p.productId}
      productId={p.productId}
      productName={p.productName}
      seriesCode={p.productSeriesCode}
      colors={p.colors}
      sizes={p.sizes}
      bgColors={DEFAULT_BG_COLORS}
      genders={[]}
      searchQuery=""
      searchBy="name"
    />
  ));

/* =========================
   PAGE
========================= */

const InventoryPage = async () => {
  const [metricsResult, productCardsResult] = await Promise.all([
    productService.getInventoryMetrics(),
    productService.searchProducts({
      query: "",
      searchBy: "name",
      cursor: null,
      limit: 24,
    }),
  ]);

  if (metricsResult.isErr() || productCardsResult.isErr()) {
    return (
      <section className="mx-auto max-w-5xl p-4">
        <p className="text-red-500">Failed to load inventory data</p>
      </section>
    );
  }

  const metrics = metricsResult.value;
  const productCards = productCardsResult.value.productCards;

  const METRIC_CARD_ITEMS = buildMetricCards(metrics);

  return (
    <section className="flex flex-col gap-8 mx-auto">
      {/* Header */}
      <header className="flex flex-col gap-4 px-4 py-2">
        {/* Breadcrumb */}
        <BreadcrumbNav breadcrumbs={BREADCRUMBS} />

        <div className="flex justify-between">
          <DualText primary="inventory" secondary="ကုန်ပစ္စည်းများ" size="lg" />
        </div>
      </header>

      {/* Metrics */}
      <InventoryMetricsSection>
        {METRIC_CARD_ITEMS.map((item, index) => (
          <MetricCard
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
            number={item.number}
            unit={item.unit}
            order={index}
          />
        ))}
      </InventoryMetricsSection>

      {/* Category Section */}
      <CategoryExploreSection>
        <DualText
          primary="Explore"
          secondary="ကုန်ပစ္စည်းများ"
          size="md"
          className="capitalize"
        />

        <div className="relative mx-auto grid grid-cols-3 gap-8 gap-y-26 md:grid-cols-5">
          <Image
            width={200}
            height={200}
            src="/inventory/category-big-handler.svg"
            alt="category-tag-spark-icon"
            loading="eager"
            className="absolute -top-14 w-full pointer-events-none"
          />
          {CATEGORIES_LIST.slice(0, 5).map((category) => (
            <CategoryTag key={category.prefix}>
              <CategoryTagFront>
                <h1 className="w-full font-margarine text-2xl text-theme-primary-500">
                  {category.prefix}
                </h1>
                <p className="w-full font-quicksand font-medium text-base text-gray-500 capitalize line-clamp-2 min-h-14">
                  {category.name}
                </p>
                <div className="bg-mber-400">
                  <Image
                    width={100}
                    height={100}
                    className="relative right-4 w-full  object-contain z-20"
                    src="/inventory/set-two-pieces.webp"
                    alt="clothing image"
                    loading="eager"
                  />
                </div>
              </CategoryTagFront>
            </CategoryTag>
          ))}
        </div>

        <Link
          href="/workspace/inventory/categories"
          className="flex w-full justify-center"
        >
          <Button variant="bubble" size="lg">
            Explore Category More
          </Button>
        </Link>
      </CategoryExploreSection>

      {/* Products */}
      <section className="flex flex-col gap-6 px-4 ">
        <DualText
          primary="Products Snapshot"
          secondary="ပစ္စည်းအကျဉ်းချုပ်"
          size="md"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:w-ful">
          {renderProductCards(productCards)}
          {renderProductCards(productCards)}
        </div>
      </section>
    </section>
  );
};

export default InventoryPage;
