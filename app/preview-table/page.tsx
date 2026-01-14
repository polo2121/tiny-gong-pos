"use client";
import React, { ReactHTMLElement, ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import Table from "./table";

type TableName = "product" | "sale";

type Column = {
  key: string;
  label: string;
};
type TableCols = {
  [tableName in TableName]: Column[];
};

const page = () => {
  const [activeTable, setActiveTable] = useState("Products");
  const tabType = [{ name: "Products" }, { name: "Sales" }];

  const tableCols: TableCols = {
    product: [
      { key: "pid", label: "pid" },
      { key: "name", label: "Name" },
      { key: "category", label: "Category" },
      { key: "created_at", label: "Created At" },
    ],
    sale: [
      { key: "sid", label: "SI202929042" },
      { key: "total", label: "4400" },
      { key: "payment_method", label: "k-pay" },
      { key: "created_at", label: "Created" },
    ],
  };

  const saleData = [
    {
      sid: "S001",
      total: 450,
      payment_method: "QR",
      created_at: "2025-01-10",
    },
    {
      sid: "S002",
      total: 320,
      payment_method: "Cash",
      created_at: "2025-01-11",
    },
  ];

  const handleTab = (tabName: string) => {
    setActiveTable(tabName);
  };

  return (
    <section className="p-4">
      <div className="flex gap-4">
        {tabType.map((type) => (
          <Button
            className="w-30 py-5 rounded-full border border-gray-200 bg-gray-100 shadow-drop-mobile-menu relative hover:bg-accent group cursor-pointer focus-visible:none will-change-transform transition-transform select-none touch-none animate-(--anim-bubble) active:animate-(--anim-bubble-press) bubble-button overflow-hidden text-gray-700 font-margarine"
            key={type.name}
            onClick={() => {
              handleTab(type.name);
            }}
          >
            {/* Up Hightlight */}
            <svg
              className="absolute top-0.5 left-1.5 z-10"
              width="17"
              height="14"
              viewBox="0 0 17 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.7"
                d="M1.5 12C4.5 6 9 3 15.5003 1.5"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="bevel"
              />
            </svg>

            {type.name}
            {/* Down Highlight */}
            <svg
              className="absolute bottom-0.5 right-1.5"
              width="14"
              height="11"
              viewBox="0 0 14 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.7"
                d="M1.5 9.5C5.73077 8.55882 9.53846 6.67647 12.5 1.5"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="bevel"
              />
            </svg>
          </Button>
        ))}
      </div>

      {/* <TableContainer /> */}
      {activeTable === "Products" && <ProductTable />}
    </section>
  );
};

export default page;

const ProductTable = () => {
  const tableCols: TableCols = {
    product: [
      { key: "pid", label: "Product Id" },
      { key: "name", label: "Name" },
      { key: "category", label: "Category" },
      { key: "created_at", label: "Created" },
    ],
  };
  const productData = [
    {
      pid: "P001",
      name: "Kids Long Sleeve – Car Print",
      category: "Shirt",
      created_at: "2025-01-01",
    },
    {
      pid: "P002",
      name: "Girls Dress – Floral",
      category: "Dress",
      created_at: "2025-01-03",
    },
  ];
  return <Table cols={tableCols.product} data={productData} />;
};

const Sales = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};
