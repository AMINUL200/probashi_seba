
import React from "react";
import {
  Users,
  Plane,
  CircleDollarSign,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "TOTAL REGISTERED WORKERS",
    value: "12,000,000",
    change: "+2.4% vs last month",
    icon: Users,
    color: "cyan",
    bars: [15, 22, 30, 25, 40, 55, 70, 85],
  },
  {
    title: "ACTIVE OVERSEAS WORKERS",
    value: "4,832,150",
    change: "+6.8% vs last month",
    icon: Plane,
    color: "green",
    bars: [18, 28, 20, 40, 34, 50, 65, 78],
  },
  {
    title: "REMITTANCE INFLOWS (YTD 2024)",
    value: "$24.6 BILLION USD",
    change: "+8.1% YoY  |  ৳2.97 TRILLION BDT",
    icon: CircleDollarSign,
    color: "purple",
    bars: [18, 25, 35, 27, 45, 52, 68, 88],
  },
  {
    title: "FRAUD ALERTS (LAST 30 DAYS)",
    value: "127",
    change: "Resolved: 98   |   Investigating: 29",
    icon: ShieldAlert,
    color: "orange",
    bars: [20, 30, 25, 45, 48, 65, 78, 95],
  },
];

const themes = {
  cyan: {
    card: "from-[#073c65] to-[#041e3b]",
    icon: "bg-cyan-500/20 text-cyan-300",
    accent: "text-cyan-300",
    bar: "bg-sky-500",
  },
  green: {
    card: "from-[#034f4b] to-[#032d37]",
    icon: "bg-emerald-500/20 text-emerald-300",
    accent: "text-emerald-300",
    bar: "bg-emerald-500",
  },
  purple: {
    card: "from-[#35105f] to-[#190c38]",
    icon: "bg-fuchsia-500/20 text-fuchsia-300",
    accent: "text-emerald-300",
    bar: "bg-fuchsia-500",
  },
  orange: {
    card: "from-[#543018] to-[#271a19]",
    icon: "bg-orange-500/20 text-orange-300",
    accent: "text-orange-300",
    bar: "bg-orange-500",
  },
};

const DashboardStatCards = () => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const theme = themes[stat.color];

        return (
          <article
            key={stat.title}
            className={`relative min-w-0 overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br ${theme.card} p-3 shadow-md`}
          >
            <div className="flex items-start gap-2.5">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${theme.icon}`}
              >
                <Icon size={23} strokeWidth={2.2} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[9px] font-semibold text-slate-200">
                  {stat.title}
                </p>

                <h3 className="mt-1 truncate text-xl font-extrabold leading-none tracking-tight text-white">
                  {stat.value}
                </h3>

                <p className={`mt-2 flex items-center gap-1 text-[9px] font-semibold ${theme.accent}`}>
                  {stat.color !== "orange" && <TrendingUp size={11} />}
                  {stat.change}
                </p>
              </div>
            </div>

            <div className="absolute bottom-2 right-2 flex h-7 items-end gap-[2px] opacity-70">
              {stat.bars.map((height, index) => (
                <span
                  key={index}
                  className={`w-[5px] rounded-t-[1px] ${theme.bar}`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default DashboardStatCards;
