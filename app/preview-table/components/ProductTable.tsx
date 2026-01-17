import React from "react";
import Table from "../table";

const ProductTable = () => {
  type ProductColumn = { key: string; label: string };

  let data = ["Hello"];

  const productCols: ProductColumn[] = [
    { key: "pid", label: "Product Id" },
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "created_at", label: "Created" },
  ];

  return <Table cols={productCols} data={data} />;
};

export default ProductTable;
