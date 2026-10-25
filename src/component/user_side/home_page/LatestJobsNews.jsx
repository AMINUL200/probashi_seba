
import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  MapPin,
  CalendarDays,
  BriefcaseBusiness,
} from "lucide-react";

const LatestJobsNews = () => {
  const shouldReduceMotion = useReducedMotion();

  const jobs = [
    {
      id: 1,
      title: "Construction Worker",
      company: "Al-Binladin Group",
      location: "Saudi Arabia",
      category: "Construction",
      type: "Full Time",
      salary: "SAR 1,200",
      salaryBDT: "≈ BDT 28,800",
    //   image: "/image/jobs/construction-worker.jpg",
      image: "/image/jobs/construction-worker.jpeg",
      path: "/job-opportunities/construction-worker",
    },
    {
      id: 2,
      title: "Housekeeping Staff",
      company: "Al Noor Hotel",
      location: "United Arab Emirates",
      category: "Hospitality",
      type: "Full Time",
      salary: "AED 1,200",
      salaryBDT: "≈ BDT 36,000",
      image: "/image/jobs/housekeeping-staff.jpeg",
      path: "/job-opportunities/housekeeping-staff",
    },
    {
      id: 3,
      title: "Electrician",
      company: "Qatar Facilities Co.",
      location: "Qatar",
      category: "Technical",
      type: "Full Time",
      salary: "QAR 1,800",
      salaryBDT: "≈ BDT 41,400",
      image: "/image/jobs/electrician.jpeg",
      path: "/job-opportunities/electrician",
    },
  ];

  const news = [
    {
      id: 1,
      title: "New Training Center Inaugurated in Dhaka",
      date: "15 Oct 2026",
      description:
        "A new government-approved training center has been inaugurated to enhance workers' skills.",
      image: "/image/news/training-center.jpeg",
      path: "/news/new-training-center-dhaka",
    },
    {
      id: 2,
      title: "Simplified BMET Clearance Process",
      date: "10 Oct 2026",
      description:
        "New digital process reduces clearance time and improves transparency.",
      image: "/image/news/bmet-clearance.jpeg",
      path: "/news/simplified-bmet-clearance",
    },
    {
      id: 3,
      title: "Awareness Program for Overseas Workers",
      date: "05 Oct 2026",
      description:
        "Government launches nationwide awareness campaign on safe migration.",
      image: "/image/news/awareness-program.jpeg",
      path: "/news/overseas-worker-awareness",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: "easeOut",
      },
    },
  };

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="bg-[#f2f8fd] px-3 py-5 sm:px-5 sm:py-7 lg:px-8">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 items-stretch gap-3 lg:grid-cols-[1.5fr_1fr] lg:gap-4">

        {/* =====================================
            LEFT: LATEST JOB OPPORTUNITIES
        ====================================== */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="min-w-0 rounded-xl border border-[#edf2f8] bg-white p-3.5 sm:p-4"
        >
          {/* Heading */}
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-lg font-extrabold leading-tight tracking-tight text-[#0b2862] sm:text-xl">
              Latest Job Opportunities
            </h2>

            <Link
              to="/job-opportunities"
              className="group inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-[#0866f5] transition-colors hover:text-[#06469a] sm:text-xs"
            >
              <span className="hidden sm:inline">View All Jobs</span>
              <span className="sm:hidden">View All</span>
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Job cards */}
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-2.5"
          >
            {jobs.map((job) => (
              <motion.article
                key={job.id}
                variants={itemVariants}
                whileHover={
                  shouldReduceMotion ? undefined : { y: -4 }
                }
                className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-[#e6edf6] bg-white transition-shadow duration-200 hover:border-blue-200 hover:shadow-[0_7px_20px_rgba(20,66,115,0.09)]"
              >
                {/* Job image */}
                <Link
                  to={job.path}
                  aria-label={`View ${job.title} job`}
                  className="block h-[115px] overflow-hidden bg-[#edf5fc] sm:h-[105px] lg:h-[92px] xl:h-[105px]"
                >
                  <img
                    src={job.image}
                    alt={job.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>

                {/* Job details */}
                <div className="flex flex-1 flex-col p-2 sm:p-2.5">
                  <Link to={job.path}>
                    <h3 className="text-xs font-extrabold leading-[1.35] text-[#0b2862] hover:text-[#0866f5]">
                      {job.title}
                    </h3>
                  </Link>

                  <p className="mt-1 text-[11px] leading-4 text-[#526789]">
                    {job.company}
                  </p>

                  <p className="mt-0.5 flex items-start gap-1 text-[10px] leading-4 text-[#405879]">
                    <MapPin
                      size={12}
                      className="mt-0.5 shrink-0 text-[#254c80]"
                    />
                    <span>{job.location}</span>
                  </p>

                  {/* Tags */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-[#e4f0ff] px-2 py-1 text-[9px] font-medium text-[#0866f5]">
                      {job.category}
                    </span>

                    <span className="rounded-full bg-[#e4f0ff] px-2 py-1 text-[9px] font-medium text-[#0866f5]">
                      {job.type}
                    </span>
                  </div>

                  {/* Salary */}
                  <div className="mt-2">
                    <p className="text-xs font-extrabold text-[#0b2862] sm:text-sm">
                      {job.salary}
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#526789]">
                      ({job.salaryBDT})
                    </p>
                  </div>

                  {/* Apply button */}
                  <Link
                    to={job.path}
                    className="mt-auto mt-2.5 inline-flex min-h-8 w-full items-center justify-center rounded-md bg-[#0866f5] px-2 py-1.5 text-[11px] font-semibold text-white transition-colors duration-200 hover:bg-[#06469a]"
                  >
                    Apply Now
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>

        {/* =====================================
            RIGHT: NEWS & UPDATES
        ====================================== */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="min-w-0 rounded-xl border border-[#edf2f8] bg-white p-3.5 sm:p-4"
        >
          {/* Heading */}
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-lg font-extrabold leading-tight tracking-tight text-[#0b2862] sm:text-xl">
              News &amp; Updates
            </h2>

            <Link
              to="/news"
              className="group inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-[#0866f5] transition-colors hover:text-[#06469a] sm:text-xs"
            >
              <span className="hidden sm:inline">View All News</span>
              <span className="sm:hidden">View All</span>
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* News list */}
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="divide-y divide-[#edf2f8]"
          >
            {news.map((item) => (
              <motion.article
                key={item.id}
                variants={itemVariants}
                className="flex gap-3 py-2.5 first:pt-0 last:pb-0 sm:gap-3.5"
              >
                {/* Thumbnail */}
                <Link
                  to={item.path}
                  aria-label={`Read ${item.title}`}
                  className="h-[72px] w-[105px] shrink-0 overflow-hidden rounded-lg bg-[#edf5fc] sm:h-[76px] sm:w-[112px]"
                >
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>

                {/* News content */}
                <div className="min-w-0 flex-1">
                  <Link to={item.path}>
                    <h3 className="text-[11px] font-extrabold leading-[1.4] text-[#0b2862] transition-colors hover:text-[#0866f5] sm:text-xs">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="mt-1 flex items-center gap-1 text-[10px] text-[#71829d]">
                    <CalendarDays size={11} />
                    {item.date}
                  </p>

                  <p className="mt-1 line-clamp-3 text-[10px] leading-[1.5] text-[#526789] sm:text-[11px]">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestJobsNews;
