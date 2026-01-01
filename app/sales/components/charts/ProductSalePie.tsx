"use client";
import React from "react";
import { Cell, Pie, PieChart, PieLabelRenderProps } from "recharts";

// #region Sample data
const data = [
  { name: "Coca-Cola Original Taste 1.25L PET Bottle", value: 400 },
  { name: "Nescafé Gold Blend Instant Coffee Freeze-Dried 200g", value: 300 },
  { name: "Thai Hom Mali Jasmine Rice Premium Grade AAA 5kg", value: 300 },
];

// #endregion
const RADIAN = Math.PI / 180;
const COLORS = ["#80CAA8", "#C1E1E2", "#F5C074"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
  value,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#3E260F"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={14}
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
      <tspan x={x} dy="1.2em">
        ({value})
      </tspan>
    </text>
  );
};

const ProductSalePie = () => {
  return (
    <figure className="relative">
      <PieChart
        style={{
          width: "100%",
          maxWidth: "500px",
          maxHeight: "50vh",
          aspectRatio: 1,
          margin: "0 auto",
        }}
        responsive
      >
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          label={renderCustomizedLabel}
          stroke="none"
          strokeWidth={0}
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>

      <figcaption className="text-center flex flex-col gap-2 text-md text-brown-900  bottom-0 left-0 right-0">
        <div className="flex items-center gap-3 justify-center bg-amer-300">
          {data.map(({ name }, index) => (
            <>
              <div
                className={`w-4 h-4 rounded-full`}
                style={{ background: COLORS[index] }}
              ></div>
              <span className="font-medium text-xs" key={name}>
                {name}
              </span>
            </>
          ))}
        </div>
      </figcaption>
    </figure>
  );
};

export default ProductSalePie;
