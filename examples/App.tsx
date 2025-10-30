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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          ezCharts - Minimalist Visualization Library
        </h1>

        <div className="space-y-12">
          {/* Bar Chart */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Bar Chart
            </h2>
            <BarChart
              data={barData}
              width={800}
              height={400}
              color="#3b82f6"
              showGrid={true}
            />
          </section>

          {/* Line Chart */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Line Chart
            </h2>
            <LineChart
              series={lineData}
              width={800}
              height={400}
              showGrid={true}
              showPoints={true}
            />
            <div className="mt-4 flex justify-center">
              <Legend
                items={[
                  { label: "Series A", color: "#3b82f6" },
                  { label: "Series B", color: "#ef4444" },
                ]}
              />
            </div>
          </section>

          {/* Scatter Plot */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Scatter Plot
            </h2>
            <ScatterPlot
              data={scatterData}
              width={800}
              height={400}
              defaultColor="#8b5cf6"
              showGrid={true}
            />
          </section>

          {/* Area Chart */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Area Chart
            </h2>
            <AreaChart
              series={areaData}
              width={800}
              height={400}
              showGrid={true}
            />
          </section>
        </div>
      </div>
    </div>
  );
};
