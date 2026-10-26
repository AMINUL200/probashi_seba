
import React from "react";
import { Headset } from "lucide-react";
import { Link } from "react-router-dom";

const HelpSupportCard = () => (
  <section className="rounded-lg border border-[#e4ebf5] bg-white p-3">
    <div className="flex items-start gap-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Headset size={18} />
      </div>

      <div>
        <h2 className="text-[11px] font-bold text-[#102d66]">
          Need Help?
        </h2>
        <p className="mt-1 text-[9px] leading-4 text-slate-500">
          Facing any issue? Contact our support team for assistance.
        </p>
      </div>
    </div>

    <Link
      to="/user/grievances"
      className="mt-3 flex h-8 items-center justify-center gap-2 rounded-md border border-blue-500 text-[10px] font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
    >
      <Headset size={14} />
      Contact Support
    </Link>
  </section>
);

export default HelpSupportCard;
