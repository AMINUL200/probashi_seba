
import React, { useState } from "react";
import { ShieldAlert } from "lucide-react";

const riskData = [
  { district: "Dhaka", risk: "High Risk", cases: 34, value: 76 },
  { district: "Cumilla", risk: "High Risk", cases: 22, value: 55 },
  { district: "Noakhali", risk: "Medium Risk", cases: 14, value: 44 },
  { district: "Chittagong", risk: "Medium Risk", cases: 12, value: 39 },
  { district: "Sylhet", risk: "Low Risk", cases: 6, value: 32 },
  { district: "Rangpur", risk: "Low Risk", cases: 4, value: 25 },
];

const riskColors = {
  "High Risk": {
    bar: "from-red-500 to-rose-400",
    text: "text-red-400",
  },
  "Medium Risk": {
    bar: "from-amber-500 to-yellow-400",
    text: "text-yellow-400",
  },
  "Low Risk": {
    bar: "from-sky-500 to-blue-400",
    text: "text-sky-400",
  },
};

const FraudHeatmap = () => {
  const [division, setDivision] = useState("All Divisions");

  const visibleRows =
    division === "All Divisions"
      ? riskData
      : riskData.filter((item) =>
          division === "Dhaka"
            ? item.district === "Dhaka" || item.district === "Rangpur"
            : item.district === "Cumilla" ||
              item.district === "Noakhali" ||
              item.district === "Chittagong"
        );

  return (
    <section className="rounded-lg border border-[#0b4775] bg-[#041c38] p-3">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h2 className="flex items-center gap-2 text-xs font-bold text-white">
            <ShieldAlert size={17} className="text-orange-400" />
            Fraud Heatmap · Risk by District
          </h2>
          <p className="mt-1 text-[9px] text-slate-300">
            Last 30 Days · Severity Scale
          </p>
        </div>

        <select
          value={division}
          onChange={(event) => setDivision(event.target.value)}
          className="max-w-[120px] rounded border border-[#245276] bg-[#062747] px-2 py-1 text-[9px] text-white outline-none"
        >
          <option>All Divisions</option>
          <option>Dhaka</option>
          <option>Chattogram</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[310px] border-collapse text-left text-[9px]">
          <thead>
            <tr className="border-b border-[#17405f] text-slate-300">
              <th className="pb-2 font-medium">District</th>
              <th className="w-[42%] pb-2 font-medium">Risk Level</th>
              <th className="pb-2 text-right font-medium">Cases</th>
            </tr>
          </thead>

          <tbody>
            {visibleRows.map((item) => (
              <tr
                key={item.district}
                className="border-b border-[#103452]/70 last:border-0"
              >
                <td className="py-1.5 pr-2 text-slate-200">
                  {item.district}
                </td>

                <td className="py-1.5 pr-2">
                  <div className="flex items-center gap-2">
                    <div className="h-[9px] flex-1 overflow-hidden rounded-sm bg-[#0a2b4a]">
                      <div
                        className={`h-full rounded-sm bg-gradient-to-r ${riskColors[item.risk].bar}`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>

                    <span
                      className={`w-[54px] shrink-0 ${riskColors[item.risk].text}`}
                    >
                      {item.risk}
                    </span>
                  </div>
                </td>

                <td className="py-1.5 text-right font-medium text-white">
                  {item.cases}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-[#17405f] pt-2">
        {[
          ["bg-red-500", "Critical Risk"],
          ["bg-orange-500", "High Risk"],
          ["bg-yellow-400", "Medium Risk"],
          ["bg-blue-400", "Low Risk"],
        ].map(([color, label]) => (
          <span
            key={label}
            className="flex items-center gap-1 text-[8px] text-slate-300"
          >
            <span className={`h-2 w-2 rounded-full ${color}`} />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
};

export default FraudHeatmap;
