
import React from "react";
import { ArrowRight, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const jobs = [
  {
    title: "Construction Worker",
    company: "Al-Binladin Group",
    country: "Saudi Arabia",
    type: "Construction",
    schedule: "Full Time",
    salary: "SAR 1,200",
    localSalary: "BDT 28,800",
    image: "/image/jobs/construction-worker.jpeg",
  },
  {
    title: "Housekeeping Staff",
    company: "Al Noor Hotel",
    country: "United Arab Emirates",
    type: "Hospitality",
    schedule: "Full Time",
    salary: "AED 1,200",
    localSalary: "BDT 36,000",
    image: "/image/jobs/housekeeping-staff.jpeg",
  },
  {
    title: "Electrician",
    company: "Qatar Facilities Co.",
    country: "Qatar",
    type: "Technical",
    schedule: "Full Time",
    salary: "QAR 1,800",
    localSalary: "BDT 41,400",
    image: "/image/jobs/electrician.jpeg",
  },
];

const RecommendedJobs = () => (
  <section className="min-w-0 rounded-lg border border-[#e4ebf5] bg-white p-2.5">
    <div className="mb-2 flex items-center justify-between gap-2">
      <h2 className="text-xs font-bold text-[#102d66]">
        Recommended Job Opportunities
      </h2>
      <Link
        to="/user/job-opportunities"
        className="flex shrink-0 items-center gap-1 text-[9px] font-medium text-blue-600"
      >
        View All <ArrowRight size={10} />
      </Link>
    </div>

    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {jobs.map((job) => (
        <article
          key={job.title}
          className="overflow-hidden rounded-md border border-[#e8edf5] bg-white"
        >
          <div className="relative h-[85px] bg-gradient-to-br from-blue-100 to-slate-200">
            <img
              src={job.image}
              alt={job.title}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <button
              type="button"
              aria-label={`Save ${job.title}`}
              className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm"
            >
              <Heart size={13} className="text-rose-500" />
            </button>
          </div>

          <div className="p-2">
            <h3 className="truncate text-[10px] font-bold text-[#173363]">
              {job.title}
            </h3>
            <p className="mt-0.5 truncate text-[9px] text-slate-500">
              {job.company}
            </p>

            <p className="mt-1 flex items-center gap-1 text-[8px] text-slate-500">
              <MapPin size={10} /> {job.country}
            </p>

            <div className="mt-1.5 flex flex-wrap gap-1">
              {[job.type, job.schedule].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#e9f1ff] px-2 py-0.5 text-[8px] text-[#2254a2]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-2 text-[9px] font-semibold text-[#29446d]">
              Salary: {job.salary}
            </p>
            <p className="text-[8px] text-slate-500">
              (≈ {job.localSalary})
            </p>

            <Link
              to="/user/job-opportunities"
              className="mt-2 flex h-7 items-center justify-center rounded bg-blue-600 text-[9px] font-semibold text-white hover:bg-blue-700"
            >
              Apply Now
            </Link>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default RecommendedJobs;
