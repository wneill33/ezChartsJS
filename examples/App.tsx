import React from "react";
import { BarChart, LineChart, ScatterPlot, AreaChart, Legend } from "ezcharts";

export const App = () => {
  // Sample data
  const barData = [
    { label: "Jan", value: 30 },
    { label: "Feb", value: 45 },
    { label: "Mar", value: 60 },
    { label: "Apr", value: 35 },
    { label: "May", value: 70 },
    { label: "Jun", value: 55 },
  ];

  const lineData = [
    {
      name: "Series A",
      data: [
        { x: 1, y: 30 },
        { x: 2, y: 45 },
        { x: 3, y: 60 },
        { x: 4, y: 35 },
        { x: 5, y: 70 },
      ],
      color: "#3b82f6",
    },
    {
      name: "Series B",
      data: [
        { x: 1, y: 20 },
        { x: 2, y: 35 },
        { x: 3, y: 45 },
        { x: 4, y: 55 },
        { x: 5, y: 50 },
      ],
      color: "#ef4444",
    },
  ];

  const scatterData = Array.from({ length: 50 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 2,
  }));

  const areaData = [
    {
      name: "Revenue",
      data: [
        { x: 1, y: 30 },
        { x: 2, y: 45 },
        { x: 3, y: 60 },
        { x: 4, y: 35 },
        { x: 5, y: 70 },
        { x: 6, y: 55 },
      ],
      color: "#10b981",
    },
  ];

  return (
    <div className="container">
      <h1>ezCharts - Professional Visualization Library</h1>

      <div>
        {/* Bar Chart */}
        <section className="chart-section">
          <h2>Bar Chart</h2>
          <BarChart
            data={barData}
            width={800}
            height={400}
            showGrid={true}
          />
        </section>

        {/* Line Chart */}
        <section className="chart-section">
          <h2>Line Chart</h2>
          <LineChart
            series={lineData}
            width={800}
            height={400}
            showGrid={true}
            showPoints={true}
          />
          <div className="legend-container">
            <Legend
              items={[
                { label: "Series A", color: "#5470c6" },
                { label: "Series B", color: "#91cc75" },
              ]}
            />
          </div>
        </section>

        {/* Scatter Plot */}
        <section className="chart-section">
          <h2>Scatter Plot</h2>
          <ScatterPlot
            data={scatterData}
            width={800}
            height={400}
            showGrid={true}
          />
        </section>

        {/* Area Chart */}
        <section className="chart-section">
          <h2>Area Chart</h2>
          <AreaChart
            series={areaData}
            width={800}
            height={400}
            showGrid={true}
          />
        </section>
      </div>
    </div>
  );
};
