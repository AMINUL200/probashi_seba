
import React from "react";
import {
  UserRound,
  GraduationCap,
  BriefcaseBusiness,
  FileText,
  Wallet,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Profile Completion",
    value: "80%",
    icon: UserRound,
    color: "blue",
    progress: 80,
    action: "Complete your profile",
    path: "/user/profile",
  },
  {
    title: "Training Progress",
    value: "2 / 3",
    icon: GraduationCap,
    color: "green",
    progress: 67,
    action: "Continue your training",
    path: "/user/training",
  },
  {
    title: "Job Applications",
    value: "3",
    icon: BriefcaseBusiness,
    color: "purple",
    detail: "1 under review",
    action: "View applications",
    path: "/user/applications",
  },
  {
    title: "Clearance Status",
    value: "In Progress",
    icon: FileText,
    color: "blue",
    action: "View details",
    path: "/user/clearance",
  },
  {
    title: "Next Payment",
    value: "BDT 25,000",
    icon: Wallet,
    color: "purple",
    detail: "Due on 15 Nov 2024",
    action: "Make a payment",
    path: "/user/payments",
  },
];

const themes = {
  blue: {
    icon: "bg-blue-100 text-blue-600",
    progress: "bg-blue-600",
  },
  green: {
    icon: "bg-emerald-100 text-emerald-600",
    progress: "bg-emerald-600",
  },
  purple: {
    icon: "bg-purple-100 text-purple-600",
    progress: "bg-purple-600",
  },
};

const DashboardStatCards = () => (
  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
    {stats.map((item) => {
      const Icon = item.icon;
      const theme = themes[item.color];

      return (
        <article
          key={item.title}
          className="flex min-w-0 flex-col rounded-lg border border-[#e4ebf5] bg-white p-2.5 shadow-[0_2px_7px_rgba(28,60,110,0.025)]"
        >
          <div className="flex items-center gap-2">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${theme.icon}`}>
              <Icon size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-semibold leading-3 text-[#405477]">
                {item.title}
              </p>
              <p className="mt-1 truncate text-sm font-extrabold text-[#102d66]">
                {item.value}
              </p>
            </div>
          </div>

          {item.progress != null ? (
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${theme.progress}`}
                style={{ width: `${item.progress}%` }}
              />
            </div>
          ) : item.title === "Clearance Status" ? (
            <span className="mt-2 w-fit rounded bg-emerald-100 px-2 py-0.5 text-[8px] font-bold text-emerald-700">
              BMET application submitted
            </span>
          ) : (
            <p className="mt-2 truncate text-[8px] text-slate-400">
              {item.detail}
            </p>
          )}

          <Link
            to={item.path}
            className="mt-auto flex items-center gap-1 pt-3 text-[9px] font-medium text-blue-600 hover:text-blue-800"
          >
            {item.action}
            <ArrowRight size={10} />
          </Link>
        </article>
      );
    })}
  </div>
);

export default DashboardStatCards;
