
import React from "react";
import {
  Settings,
  ShieldCheck,
  FileUp,
  GraduationCap,
  UsersRound,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    label: "Update Profile",
    path: "/user/profile",
    icon: Settings,
  },
  {
    label: "Upload Documents",
    path: "/user/documents",
    icon: FileUp,
  },
  {
    label: "Add Educational Details",
    path: "/user/training",
    icon: GraduationCap,
  },
  {
    label: "Manage Family Access",
    path: "/user/family-access",
    icon: UsersRound,
  },
];

const ProfileQuickActions = () => (
  <section className="rounded-lg border border-[#e5ebf4] bg-white p-3">
    <h3 className="mb-2 flex items-center gap-2 text-[11px] font-bold text-[#102d66]">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <ShieldCheck size={16} />
      </span>
      Quick Actions
    </h3>

    <div className="space-y-0.5">
      {actions.map(({ label, path, icon: Icon }) => (
        <Link
          key={label}
          to={path}
          className="flex items-center gap-2 border-t border-[#edf1f7] py-1.5 text-[9px] text-[#30466e] hover:text-blue-600"
        >
          <Icon size={13} className="shrink-0 text-blue-600" />
          <span className="min-w-0 flex-1">{label}</span>
          <ChevronRight size={12} className="shrink-0 text-slate-400" />
        </Link>
      ))}
    </div>
  </section>
);

export default ProfileQuickActions;
