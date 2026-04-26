import React from "react";

type InventoryExploreSectionProps = {
  children: React.ReactNode;
};

const CategoryExploreSection = ({ children }: InventoryExploreSectionProps) => {
  return <section className="flex flex-col gap-18 px-4 ">{children}</section>;
};

export default CategoryExploreSection;
