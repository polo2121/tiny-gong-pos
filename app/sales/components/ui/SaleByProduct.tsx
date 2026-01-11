import React from "react";

type SaleByProductProps = {
  children: React.ReactNode;
};
const SaleByProduct = ({ children }: SaleByProductProps) => {
  return (
    <section className="flex flex-col gap-4 px-6 pt-6">{children}</section>
  );
};

export default SaleByProduct;
