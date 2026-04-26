import React from "react";

type InventoryMetricsSectionProps = {
  children: React.ReactNode;
};

const InventoryMetricsSection = ({
  children,
}: InventoryMetricsSectionProps) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 py-2 ">
      {children}
    </section>
  );
};

export default InventoryMetricsSection;
