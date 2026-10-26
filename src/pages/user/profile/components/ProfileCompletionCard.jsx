
import React from "react";
import { CheckCircle2, Circle, ClipboardCheck } from "lucide-react";

const checklist = [
  { label: "Personal Information", complete: true },
  { label: "Documents", complete: true },
  { label: "Educational Details", complete: true },
  { label: "Training Information", complete: false },
  { label: "Family Information", complete: false },
];

const ProfileCompletionCard = () => (
  <section className="rounded-lg border border-[#e5ebf4] bg-white p-3">
    <h3 className="flex items-center gap-2 text-[11px] font-bold text-[#102d66]">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <ClipboardCheck size={16} />
      </span>
      Profile Completion
    </h3>

    <div className="mt-3 flex items-center gap-3">
      <div
        className="relative flex h-[66px] w-[66px] shrink-0 items-center justify-center rounded-full"
        style={{
          background:
            "conic-gradient(#0865f7 0deg 288deg, #e7edf6 288deg 360deg)",
        }}
      >
        <div className="flex h-[53px] w-[53px] items-center justify-center rounded-full bg-white">
          <span className="text-sm font-extrabold text-[#102d66]">
            80%
          </span>
        </div>
      </div>

      <div className="min-w-0 flex-1 space-y-1.5">
        {checklist.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-1.5"
          >
            {item.complete ? (
              <CheckCircle2
                size={12}
                fill="#07965b"
                className="shrink-0 text-white"
              />
            ) : (
              <Circle
                size={12}
                className="shrink-0 text-slate-400"
              />
            )}

            <span className="text-[9px] leading-3 text-[#34496b]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProfileCompletionCard;
