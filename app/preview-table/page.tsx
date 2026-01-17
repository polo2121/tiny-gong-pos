"use client";
import React, { ReactHTMLElement, ReactNode, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import ProductTable from "./components/ProductTable";

type Column = {
  key: string;
  label: string;
};

const page = () => {
  const router = useRouter();
  const [activeTable, setActiveTable] = useState("Products");
  const tabType = ["products", "sales"];

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/table-login");
      }
    });
  }, []);

  const handleTab = (tabName: string) => {
    setActiveTable(tabName);
  };

  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut();
    console.log("Logged out", error);
    router.push("/table-login");
  };

  return (
    <section className="p-4">
      <div className="flex gap-4">
        {tabType.map((type) => (
          <Button
            className="w-30 py-5 rounded-full border border-gray-200 bg-gray-100 shadow-drop-mobile-menu relative hover:bg-accent group cursor-pointer focus-visible:none will-change-transform transition-transform select-none touch-none animate-(--anim-bubble) active:animate-(--anim-bubble-press) bubble-button overflow-hidden text-gray-700 font-margarine capitalize"
            key={type}
            onClick={() => {
              handleTab(type);
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

            {type}
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
        <Button
          className="w-30 py-5 rounded-full border border-gray-200 bg-gray-100 shadow-drop-mobile-menu relative hover:bg-accent group cursor-pointer focus-visible:none will-change-transform transition-transform select-none touch-none animate-(--anim-bubble) active:animate-(--anim-bubble-press) bubble-button overflow-hidden text-gray-700 font-margarine capitalize"
          onClick={handleLogout}
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
          logout
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
      </div>

      {/* <TableContainer /> */}
      {activeTable === "Products" && <ProductTable />}
    </section>
  );
};

export default page;
