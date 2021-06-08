import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import "./Chart.css";

const data01 = [
    { name: "Positive", value: 400 },
    { name: "Neutral", value: 300 },
    { name: "Negative", value: 300 },
  ];

const COLORS = ["#ef5350", "#3f485f", "#34a79a"];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index,
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };
export default function Chart() {
  const pieChartSize =
    window.innerWidth < window.innerHeight
      ? window.innerWidth
      : window.innerHeight;

    const requiredPieChartSize = pieChartSize*0.7;

  return (
    <div className="chart__container">
      <PieChart width={requiredPieChartSize} height={requiredPieChartSize}>
        <Pie
          dataKey="value"
          data={data01}
          cx="50%"
          cy="50%"
          outerRadius="80%"
          fill="#131722"
          label
        >
          {data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip animationEasing='ease'/>
      </PieChart>
    </div>
  );
}
