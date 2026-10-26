
import React from "react";
import {
  UserRound,
  FileUp,
  GraduationCap,
  ShieldCheck,
  CreditCard,
  Headset,
  UsersRound,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  { title: "Update Profile", path: "/user/profile", icon: UserRound },
  { title: "Upload Documents", path: "/user/documents", icon: FileUp },
  { title: "Continue Training", path: "/user/training", icon: GraduationCap },
  { title: "Check Application Status", path: "/user/applications", icon: ShieldCheck },
  { title: "Make a Payment", path: "/user/payments", icon: CreditCard },
  { title: "Submit a Grievance", path: "/user/grievances", icon: Headset },
  { title: "Request Family Access", path: "/user/family-access", icon: UsersRound },
];

const QuickActions = () => (
  <section className="rounded-lg border border-[#e4ebf5] bg-white p-2.5">
    <h2 className="mb-2 text-xs font-bold text-[#102d66]">
      Quick Actions
    </h2>

    <div className="space-y-0.5">
      {actions.map(({ title, path, icon: Icon }) => (
        <Link
          key={title}
          to={path}
          className="flex items-center gap-2 rounded-md px-1.5 py-1.5 text-[9px] text-[#29436d] transition hover:bg-blue-50 hover:text-blue-700"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#e4ecfa] bg-[#f5f8ff] text-blue-600">
            <Icon size={12} />
          </span>

          <span className="min-w-0 flex-1">{title}</span>
          <ChevronRight size={12} className="shrink-0 text-slate-400" />
        </Link>
      ))}
    </div>
  </section>
);

export default QuickActions;
