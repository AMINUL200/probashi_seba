
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  ShieldCheck,
  CreditCard,
  Headset,
  UsersRound,
  FolderOpen,
  MessageSquare,
  Settings,
  X,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    path: "/user/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Profile",
    path: "/user/profile",
    icon: UserRound,
  },
  {
    label: "Job Opportunities",
    path: "/user/job-opportunities",
    icon: BriefcaseBusiness,
  },
  {
    label: "My Applications",
    path: "/user/applications",
    icon: FileText,
  },
  {
    label: "Training & Certificates",
    path: "/user/training",
    icon: GraduationCap,
  },
  {
    label: "Clearance (BMET)",
    path: "/user/clearance",
    icon: ShieldCheck,
  },
  {
    label: "Payments",
    path: "/user/payments",
    icon: CreditCard,
  },
  {
    label: "Grievances & Support",
    path: "/user/grievances",
    icon: Headset,
  },
  {
    label: "Family Access",
    path: "/user/family-access",
    icon: UsersRound,
  },
  {
    label: "Documents",
    path: "/user/documents",
    icon: FolderOpen,
  },
  {
    label: "Messages",
    path: "/user/messages",
    icon: MessageSquare,
    badge: 3,
  },
  {
    label: "Settings",
    path: "/user/settings",
    icon: Settings,
  },
];

const UserSidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[65] bg-slate-950/40 md:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-14 z-[70] flex w-[240px] flex-col border-r border-[#e5ebf4] bg-white transition-transform duration-300 md:w-[160px] md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile sidebar header */}
        <div className="flex h-12 items-center justify-between border-b border-slate-100 px-4 md:hidden">
          <span className="text-xs font-bold text-[#173667]">
            Navigation
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-2">
          {menuItems.map(({ label, path, icon: Icon, badge }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/user/dashboard"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `group flex min-h-[34px] items-center gap-2 rounded-md px-2 py-2 text-[10px] font-medium transition-colors ${
                  isActive
                    ? "bg-[#e0edff] text-[#0759dc]"
                    : "text-[#233d69] hover:bg-[#f0f5fc] hover:text-[#0759dc]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={15}
                    strokeWidth={isActive ? 2.3 : 1.8}
                    className="shrink-0"
                  />

                  <span className="min-w-0 flex-1 leading-4">
                    {label}
                  </span>

                  {badge > 0 && (
                    <span className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                      {badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default UserSidebar;
