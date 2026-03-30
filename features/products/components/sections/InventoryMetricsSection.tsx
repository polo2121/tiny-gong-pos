import React from "react";

type InventoryMetricsSectionProps = {
  children: React.ReactNode;
};

const InventoryMetricsSection = ({
  children,
}: InventoryMetricsSectionProps) => {
  return (
    <section className="bg-amber-200 grid grid-cols-2 gap-4 px-4 py-2 mt-4">
      {children}
    </section>
  );
};

export default InventoryMetricsSection;
