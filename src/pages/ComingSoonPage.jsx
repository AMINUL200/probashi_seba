
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Construction,
  House,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";

const ComingSoonPage = () => {
  const location = useLocation();

  // Optional: customize the title based on the URL.
  const pageNames = {
    "/projects": "Our Projects",
    "/training": "Training & Skills",
    "/welfare": "Worker Welfare",
    "/resources": "Resources",
  };

  const pageTitle = pageNames[location.pathname] || "This Page";

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#f3f8fc] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-blue-900/5"
      >
        {/* Top decorative banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#07356b] via-[#0754a5] to-[#1686d9] px-6 py-10 text-center sm:px-10">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[25px] border-white/5" />
          <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-white/5" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-sm"
          >
            <Construction size={38} strokeWidth={1.6} />
          </motion.div>

          <p className="relative mt-5 text-xs font-bold uppercase tracking-[0.22em] text-blue-100">
            Probashi Seba
          </p>

          <h1 className="relative mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            We're Working on It!
          </h1>

          <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-blue-100 sm:text-base">
            We're building something useful for you. This page is currently
            under development and will be available soon.
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-8 text-center sm:px-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700">
            <Clock3 size={15} />
            Currently Under Development
          </span>

          <h2 className="mt-5 text-xl font-bold text-[#102b55]">
            {pageTitle}
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Our team is working to make this section better. Thank you for
            your patience and for being part of our journey.
          </p>

          {/* Information points */}
          <div className="mx-auto mt-6 grid max-w-md grid-cols-1 gap-3 text-left sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <ShieldCheck size={21} />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Safe & Reliable
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Designed with you in mind
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <Clock3 size={21} />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Coming Soon
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  More services are on the way
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <ArrowLeft size={17} />
              Go Back
            </button>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0866f5] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-[#0754ce]"
            >
              <House size={17} />
              Back to Home
              <ArrowRight size={16} />
            </Link>
          </div>

          <p className="mt-6 text-xs text-slate-400">
            Thank you for your patience and understanding.
          </p>
        </div>
      </motion.div>
    </main>
  );
};

export default ComingSoonPage;
