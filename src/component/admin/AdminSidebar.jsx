
import React, { useEffect, useState } from "react";
import {
  Home,
  Users,
  BriefcaseBusiness,
  GraduationCap,
  BadgeCheck,
  Wallet,
  MessageCircle,
  ShieldPlus,
  Globe2,
  HeartHandshake,
  Building2,
  ChartNoAxesCombined,
  LockKeyhole,
  PanelsTopLeft,
  Settings,
  ChevronRight,
  UserRoundCog,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NAVBAR_HEIGHT = 81;
const SIDEBAR_WIDTH = 250;

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    path: "/admin",
  },
  {
    id: "workers",
    label: "Workers",
    icon: Users,
    children: [
      { label: "All Workers", path: "/admin/workers" },
      { label: "Worker Registration", path: "/admin/workers/registration" },
      { label: "Worker Verification", path: "/admin/workers/verification" },
    ],
  },
  {
    id: "employment",
    label: "Overseas Employment",
    icon: BriefcaseBusiness,
    children: [
      { label: "Job Opportunities", path: "/admin/employment/jobs" },
      { label: "Applications", path: "/admin/employment/applications" },
      { label: "Recruitment Agencies", path: "/admin/employment/agencies" },
    ],
  },
  {
    id: "training",
    label: "training",
    label: "Training & Skills",
    icon: GraduationCap,
    children: [
      { label: "Training Programs", path: "/admin/training/programs" },
      { label: "Training Centers", path: "/admin/training/centers" },
      { label: "Certifications", path: "/admin/training/certifications" },
    ],
  },
  {
    id: "bmet",
    label: "BMET Clearance",
    icon: BadgeCheck,
    children: [
      { label: "Clearance Applications", path: "/admin/bmet/applications" },
      { label: "Clearance Verification", path: "/admin/bmet/verification" },
    ],
  },
  {
    id: "payments",
    label: "Payments & Remittance",
    icon: Wallet,
    children: [
      { label: "Payments", path: "/admin/payments" },
      { label: "Remittance Records", path: "/admin/remittance" },
    ],
  },
  {
    id: "grievances",
    label: "Grievances & Support",
    icon: MessageCircle,
    children: [
      { label: "All Grievances", path: "/admin/grievances" },
      { label: "Support Requests", path: "/admin/support" },
    ],
  },
  {
    id: "insurance",
    label: "Insurance & Claims",
    icon: ShieldPlus,
    children: [
      { label: "Insurance Policies", path: "/admin/insurance" },
      { label: "Claims", path: "/admin/insurance/claims" },
    ],
  },
  {
    id: "missions",
    label: "Overseas Missions",
    icon: Globe2,
    children: [
      { label: "Mission Directory", path: "/admin/missions" },
      { label: "Mission Contacts", path: "/admin/missions/contacts" },
    ],
  },
  {
    id: "reintegration",
    label: "Reintegration",
    icon: HeartHandshake,
    path: "/admin/reintegration",
  },
  {
    id: "agencies",
    label: "Agencies & Employers",
    icon: Building2,
    children: [
      { label: "Agencies", path: "/admin/agencies" },
      { label: "Employers", path: "/admin/employers" },
    ],
  },
  {
    id: "reports",
    label: "Reports & Analytics",
    icon: ChartNoAxesCombined,
    children: [
      { label: "Overview", path: "/admin/reports" },
      { label: "Worker Reports", path: "/admin/reports/workers" },
      { label: "Employment Reports", path: "/admin/reports/employment" },
    ],
  },
  {
    id: "fraud",
    label: "Fraud & Risk",
    icon: LockKeyhole,
    children: [
      { label: "Risk Monitoring", path: "/admin/fraud" },
      { label: "Reported Cases", path: "/admin/fraud/cases" },
    ],
  },
  {
    id: "content",
    label: "Content Management",
    icon: PanelsTopLeft,
    children: [
      { label: "Website Pages", path: "/admin/content/pages" },
      { label: "News & Updates", path: "/admin/content/news" },
      { label: "FAQs", path: "/admin/content/faqs" },
    ],
  },
  {
    id: "users",
    label: "User Management",
    icon: UserRoundCog,
    children: [
      { label: "All Users", path: "/admin/users" },
      { label: "Roles & Permissions", path: "/admin/users/roles" },
    ],
  },
  {
    id: "settings",
    label: "System Settings",
    icon: Settings,
    children: [
      { label: "General Settings", path: "/admin/site-settings" },
      { label: "Appearance", path: "/admin/settings/appearance" },
      { label: "Notifications", path: "/admin/settings/notifications" },
      { label: "Integrations", path: "/admin/settings/integrations" },
      { label: "Admin Profile", path: "/admin/profile" },
    ],
  },
];

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});

  const isActive = (path) => location.pathname === path;

  const isParentActive = (item) =>
    item.children?.some(
      (child) =>
        location.pathname === child.path ||
        location.pathname.startsWith(`${child.path}/`)
    );

  // Automatically expand the menu containing the current route.
  useEffect(() => {
    const activeMenus = {};

    menuItems.forEach((item) => {
      if (isParentActive(item)) {
        activeMenus[item.id] = true;
      }
    });

    setOpenDropdowns((previous) => ({
      ...previous,
      ...activeMenus,
    }));
  }, [location.pathname]);

  // Close the mobile drawer when navigating.
  const handleNavigation = (path) => {
    if (!path) return;

    navigate(path);
    setIsOpen(false);
  };

  const toggleDropdown = (id) => {
    setOpenDropdowns((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  return (
    <>
      {/* Mobile overlay starts below the navbar */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setIsOpen(false)}
          className="fixed inset-x-0 bottom-0 top-[81px] z-40 bg-black/20 lg:hidden"
        />
      )}

      {/* Sidebar begins immediately below the full-width navbar */}
      <aside
        style={{
          top: `${NAVBAR_HEIGHT}px`,
          height: `calc(100dvh - ${NAVBAR_HEIGHT}px)`,
          width: `${SIDEBAR_WIDTH}px`,
        }}
        className={`fixed left-0 z-40 flex flex-col border-r border-[#153452] bg-[#031a35] text-white transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Navigation */}
        <nav className="custom-scrollbar flex-1 space-y-[3px] overflow-x-hidden overflow-y-auto px-[7px] py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = item.path
              ? isActive(item.path)
              : Boolean(isParentActive(item));
            const expanded = Boolean(openDropdowns[item.id]);

            return (
              <div key={item.id}>
                {item.children ? (
                  <button
                    type="button"
                    onClick={() => toggleDropdown(item.id)}
                    aria-expanded={expanded}
                    className={`group flex min-h-[29px] w-full items-center justify-between gap-2 rounded-[5px] border-l-2 px-[7px] py-[6px] text-left transition-colors ${
                      active
                        ? "border-[#11a7ff] bg-[#073e86] text-white"
                        : "border-transparent text-slate-200 hover:bg-[#0b2b4b] hover:text-white"
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-[9px] ">
                      <Icon
                        size={14}
                        strokeWidth={1.8}
                        className={`shrink-0 ${
                          active
                            ? "text-white"
                            : "text-slate-300 group-hover:text-white"
                        }`}
                      />
                      <span className="truncate text-[13px] font-medium leading-4">
                        {item.label}
                      </span>
                    </span>

                    <ChevronRight
                      size={13}
                      className={`shrink-0 transition-transform duration-200 ${
                        expanded ? "rotate-90" : ""
                      } ${active ? "text-white" : "text-slate-400"}`}
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleNavigation(item.path)}
                    className={`group flex min-h-[29px] w-full items-center gap-[9px] rounded-[5px] border-l-2 px-[7px] py-[6px] text-left transition-colors ${
                      active
                        ? "border-[#11a7ff] bg-[#073e86] text-white"
                        : "border-transparent text-slate-200 hover:bg-[#0b2b4b] hover:text-white"
                    }`}
                  >
                    <Icon
                      size={14}
                      strokeWidth={1.8}
                      className="shrink-0 text-slate-300 group-hover:text-white"
                    />
                    <span className="truncate text-[10px] font-medium leading-4">
                      {item.label}
                    </span>
                  </button>
                )}

                {/* Dropdown children */}
                {item.children && (
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-200 ${
                      expanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-[14px] mt-1 space-y-0.5 border-l border-[#23415e] py-0.5 pl-2">
                        {item.children.map((child) => {
                          const childActive = isActive(child.path);

                          return (
                            <button
                              type="button"
                              key={child.path}
                              onClick={() => handleNavigation(child.path)}
                              className={`flex min-h-[27px] w-full items-center gap-2 rounded px-2 py-1 text-left transition-colors ${
                                childActive
                                  ? "bg-[#0b3157] text-[#67c5ff]"
                                  : "text-slate-400 hover:bg-[#0b2b4b] hover:text-white"
                              }`}
                            >
                              <span className="h-1 w-1 shrink-0 rounded-full bg-current" />
                              <span className="truncate text-[10px]">
                                {child.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
