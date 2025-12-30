"use client";

import BubbleOutline from "@/components/BubbleOutline";
import BubbleOutlineFull from "@/components/BubbleOutlineFull";
import React, { useEffect, useState } from "react";

interface saleSummarySoFar {
  totalSale: number;
  totalQty: number;
  totalProfit: number;
}

interface saleSummaryItem {
  title: "Total Sale" | "Total Qty" | "Total Profit";
  burmeseLabel: string;
  totalAmount: number;
}

const CurrentSaleSummary = () => {
  const [saleSummarySoFar, setSaleSummarySoFar] = useState<saleSummarySoFar>({
    totalSale: 0,
    totalQty: 0,
    totalProfit: 0,
  });

  useEffect(() => {
    // Fetch sale summary data from an API or data source
    const fetchSaleSummary = async () => {
      // Simulating an API call with static data
      const data = {
        totalSale: 10000000,
        totalQty: 150,
        totalProfit: 2500000,
      };
      setSaleSummarySoFar(data);
    };

    fetchSaleSummary();
  }, []);

  const saleSummaryItems: saleSummaryItem[] = [
    {
      title: "Total Sale",
      burmeseLabel: "စုစုပေါင်းစာရင်း",
      totalAmount: saleSummarySoFar.totalSale,
    },
    {
      title: "Total Qty",
      burmeseLabel: "စုစုပေါင်းအရေအတွက်",
      totalAmount: saleSummarySoFar.totalQty,
    },
    {
      title: "Total Profit",
      burmeseLabel: "စုစုပေါင်းအမြတ်",
      totalAmount: saleSummarySoFar.totalProfit,
    },
  ];

  return (
    <section className="flex flex-col gap-4 px-6 pt-6">
      <div>
        <h1 className="font-margarine font-base text-lg">
          Current Sale (Till Now)
        </h1>
        <p className="font-uMoe text-sm">(ယနေ့ထိအရောင်း)</p>
      </div>

      {/* Sale Summary Cards (Sale, Qty) */}
      <div className="w-full grid grid-cols-1 gap-4 justify-between xs:grid-cols-2 md:grid-cols-3">
        {saleSummaryItems.map((item) => {
          if (item.title !== "Total Profit") {
            return (
              <BubbleOutline
                key={item.title}
                title={item.title}
                burmeseLabel={item.burmeseLabel}
                totalAmount={item.totalAmount}
              />
            );
          }
        })}
      </div>

      {/* Sale Summary Cards (Profit) */}
      <div className="w-full grid grid-cols-1 gap-4 justify-between xs:grid-cols-1 md:grid-cols-3">
        {saleSummaryItems[2] && <BubbleOutlineFull />}
      </div>
    </section>
  );
};

export default CurrentSaleSummary;
