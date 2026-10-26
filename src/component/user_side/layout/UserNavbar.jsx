
import React, { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  Globe,
  ChevronDown,
  X,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const UserNavbar = ({ toggleMenu }) => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  const navigate = useNavigate();

  const languages = ["English", "বাংলা", "हिन्दी"];

  const handleLogout = () => {
    // Connect your authentication logout logic here.
    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-[60] h-14 border-b border-[#e5ebf4] bg-white shadow-[0_1px_5px_rgba(15,35,75,0.05)]">
      <div className="flex h-full items-center gap-2 px-3 sm:px-4 lg:px-5">
        {/* Mobile Sidebar Button */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#173667] hover:bg-blue-50 md:hidden"
        >
          <Menu size={21} />
        </button>

        {/* Brand */}
        <Link
          to="/user/dashboard"
          className="flex w-[180px] shrink-0 items-center gap-2 sm:w-[230px]"
        >
          <img
            src="/image/logo.png"
            alt="Probashi Seba"
            className="h-9 w-9 shrink-0 rounded-full object-contain"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />

          <div className="min-w-0">
            <h1 className="truncate text-[14px] font-extrabold leading-4 tracking-tight text-[#102d66] sm:text-[16px]">
              Probashi Seba
            </h1>
            <p className="hidden truncate text-[8px] leading-3 text-[#64748b] sm:block">
              National Overseas Employment and Migrant Welfare Platform
            </p>
          </div>
        </Link>

        {/* Search */}
        <div className="hidden min-w-0 max-w-[360px] flex-1 md:block">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const query = new FormData(event.currentTarget)
                .get("search")
                ?.toString()
                .trim();

              if (query) {
                navigate(
                  `/user/job-opportunities?search=${encodeURIComponent(query)}`
                );
              }
            }}
            className="flex h-9 items-center gap-2 rounded-md border border-[#dce5f1] bg-[#fbfcff] px-3 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100"
          >
            <Search size={15} className="shrink-0 text-[#7b8ba7]" />
            <input
              name="search"
              type="search"
              placeholder="Search jobs, training, documents..."
              className="w-full min-w-0 bg-transparent text-[10px] text-[#18345f] outline-none placeholder:text-[#94a3b8]"
            />
          </form>
        </div>

        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
          {/* Notifications */}
          <button
            type="button"
            onClick={() => navigate("/user/messages")}
            aria-label="Notifications"
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#193b70] hover:bg-blue-50"
          >
            <Bell size={19} />
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
              3
            </span>
          </button>

          <div className="hidden h-7 w-px bg-[#e5eaf2] sm:block" />

          {/* Language */}
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => {
                setLanguageOpen((prev) => !prev);
                setProfileOpen(false);
              }}
              className="flex h-9 items-center gap-1.5 rounded-md px-2 text-[10px] font-medium text-[#243d68] hover:bg-blue-50"
            >
              <Globe size={16} />
              <span>{language}</span>
              <ChevronDown size={13} />
            </button>

            {languageOpen && (
              <div className="absolute right-0 top-11 z-[80] w-36 overflow-hidden rounded-lg border border-[#e1e8f2] bg-white p-1 shadow-xl">
                {languages.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => {
                      setLanguage(item);
                      setLanguageOpen(false);
                    }}
                    className={`w-full rounded-md px-3 py-2 text-left text-xs hover:bg-blue-50 ${
                      language === item
                        ? "bg-blue-50 font-semibold text-blue-700"
                        : "text-slate-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden h-7 w-px bg-[#e5eaf2] sm:block" />

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileOpen((prev) => !prev);
                setLanguageOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg px-1.5 py-1 text-left hover:bg-blue-50"
            >
              <img
                src="/image/profile.png"
                alt="User profile"
                className="h-8 w-8 rounded-full border border-[#dce7f5] bg-[#e8f1ff] object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="hidden min-w-0 lg:block">
                <p className="max-w-[145px] truncate text-[10px] font-bold uppercase text-[#142c58]">
                  MD. RAHIM UDDIN
                </p>
                <p className="text-[9px] text-[#71809b]">
                  Worker ID: WKR-2024-001234
                </p>
              </div>

              <ChevronDown
                size={14}
                className="hidden text-[#334d76] sm:block"
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-12 z-[80] w-52 rounded-xl border border-[#e2e9f3] bg-white p-2 shadow-xl">
                <div className="border-b border-slate-100 px-3 py-2">
                  <p className="text-xs font-bold text-[#173667]">
                    MD. RAHIM UDDIN
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    Worker ID: WKR-2024-001234
                  </p>
                </div>

                <Link
                  to="/user/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-slate-700 hover:bg-blue-50"
                >
                  <UserRound size={15} />
                  My Profile
                </Link>

                <Link
                  to="/user/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-slate-700 hover:bg-blue-50"
                >
                  <Settings size={15} />
                  Settings
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-red-600 hover:bg-red-50"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close open dropdowns when clicking outside */}
      {(languageOpen || profileOpen) && (
        <button
          type="button"
          aria-label="Close dropdowns"
          onClick={() => {
            setLanguageOpen(false);
            setProfileOpen(false);
          }}
          className="fixed inset-0 z-[55] cursor-default"
        />
      )}
    </header>
  );
};

export default UserNavbar;
