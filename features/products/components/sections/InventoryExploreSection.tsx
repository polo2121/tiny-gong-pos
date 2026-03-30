import React from "react";

type InventoryExploreSectionProps = {
  children: React.ReactNode;
};

const InventoryExploreSection = ({
  children,
}: InventoryExploreSectionProps) => {
  return (
    <section className="mt-4 mb-4 flex flex-col gap-8 px-4">{children}</section>
  );
};

export default InventoryExploreSection;
