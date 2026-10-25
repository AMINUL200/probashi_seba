
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Globe,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const Navbar = ({ toggleMenu }) => {
  const location = useLocation();

  const [language, setLanguage] = useState("English");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Job Opportunities", path: "/job-opportunities" },
    { label: "Training", path: "/training" },
    { label: "Welfare", path: "/welfare" },
    { label: "About", path: "/about" },
    { label: "News", path: "/news" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full border-b border-slate-200 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="mx-auto flex min-h-[68px] w-full max-w-[1800px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">

        {/* LOGO AND BRAND */}
        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center gap-2.5"
          aria-label="Probashi Seba Home"
        >
          <img
            src="/image/logo.png"
            alt="Probashi Seba logo"
            className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
          />

          <div className="min-w-0">
            <h1 className="whitespace-nowrap text-lg font-extrabold leading-tight tracking-tight text-[#0b2862] sm:text-xl lg:text-[22px]">
              Probashi Seba
            </h1>

            <p className="hidden whitespace-nowrap text-[10px] leading-4 text-[#263e63] sm:block lg:text-[11px]">
              National Overseas Employment and Migrant Welfare Platform
            </p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-3 xl:gap-5 lg:flex"
        >
          {navLinks.map((item) => {
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={active ? "page" : undefined}
                className={`relative whitespace-nowrap py-2 text-[11px] font-medium transition-colors duration-200 xl:text-xs ${
                  active
                    ? "text-[#0866f5]"
                    : "text-[#344461] hover:text-[#0866f5]"
                }`}
              >
                {item.label}

                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-[#0866f5] transition-all duration-200 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">

          {/* LANGUAGE SELECTOR */}
          <div className="relative flex items-center gap-1">
            <Globe
              size={20}
              strokeWidth={1.8}
              className="shrink-0 text-[#102c5e]"
            />

            <select
              aria-label="Select language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="max-w-[76px] cursor-pointer appearance-none bg-transparent py-2 pr-4 text-[11px] font-medium text-[#102c5e] outline-none"
            >
              <option value="English">English</option>
              <option value="বাংলা">বাংলা</option>
              <option value="العربية">العربية</option>
            </select>

            <ChevronDown
              size={12}
              className="pointer-events-none absolute right-0 text-[#102c5e]"
            />
          </div>

          {/* LOGIN */}
          <Link
            to="/login"
            className={`inline-flex h-[36px] items-center justify-center rounded-md border border-[#0866f5] px-3 text-xs font-semibold transition duration-200 hover:bg-[#0866f5] hover:text-white ${
              isActive("/login")
                ? "bg-[#0866f5] text-white"
                : "bg-white text-[#0866f5]"
            }`}
          >
            Login
          </Link>

          {/* REGISTER */}
          <Link
            to="/register"
            className="inline-flex h-[36px] items-center justify-center rounded-md border border-[#0866f5] bg-[#0866f5] px-3.5 text-xs font-semibold text-white shadow-sm transition duration-200 hover:border-[#0052cc] hover:bg-[#0052cc]"
          >
            Register
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen((previous) => !previous);
            if (toggleMenu) toggleMenu();
          }}
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenuOpen}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#102c5e] transition hover:bg-blue-50 lg:hidden"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white shadow-lg lg:hidden">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex max-w-[1800px] flex-col px-4 py-3 sm:px-6"
          >
            {navLinks.map((item) => {
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-blue-50 text-[#0866f5]"
                      : "text-[#344461] hover:bg-slate-50 hover:text-[#0866f5]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* MOBILE LANGUAGE */}
            <div className="mt-2 flex items-center gap-2 border-t border-slate-100 px-3 pt-3">
              <Globe size={19} className="text-[#102c5e]" />

              <select
                aria-label="Select language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="flex-1 bg-transparent py-2 text-sm text-[#102c5e] outline-none"
              >
                <option value="English">English</option>
                <option value="বাংলা">বাংলা</option>
                <option value="العربية">العربية</option>
              </select>
            </div>

            {/* MOBILE AUTH BUTTONS */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                to="/login"
                className="flex h-10 items-center justify-center rounded-md border border-[#0866f5] bg-white text-sm font-semibold text-[#0866f5] transition hover:bg-blue-50"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="flex h-10 items-center justify-center rounded-md bg-[#0866f5] text-sm font-semibold text-white transition hover:bg-[#0052cc]"
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
