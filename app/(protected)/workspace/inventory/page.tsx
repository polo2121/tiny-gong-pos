import React from "react";
import DualText from "@/components/DualText";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import MetricCard from "@/features/products/components/cards/MetricCard";
import { MetricCardItem } from "@/features/products/types/product.types";
import InventoryMetricsSection from "@/features/products/components/sections/InventoryMetricsSection";
import { productService } from "@/features/products/server/product.server.service";
import TodayDate from "@/features/products/components/TodayDate";
import Link from "next/link";
import InventoryExploreSection from "@/features/products/components/sections/InventoryExploreSection";
import { productRepo } from "@/features/products/repositories/product.repository";


const BREADCRUMBS = [{ label: "Inventory", href: "/inventory" }];
const EXPLORE_NAV = [
  {
    title: "products",
    subtitle: "Somehting about to happen",
    href: "/workspace/inventory/products",
  },
  {
    title: "catgories",
    subtitle: "Go to somewhre or something",
    href: "/workspace/inventory/categories",
  },
];

const page = async () => {
  const result = await productService.getInventoryMetrics();


  if (result.isErr()) {
    return <div>Failed to load metrics</div>;
  }
  const metrics = result.value;

  const METRIC_CARD_ITEMS: MetricCardItem[] = [
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

  return (
    <main className="flex flex-col  text-slate-800">
      <BreadcrumbNav breadcrumbs={BREADCRUMBS} className="px-4" />
      <div className="flex justify-between px-4 py-2">
        <DualText
          primary="inventory"
          secondary="ကုန်ပစ္စည်းများ"
          size="lg"
          className="capitalize"
        />
        <TodayDate />
      </div>

      <InventoryMetricsSection>
        {METRIC_CARD_ITEMS.map((metrics) => (
          <MetricCard
            key={metrics.title}
            title={metrics.title}
            subtitle={metrics.subtitle}
            number={metrics.number}
            unit={metrics.unit}
          />
        ))}
      </InventoryMetricsSection>

      <InventoryExploreSection>
        <DualText
          primary="Explore"
          secondary="ကုန်ပစ္စည်းများ"
          size="md"
          className="capitalize"
        />

        <div className="flex gap-4">
          {EXPLORE_NAV.map((nav) => (
            <Link
              key={nav.title}
              href={nav.href}
              className="w-1/2  h-56 flex flex-col gap-2 justify-end bg-amber-200 rounded-[40px] p-4 relative"
            >
              <h1 className="text-lg font-bold capitalize">{nav.title}</h1>
              <p className="text-sm">{nav.subtitle}</p>
              <span className="absolute -bottom-4 inset-x-2 bg-blue-100">
                Go
              </span>
            </Link>
          ))}
        </div>
      </InventoryExploreSection>
    </main>
  );
};

export default page;
