
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  X,
  ChevronDown,
  ChevronRight,
  Home,
  BriefcaseBusiness,
  GraduationCap,
  HeartHandshake,
  Info,
  Newspaper,
  Mail,
  Globe,
  UserRound,
  UserPlus,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  ClipboardCheck,
  BookOpen,
} from "lucide-react";

const SideBar = ({ toggleMenu, isOpen }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // Replace these with your real authentication context.
  const isAuthenticated = false;
  const userData = null;

  const sidebarLinks = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: Home,
    },
    {
      id: "services",
      label: "Services",
      path: "/services",
      icon: BriefcaseBusiness,
      dropdown: [
        {
          id: "worker-registration",
          label: "Worker Registration",
          path: "/register",
        },
        {
          id: "verified-jobs",
          label: "Job Opportunities",
          path: "/job-opportunities",
        },
        {
          id: "right-to-work",
          label: "Right to Work",
          path: "/right-to-work",
        },
      ],
    },
    {
      id: "jobs",
      label: "Job Opportunities",
      path: "/job-opportunities",
      icon: ClipboardCheck,
    },
    {
      id: "training",
      label: "Training",
      path: "/training",
      icon: GraduationCap,
      dropdown: [
        {
          id: "skills-training",
          label: "Skills Training",
          path: "/training/skills",
        },
        {
          id: "certificates",
          label: "Certificates",
          path: "/training/certificates",
        },
      ],
    },
    {
      id: "welfare",
      label: "Welfare",
      path: "/welfare",
      icon: HeartHandshake,
    },
    {
      id: "about",
      label: "About Us",
      path: "/about",
      icon: Info,
    },
    {
      id: "news",
      label: "News & Updates",
      path: "/news",
      icon: Newspaper,
    },
    {
      id: "resources",
      label: "Resources",
      icon: BookOpen,
      dropdown: [
        {
          id: "worker-guidelines",
          label: "Worker Guidelines",
          path: "/worker-guidelines",
        },
        {
          id: "faq",
          label: "Frequently Asked Questions",
          path: "/faq",
        },
      ],
    },
    {
      id: "contact",
      label: "Contact",
      path: "/contact",
      icon: Mail,
    },
  ];

  const isActivePath = (path) => {
    if (!path) return false;

    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const isDropdownActive = (item) => {
    if (item.path && isActivePath(item.path)) return true;

    return (
      item.dropdown?.some((child) => isDropdownActive(child)) ?? false
    );
  };

  useEffect(() => {
    const nextOpenDropdowns = {};

    sidebarLinks.forEach((item) => {
      if (item.dropdown && isDropdownActive(item)) {
        nextOpenDropdowns[item.id] = true;
      }
    });

    setOpenDropdowns((previous) => ({
      ...previous,
      ...nextOpenDropdowns,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        toggleMenu?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, toggleMenu]);

  const handleNavigation = (path) => {
    if (!path) return;

    navigate(path);
    setOpenDropdowns({});
    toggleMenu?.();
  };

  const toggleDropdown = (id) => {
    setOpenDropdowns((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  const handleLogout = () => {
    // Run your real logout/auth-context method here.
    navigate("/");
    toggleMenu?.();
  };

  const renderDropdownItem = (item, level = 1) => {
    const hasDropdown = Boolean(item.dropdown?.length);
    const isOpen = Boolean(openDropdowns[item.id]);
    const active = isDropdownActive(item);
    const Icon = item.icon;

    return (
      <div key={item.id}>
        {hasDropdown ? (
          <button
            type="button"
            onClick={() => toggleDropdown(item.id)}
            aria-expanded={isOpen}
            className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
              level > 1 ? "pl-6" : ""
            } ${
              active
                ? "bg-blue-50 font-semibold text-[#0866f5]"
                : "text-slate-600 hover:bg-slate-50 hover:text-[#0866f5]"
            }`}
          >
            <span className="flex min-w-0 items-center gap-2.5">
              {Icon && <Icon size={17} className="shrink-0" />}
              <span>{item.label}</span>
            </span>

            <ChevronDown
              size={15}
              className={`shrink-0 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleNavigation(item.path)}
            className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition ${
              level > 1 ? "pl-6" : ""
            } ${
              isActivePath(item.path)
                ? "bg-blue-50 font-semibold text-[#0866f5]"
                : "text-slate-600 hover:bg-slate-50 hover:text-[#0866f5]"
            }`}
          >
            {Icon && <Icon size={17} className="shrink-0" />}
            <span>{item.label}</span>
          </button>
        )}

        {hasDropdown && (
          <div
            className={`grid transition-all duration-200 ${
              isOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="ml-5 mt-1 space-y-1 border-l border-blue-100 pl-2">
                {item.dropdown.map((child) =>
                  renderDropdownItem(child, level + 1)
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={isOpen ? 0 : -1}
        onClick={() => toggleMenu?.()}
        className={`fixed inset-0 z-[60] bg-[#071b3b]/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      {/* SIDEBAR */}
      <aside
        aria-label="Mobile navigation sidebar"
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-[min(340px,88vw)] flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* BRAND HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
          <Link
            to="/"
            onClick={() => toggleMenu?.()}
            className="flex min-w-0 items-center gap-2.5"
          >
            <img
              src="/image/logo.png"
              alt="Probashi Seba logo"
              className="h-11 w-11 shrink-0 object-contain"
            />

            <div className="min-w-0">
              <h2 className="text-lg font-extrabold leading-tight text-[#0b2862]">
                Probashi Seba
              </h2>

              <p className="mt-1 text-[9px] leading-3 text-slate-500">
                National Overseas Employment
                <br />
                and Migrant Welfare Platform
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => toggleMenu?.()}
            aria-label="Close menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-blue-50 hover:text-[#0866f5]"
          >
            <X size={19} />
          </button>
        </div>

        {/* WELCOME PANEL */}
        <div className="mx-4 mt-4 shrink-0 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-4">
          <div className="flex items-center gap-2 text-[#0866f5]">
            <ShieldCheck size={19} />

            <span className="text-sm font-bold text-[#0b2862]">
              Welcome to Probashi Seba
            </span>
          </div>

          <p className="mt-1.5 text-xs leading-5 text-slate-600">
            Your gateway to verified overseas employment and worker support.
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Main Menu
          </p>

          <div className="space-y-1">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const hasDropdown = Boolean(item.dropdown?.length);
              const active = isDropdownActive(item);
              const expanded = Boolean(openDropdowns[item.id]);

              if (hasDropdown) {
                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.id)}
                      aria-expanded={expanded}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm transition ${
                        active
                          ? "bg-blue-50 font-semibold text-[#0866f5]"
                          : "text-slate-700 hover:bg-slate-50 hover:text-[#0866f5]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={19} />
                        {item.label}
                      </span>

                      <ChevronRight
                        size={17}
                        className={`transition-transform duration-200 ${
                          expanded ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-200 ${
                        expanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="ml-6 mt-1 space-y-1 border-l border-blue-100 pl-2">
                          {item.dropdown.map((child) =>
                            renderDropdownItem(child)
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigation(item.path)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${
                    isActivePath(item.path)
                      ? "bg-[#0866f5] font-semibold text-white shadow-sm"
                      : "text-slate-700 hover:bg-blue-50 hover:text-[#0866f5]"
                  }`}
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* AUTHENTICATION FOOTER */}
        <div className="shrink-0 border-t border-slate-200 bg-white p-4">
          {!isAuthenticated ? (
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleNavigation("/login")}
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#0866f5] bg-white text-sm font-semibold text-[#0866f5] transition hover:bg-blue-50"
              >
                <UserRound size={17} />
                Login
              </button>

              <button
                type="button"
                onClick={() => handleNavigation("/register")}
                className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0866f5] text-sm font-semibold text-white transition hover:bg-[#0052cc]"
              >
                <UserPlus size={17} />
                Register
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleNavigation("/dashboard")}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0866f5] text-sm font-semibold text-white hover:bg-[#0052cc]"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-red-200 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          )}

          <p className="mt-3 text-center text-[10px] text-slate-400">
            Probashi Seba · National Overseas Employment
          </p>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
