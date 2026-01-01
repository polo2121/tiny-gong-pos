"use client";
import React from "react";

import {
  BarChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
} from "recharts";

// #region Sample data
const data = [
  {
    name: "23",
    uv: 4000,
  },
  {
    name: "24",
    uv: 3000,
  },
  {
    name: "25",
    uv: 2000,
  },
  {
    name: "26",
    uv: 2780,
  },
  {
    name: "27",
    uv: 2000,
  },
  {
    name: "28",
    uv: 2390,
  },
  {
    name: "29",
    uv: 3490,
  },
  {
    name: "23",
    uv: 4000,
  },
  {
    name: "24",
    uv: 3000,
  },
  {
    name: "25",
    uv: 2000,
  },
  {
    name: "26",
    uv: 2780,
  },
  {
    name: "27",
    uv: 2000,
  },
  {
    name: "28",
    uv: 2390,
  },
  {
    name: "29",
    uv: 3490,
  },
];

const SaleBarChart = () => {
  const maxValue = Math.max(...data.map((d) => d.uv));

  return (
    <div className="relative w-full mt-8 flex">
      {/* Fixed Y Axis */}
      <aside className="sticky left-0 z-20 bg-white">
        <BarChart
          data={data}
          width={38}
          height={220}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          style={{ fontFamily: "margarine, sans-serif" }}
        >
          <YAxis
            tick={{ fill: "#431407", fontSize: 10, opacity: 0.7 }}
            tickMargin={28}
            tickLine={false}
            axisLine={false}
            domain={[0, "dataMax"]}
          />

          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#431407", fontSize: 10, opacity: 0.7 }}
          />
          {/* Dummy bar for scale */}
          <Bar dataKey="uv" fill="transparent" isAnimationActive={false} />
        </BarChart>
      </aside>

      {/* Scrollable Bars */}
      <figure className="overflow-x-auto w-full">
        <BarChart
          data={data}
          width={data.length * 40}
          height={220}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          style={{ fontFamily: "margarine, sans-serif" }}
        >
          <CartesianGrid
            strokeDasharray="12 12"
            vertical={false}
            opacity={0.4}
          />

          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#431407", fontSize: 10, opacity: 0.7 }}
          />

          <Tooltip />

          <Bar
            dataKey="uv"
            barSize={30}
            radius={[16, 16, 16, 16]}
            isAnimationActive={false}
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.uv === maxValue ? "#C98039" : "#D3CCC5"} />
            ))}
          </Bar>
        </BarChart>
      </figure>
    </div>
  );
};

export default SaleBarChart;
