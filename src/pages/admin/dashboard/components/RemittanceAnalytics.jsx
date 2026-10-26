
import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ChartNoAxesCombined, Landmark, Banknote } from "lucide-react";

const chartData = {
  2024: [
    { month: "Jan", value: 0.9 },
    { month: "Feb", value: 1.2 },
    { month: "Mar", value: 1.5 },
    { month: "Apr", value: 1.4 },
    { month: "May", value: 1.7 },
    { month: "Jun", value: 1.6 },
    { month: "Jul", value: 1.9 },
    { month: "Aug", value: 2.0 },
    { month: "Sep", value: 2.2 },
    { month: "Oct", value: 2.1 },
    { month: "Nov", value: 1.9 },
    { month: "Dec", value: 2.0 },
  ],
  2025: [
    { month: "Jan", value: 1.1 },
    { month: "Feb", value: 1.3 },
    { month: "Mar", value: 1.6 },
    { month: "Apr", value: 1.7 },
    { month: "May", value: 1.8 },
    { month: "Jun", value: 2.0 },
    { month: "Jul", value: 2.1 },
    { month: "Aug", value: 2.3 },
    { month: "Sep", value: 2.4 },
    { month: "Oct", value: 2.2 },
    { month: "Nov", value: 2.5 },
    { month: "Dec", value: 2.7 },
  ],
};

const remittanceSources = [
  {
    title: "Top Source Country",
    name: "Saudi Arabia",
    amount: "$6.2B · 25.2%",
    icon: Banknote,
    color: "text-emerald-400",
  },
  {
    title: "Top Banking",
    name: "Banking",
    amount: "MFS: 27% · Exchange House: 15%",
    icon: Landmark,
    color: "text-cyan-400",
  },
  {
    title: "Avg Transaction",
    name: "$1,120",
    amount: "+5.3% vs 2023",
    icon: ChartNoAxesCombined,
    color: "text-teal-300",
  },
];

const RemittanceAnalytics = () => {
  const [year, setYear] = useState("2024");
  const [currency, setCurrency] = useState("USD");

  const multiplier = currency === "USD" ? 1 : 122;

  return (
    <section className="rounded-lg border border-[#0b4775] bg-[#041c38] p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="flex items-center gap-2 text-xs font-bold text-white">
            <ChartNoAxesCombined size={17} className="text-cyan-400" />
            Remittance Analytics
          </h2>
          <p className="mt-1 text-[9px] text-slate-300">
            Monthly Remittance Inflows · {year} (in {currency} Billions)
          </p>
        </div>

        <div className="flex gap-1.5">
          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="rounded border border-[#245276] bg-[#062747] px-2 py-1 text-[9px] text-white outline-none"
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>

          <select
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            className="rounded border border-[#245276] bg-[#062747] px-2 py-1 text-[9px] text-white outline-none"
          >
            <option value="USD">USD</option>
            <option value="BDT">BDT</option>
          </select>
        </div>
      </div>

      <div className="h-[120px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData[year].map((item) => ({
              ...item,
              displayedValue: item.value * multiplier,
            }))}
            margin={{ top: 5, right: 4, left: -24, bottom: 0 }}
          >
            <CartesianGrid
              stroke="#153a59"
              strokeDasharray="3 3"
              vertical
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#94a3b8", fontSize: 8 }}
              axisLine={{ stroke: "#245276" }}
              tickLine={false}
              interval={0}
            />

            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 8 }}
              axisLine={false}
              tickLine={false}
              tickCount={4}
            />

            <Tooltip
              contentStyle={{
                background: "#062747",
                border: "1px solid #245276",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "10px",
              }}
              formatter={(value) => [
                `${Number(value).toFixed(2)} ${currency} billion`,
                "Remittance",
              ]}
            />

            <Line
              type="monotone"
              dataKey="displayedValue"
              stroke="#00d9ff"
              strokeWidth={2}
              dot={{
                r: 2,
                fill: "#00d9ff",
                stroke: "#052747",
                strokeWidth: 1,
              }}
              activeDot={{ r: 4, fill: "#ffffff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-3">
        {remittanceSources.map((source) => {
          const Icon = source.icon;

          return (
            <div
              key={source.title}
              className="flex min-w-0 items-center gap-2 rounded-md border border-[#164265] bg-[#052644] p-2"
            >
              <Icon size={19} className={`shrink-0 ${source.color}`} />

              <div className="min-w-0">
                <p className="truncate text-[8px] text-slate-400">
                  {source.title}
                </p>
                <p className="truncate text-[10px] font-bold text-white">
                  {source.name}
                </p>
                <p className="truncate text-[8px] text-emerald-300">
                  {source.amount}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RemittanceAnalytics;
