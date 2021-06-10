import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import "./Chart.css";

const COLORS = ["#34a79aaa", "#2296f450", "#ef5350aa"];

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

const Chart = (props) => {
  const data01 = [
    { name: "Positive", value: props.sentiment[0] },
    { name: "Neutral", value: props.sentiment[1] },
    { name: "Negative", value: props.sentiment[2] },
  ];

  const pieChartSize =
    window.innerWidth < window.innerHeight
      ? window.innerWidth
      : window.innerHeight;

  const requiredPieChartSize = pieChartSize * 0.7;

  return (
    <div className="chart__container">
      <div className="chart__legend">
        <div className="chart__legend-container">
          <div className="chart__legend-item">
            <div
              style={{
                height: "10px",
                width: "10px",
                backgroundColor: "#34a79aaa",
                margin: "auto 10px",
              }}
            ></div>
            <div style={{color: "#b2b5be"}}>Positive</div>
          </div>
          <div className="chart__legend-item">
            <div
              style={{
                height: "10px",
                width: "10px",
                backgroundColor: "#2296f450",
                margin: "auto 10px",
              }}
            ></div>
            <div style={{color: "#b2b5be"}}>Neutral</div>
          </div>
          <div className="chart__legend-item">
            <div
              style={{
                height: "10px",
                width: "10px",
                backgroundColor: "#ef5350aa",
                margin: "auto 10px",
              }}
            ></div>
            <div style={{color: "#b2b5be"}}>Negative</div>
          </div>
        </div>
      </div>
      <div className="chart__chart">
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
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip animationEasing="ease" />
        </PieChart>
      </div>
    </div>
  );
};

export default Chart;
