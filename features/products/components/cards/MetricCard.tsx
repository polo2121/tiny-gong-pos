import DualText from "@/components/DualText";
import React from "react";

type MetricCardProps = {
  title: string;
  subtitle: string;
  number: number;
  unit: "MMK" | "Item(s)";
};

export function formatMetricNumber(value: number) {
  if (value <= 999_999) {
    return value.toLocaleString();
  }

  const thein = value / 100_000;
  const formattedThein = Number.isInteger(thein)
    ? thein.toLocaleString()
    : thein.toFixed(2).replace(/\.00$/, "");

  return `${formattedThein} Thein`;
}

const MetricCard = ({ title, subtitle, number, unit }: MetricCardProps) => {
  return (
    <div className="flex flex-col gap-4 relative bg-blue-200 text-slate-700 rounded-2xl p-4">
      <DualText primary={title} secondary={subtitle} size="sm" />
      <h2 className="text-xl">
        {formatMetricNumber(number)}
        <span className="text-xs absolute bottom-2 right-4 text-gray-50/30">
          {unit}
        </span>
      </h2>
    </div>
  );
};

export default MetricCard;
