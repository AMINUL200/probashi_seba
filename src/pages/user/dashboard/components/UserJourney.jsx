
import React from "react";
import {
  CheckCircle2,
  GraduationCap,
  BriefcaseBusiness,
  ClipboardCheck,
  ShieldCheck,
  Plane,
  Heart,
  House,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  { title: "1. Register", status: "Completed", icon: CheckCircle2 },
  { title: "2. Training", status: "In Progress", icon: GraduationCap },
  { title: "3. Apply for Jobs", status: "Not Started", icon: BriefcaseBusiness },
  { title: "4. Contract", status: "Not Started", icon: ClipboardCheck },
  { title: "5. BMET Clearance", status: "In Progress", icon: ShieldCheck },
  { title: "6. Departure", status: "Pending", icon: Plane },
  { title: "7. Overseas Support", status: "Pending", icon: Heart },
  { title: "8. Return & Reintegrate", status: "Pending", icon: House },
];

const UserJourney = () => (
  <section className="rounded-lg border border-[#e4ebf5] bg-white p-3">
    <div className="mb-4 flex items-center justify-between gap-2">
      <h2 className="text-sm font-bold text-[#102d66]">My Journey</h2>
      <Link
        to="/user/journey"
        className="flex items-center gap-1 text-[9px] font-medium text-blue-600"
      >
        View Full Journey <ArrowRight size={11} />
      </Link>
    </div>

    <div className="overflow-x-auto pb-1">
      <div className="relative grid min-w-[610px] grid-cols-8 gap-1">
        <div className="absolute left-[6%] right-[6%] top-4 h-px bg-[#c6d8f3]" />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const completed = index === 0;
          const active = index === 1 || index === 4;

          return (
            <div
              key={step.title}
              className="relative z-10 flex min-w-0 flex-col items-center text-center"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                  completed
                    ? "border-emerald-200 bg-emerald-100 text-emerald-600"
                    : active
                      ? "border-blue-200 bg-blue-600 text-white"
                      : "border-[#cfdbed] bg-[#f6f9ff] text-[#48638b]"
                }`}
              >
                <Icon size={15} />
              </div>

              <p className="mt-2 text-[8px] font-semibold leading-3 text-[#213b68]">
                {step.title}
              </p>
              <p
                className={`mt-0.5 text-[8px] ${
                  completed
                    ? "text-emerald-600"
                    : active
                      ? "text-blue-600"
                      : "text-slate-400"
                }`}
              >
                {step.status}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default UserJourney;
