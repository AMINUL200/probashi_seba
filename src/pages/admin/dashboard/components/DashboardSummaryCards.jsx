
import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {
  Globe,
  GraduationCap,
  FileText,
  Headset,
  ArrowRight,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const Panel = ({ title, icon: Icon, children, color = "text-sky-400" }) => (
  <section className="min-w-0 overflow-hidden rounded-lg border border-[#0b4775] bg-[#041c38]">
    <div className="flex items-center justify-between gap-2 border-b border-[#12395c] px-2.5 py-2">
      <h2 className="flex min-w-0 items-center gap-1.5 text-[10px] font-bold text-white">
        <Icon size={15} className={color} />
        <span className="truncate">{title}</span>
      </h2>

      <button
        type="button"
        className="flex shrink-0 items-center gap-1 text-[8px] text-sky-400 hover:text-white"
        onClick={() => {}}
      >
        View All <ArrowRight size={10} />
      </button>
    </div>

    <div className="p-2.5">{children}</div>
  </section>
);

const destinationCountries = [
  { flag: "🇸🇦", country: "Saudi Arabia", workers: "2,145,630", percent: 44.4, color: "#0ea5e9" },
  { flag: "🇦🇪", country: "UAE", workers: "856,420", percent: 17.7, color: "#10b981" },
  { flag: "🇲🇾", country: "Malaysia", workers: "412,350", percent: 8.5, color: "#38bdf8" },
  { flag: "🇶🇦", country: "Qatar", workers: "365,210", percent: 7.6, color: "#f97316" },
  { flag: "🇴🇲", country: "Oman", workers: "254,180", percent: 5.3, color: "#ef4444" },
  { flag: "🌐", country: "Others", workers: "800,210", percent: 16.5, color: "#facc15" },
];

const DoughnutPanel = ({
  title,
  icon,
  color,
  total,
  label,
  segments,
  legend,
}) => (
  <Panel title={title} icon={icon} color={color}>
    <div className="flex items-center gap-2">
      <div className="relative h-[108px] w-[108px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={segments}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={34}
              outerRadius={51}
              paddingAngle={1}
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {segments.map((segment) => (
                <Cell key={segment.name} fill={segment.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#062747",
                border: "1px solid #245276",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "10px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[13px] font-extrabold text-white">
            {total}
          </span>
          <span className="mt-0.5 text-[7px] text-slate-300">{label}</span>
        </div>
      </div>

      <div className="min-w-0 flex-1 space-y-2">
        {legend.map((item) => (
          <div key={item.label} className="flex items-start gap-1.5">
            <span
              className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div className="min-w-0">
              <p className="text-[8px] leading-3 text-slate-200">
                {item.label}
              </p>
              <p className="text-[8px] leading-3 text-slate-400">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Panel>
);

const DashboardSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 2xl:grid-cols-4">
      {/* Destination Countries */}
      <Panel title="Top Destination Countries" icon={Globe}>
        <div className="mb-2 grid grid-cols-[minmax(0,1fr)_auto_42px] gap-1 text-[8px] font-semibold text-slate-400">
          <span>Country</span>
          <span>Workers</span>
          <span>% of Total</span>
        </div>

        <div className="space-y-2">
          {destinationCountries.map((item) => (
            <div
              key={item.country}
              className="grid grid-cols-[minmax(0,1fr)_auto_42px] items-center gap-1 text-[8px]"
            >
              <span className="flex min-w-0 items-center gap-1 truncate text-slate-200">
                <span>{item.flag}</span>
                <span className="truncate">{item.country}</span>
              </span>

              <span className="text-slate-300">{item.workers}</span>

              <div className="flex items-center gap-1">
                <div className="h-2 w-5 overflow-hidden rounded-sm bg-[#0b3152]">
                  <div
                    className="h-full rounded-sm"
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <span className="text-slate-300">
                  {item.percent.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Training */}
      <DoughnutPanel
        title="Training & Skills"
        icon={GraduationCap}
        color="text-sky-400"
        total="200,450"
        label="Total Trainees"
        segments={[
          { name: "Completed", value: 60, color: "#10d98b" },
          { name: "In Progress", value: 25, color: "#00b7ff" },
          { name: "Not Started", value: 15, color: "#1264bd" },
        ]}
        legend={[
          { label: "Completed", value: "120,270", color: "#10d98b" },
          { label: "In Progress", value: "80,190 Not Started", color: "#00b7ff" },
          { label: "Training Centers", value: "100+", color: "#60a5fa" },
        ]}
      />

      {/* BMET */}
      <DoughnutPanel
        title="BMET Clearance Status"
        icon={FileText}
        color="text-sky-400"
        total="18,450"
        label="Total Applications"
        segments={[
          { name: "Approved", value: 66, color: "#10d98b" },
          { name: "In Progress", value: 22, color: "#168bff" },
          { name: "Pending", value: 8, color: "#facc15" },
          { name: "Rejected", value: 4, color: "#ff4949" },
        ]}
        legend={[
          { label: "Approved", value: "12,240 (66%)", color: "#10d98b" },
          { label: "In Progress", value: "4,120 (22%)", color: "#168bff" },
          { label: "Pending", value: "1,580 (8%)", color: "#facc15" },
          { label: "Rejected", value: "510 (4%)", color: "#ff4949" },
        ]}
      />

      {/* Grievances */}
      <DoughnutPanel
        title="Grievances & Support"
        icon={Headset}
        color="text-sky-400"
        total="3,280"
        label="Total Cases"
        segments={[
          { name: "Resolved", value: 65, color: "#10d98b" },
          { name: "Investigating", value: 22, color: "#168bff" },
          { name: "Pending", value: 9, color: "#facc15" },
          { name: "Critical", value: 4, color: "#ff4949" },
        ]}
        legend={[
          { label: "Resolved", value: "2,140 (65%)", color: "#10d98b" },
          { label: "Investigating", value: "720 (22%)", color: "#168bff" },
          { label: "Pending", value: "310 (9%)", color: "#facc15" },
          { label: "Critical", value: "110 (4%)", color: "#ff4949" },
        ]}
      />
    </div>
  );
};

export default DashboardSummaryCards;
