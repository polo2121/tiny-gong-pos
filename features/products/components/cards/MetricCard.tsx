import DualText from "@/components/DualText";
import { SparkIcon } from "@/components/SVG/SparkIcon";
import { SparkLineIcon } from "@/components/SVG/SparkLineIcon";
import { cn } from "@/lib/utils";
import React from "react";

type MetricCardProps = {
  title: string;
  subtitle: string;
  number: number;
  unit: "MMK" | "Item(s)";
  order: number;
};

export function formatMetricNumber(value: number) {
  if (value <= 999_999) {
    return value.toLocaleString();
  }

  const thein = value / 100_000;
  const formattedThein = Number.isInteger(thein)
    ? thein.toLocaleString()
    : thein.toFixed(2).replace(/\.00$/, "");

  return `${formattedThein} T`;
}

// flex flex-col gap-4 relative rounded-2xl p-4 shadow-[inset_0_4px_0_rgba(255,255,255,0.25),1px_4px_0_rgba(231,231,231,0.25)]

const MetricCard = ({
  title,
  subtitle,
  number,
  unit,
  order,
}: MetricCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 relative rounded-2xl p-6 shadow-[inset_0_4px_0_rgba(255,255,255,0.25),1px_4px_0_rgba(231,231,231,0.25)]",
        order % 2 === 0 ? "bg-[#F8F8F8]" : "bg-[#F8F8F8]",
      )}
    >
      <DualText
        primary={title}
        secondary={subtitle}
        size="sm"
        className="text-gray-500"
      />
      <h2 className="text-2xl lg:text-2xl font-quicksand font-bold relative text-theme-primary-800 line-clamp-1">
        {formatMetricNumber(200000000)}
      </h2>
      <span className="text-xs absolute bottom-2 right-4 text-theme-primary-600 font-quicksand font-bold">
        {unit}
      </span>
      {order % 2 === 0 ? (
        <SparkIcon className="absolute top-4 right-2 size-12" />
      ) : (
        <SparkLineIcon className="absolute top-0 right-4 size-12" />
      )}
    </div>
  );
};

export default MetricCard;
