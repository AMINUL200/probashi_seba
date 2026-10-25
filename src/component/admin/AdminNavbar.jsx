
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  Settings,
  ChevronDown,
  UserCircle,
  LogOut,
  CalendarDays,
  Check,
} from "lucide-react";

const AdminNavbar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [dateRange, setDateRange] = useState("Last 30 Days");

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const dateRef = useRef(null);

  // Replace these sample values with authenticated admin information.
  const userData = {
    name: "Admin · MOEWOE",
    role: "Super Admin",
    avatar: "/image/profile.png",
  };

  const notifications = [
    {
      id: 1,
      title: "New registration",
      message: "A new worker registration requires attention.",
      time: "5 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "System notification",
      message: "Your platform is running normally.",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Platform update",
      message: "Review the latest platform activity.",
      time: "Yesterday",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((item) => item.unread).length;

  const dateOptions = [
    "Today",
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "This Year",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setShowDateMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuToggle = (menu) => {
    setShowProfileMenu(menu === "profile" ? (prev) => !prev : false);
    setShowNotifications(
      menu === "notifications" ? (prev) => !prev : false
    );
    setShowDateMenu(menu === "date" ? (prev) => !prev : false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(false);
    navigate("/admin/profile");
  };

  const handleSettingsClick = () => {
    setShowProfileMenu(false);
    navigate("/admin/site-settings");
  };

  const handleLogout = () => {
    setShowProfileMenu(false);

    // Connect your real authentication logout logic here.
    navigate("/login");
  };

  const updatedDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="relative z-50 w-full border-b border-[#15385c] bg-[#031a35] text-white shadow-lg">
      {/* Main navbar: 62px */}
      <div className="flex h-[62px] w-full items-center justify-between gap-2 px-3 sm:px-5 lg:px-6">
        {/* Left section */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          {/* Mobile sidebar toggle */}
          <button
            type="button"
            onClick={() => setSidebarOpen?.((previous) => !previous)}
            aria-label="Toggle sidebar"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-200 transition hover:bg-white/10 lg:hidden"
          >
            <Menu size={19} />
          </button>

          {/* Logo and brand */}
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="flex min-w-0 shrink-0 items-center gap-2.5 text-left sm:gap-3"
          >
            <img
              src="/image/logo.png"
              alt="Probashi Seba logo"
              className="h-10 w-10 shrink-0 rounded-full border border-emerald-400 bg-white object-contain p-0.5 sm:h-11 sm:w-11"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            <div className="min-w-0">
              <h1 className="whitespace-nowrap text-[15px] font-extrabold leading-5 tracking-tight sm:text-[17px]">
                Probashi Seba
              </h1>

              <p className="hidden whitespace-nowrap text-[9px] leading-3 text-slate-300 md:block">
                National Overseas Employment and Migrant Welfare Platform
              </p>
            </div>
          </button>

          {/* Live monitoring badge */}
          <div className="ml-1 hidden items-center gap-1.5 rounded-md border border-emerald-400/20 bg-emerald-500/15 px-2.5 py-1.5 xl:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

            <span className="whitespace-nowrap text-[9px] font-bold uppercase tracking-wide text-emerald-300">
              Real-Time Monitoring · Live
            </span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-3">
          {/* Date range */}
          <div className="relative hidden sm:block" ref={dateRef}>
            <button
              type="button"
              onClick={() => handleMenuToggle("date")}
              className="flex h-[27px] items-center gap-2 rounded-md border border-[#234367] bg-[#092543] px-2 text-[9px] text-slate-200 transition hover:border-blue-400 hover:bg-[#103254]"
            >
              {dateRange}
              <ChevronDown size={12} />
            </button>

            {showDateMenu && (
              <div className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-lg border border-[#234367] bg-[#09213d] py-1 shadow-xl">
                {dateOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => {
                      setDateRange(option);
                      setShowDateMenu(false);
                    }}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-xs text-slate-200 hover:bg-white/10"
                  >
                    {option}
                    {dateRange === option && (
                      <Check size={13} className="text-emerald-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              type="button"
              onClick={() => handleMenuToggle("notifications")}
              aria-label="Notifications"
              className="relative flex h-8 w-8 items-center justify-center rounded-md text-slate-200 transition hover:bg-white/10"
            >
              <Bell size={18} strokeWidth={1.8} />

              {unreadCount > 0 && (
                <span className="absolute right-0 top-0 flex h-[14px] min-w-[14px] items-center justify-center rounded-full border border-[#031a35] bg-red-500 px-1 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-[min(320px,calc(100vw-20px))] overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-800 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <div>
                    <h3 className="text-sm font-bold">Notifications</h3>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {unreadCount} unread notifications
                    </p>
                  </div>
                  <Bell size={18} className="text-blue-600" />
                </div>

                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`border-b border-slate-100 px-4 py-3 ${
                        item.unread ? "bg-blue-50/60" : ""
                      }`}
                    >
                      <div className="flex gap-2.5">
                        <span
                          className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                            item.unread ? "bg-blue-500" : "bg-slate-300"
                          }`}
                        />
                        <div>
                          <p className="text-xs font-semibold">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {item.message}
                          </p>
                          <p className="mt-1 text-[10px] text-slate-400">
                            {item.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button
            type="button"
            onClick={handleSettingsClick}
            aria-label="Admin settings"
            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            <Settings size={18} strokeWidth={1.8} />
          </button>

          {/* Profile */}
          <div
            className="relative ml-1 border-l border-[#24405e] pl-2 sm:pl-3"
            ref={profileRef}
          >
            <button
              type="button"
              onClick={() => handleMenuToggle("profile")}
              className="flex items-center gap-2 rounded-md px-1 py-1 transition hover:bg-white/10 sm:gap-2"
            >
              <img
                src={userData.avatar}
                alt="Admin profile"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
                className="h-8 w-8 shrink-0 rounded-full border border-slate-300 bg-slate-700 object-cover"
              />

              <div className="hidden text-left sm:block">
                <p className="max-w-[115px] truncate text-[9px] font-bold leading-4 text-white">
                  {userData.name}
                </p>
                <p className="text-[9px] leading-3 text-slate-300">
                  {userData.role}
                </p>
              </div>

              <ChevronDown
                size={12}
                className={`hidden text-slate-300 transition-transform sm:block ${
                  showProfileMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-800 shadow-2xl">
                <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="text-sm font-bold">{userData.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {userData.role}
                  </p>
                </div>

                <div className="p-1.5">
                  <button
                    type="button"
                    onClick={handleProfileClick}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs hover:bg-slate-100"
                  >
                    <UserCircle size={16} className="text-slate-500" />
                    My Profile
                  </button>

                  <button
                    type="button"
                    onClick={handleSettingsClick}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs hover:bg-slate-100"
                  >
                    <Settings size={16} className="text-slate-500" />
                    Settings
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate("/admin");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs hover:bg-slate-100"
                  >
                    <CalendarDays size={16} className="text-slate-500" />
                    Admin Dashboard
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live status strip: 19px */}
      <div className="flex h-[19px] items-center justify-end gap-1.5 border-t border-white/5 bg-[#04162c] px-3 sm:px-6">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="text-[9px] font-medium text-emerald-300">
          LIVE
        </span>
        <span className="text-[9px] text-slate-400">
          · Updated {updatedDate}
        </span>
      </div>
    </header>
  );
};

export default AdminNavbar;
