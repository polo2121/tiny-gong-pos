"use client";
import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const ProfitSoFarChart = () => {
  const data = [
    {
      name: "Jan",
      uv: 400,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 300,
      pv: 4567,
      amt: 2400,
    },
    {
      name: "Mar",
      uv: 500,
      pv: 3200,
      amt: 2400,
    },
    {
      name: "Apr",
      uv: 450,
      pv: 4100,
      amt: 2400,
    },
    {
      name: "May",
      uv: 600,
      pv: 4800,
      amt: 2400,
    },
    {
      name: "Jun",
      uv: 550,
      pv: 5300,
      amt: 2400,
    },
    {
      name: "Jul",
      uv: 650,
      pv: 6000,
      amt: 2400,
    },
    {
      name: "Aug",
      uv: 620,
      pv: 5800,
      amt: 2400,
    },
    {
      name: "Sep",
      uv: 700,
      pv: 6500,
      amt: 2400,
    },
    {
      name: "Oct",
      uv: 680,
      pv: 6200,
      amt: 2400,
    },
    {
      name: "Nov",
      uv: 720,
      pv: 7000,
      amt: 2400,
    },
    {
      name: "Dec",
      uv: 800,
      pv: 7800,
      amt: 2400,
    },
    {
      name: "Dec",
      uv: 1200,
      pv: 7800,
      amt: 2400,
    },
  ];

  return (
    <div className="flex w-full bg-ble-500 overflow-scroll">
      {/* sticky Y axis */}
      <div className="absolute w-12 h-fit z-1 bg-aber-200 overflow-hidden bg-white">
        <LineChart
          data={data}
          width={data.length * 80}
          height={100}
          margin={{ top: 20, right: 20, bottom: 10, left: 0 }}
        >
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#431407", fontSize: 12, opacity: 0.7 }}
            tickMargin={10}
            pointerEvents="none"
          />
          <YAxis
            tick={{ fill: "#431407", fontSize: 12, opacity: 0.7 }}
            tickMargin={10}
          />
          <Line
            dataKey="uv"
            pointerEvents="none"
            activeDot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </div>

      {/* Scrollable chart */}
      <div className="overflow-x-auto w-full bg-rd-200 relative">
        <LineChart
          data={data}
          width={data.length * 80}
          height={100}
          margin={{ top: 20, right: 20, bottom: 10, left: 0 }}
        >
          <CartesianGrid
            stroke="#aaa"
            strokeDasharray="12 12"
            vertical={false}
          />

          <Line
            type="monotone"
            dataKey="uv"
            stroke="#431407"
            strokeWidth={2}
            dot={{ r: 2, fill: "#431407" }}
            label={{ position: "top", fill: "#431407", fontSize: 10 }}
            pointerEvents="none"
            activeDot={false}
          />

          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#431407", fontSize: 12, opacity: 0.7 }}
            tickMargin={10}
            pointerEvents="none"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            domain={[0, "dataMax"]}
            tick={{ fill: "#431407", fontSize: 12, opacity: 0.7 }}
            tickMargin={10}
            pointerEvents="none"
            
          />
        </LineChart>
      </div>
    </div>
  );
};

export default ProfitSoFarChart;
