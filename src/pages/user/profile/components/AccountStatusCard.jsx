
import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const AccountStatusCard = () => (
  <section className="rounded-lg border border-[#e5ebf4] bg-white p-3">
    <h3 className="flex items-center gap-2 text-[11px] font-bold text-[#102d66]">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <ShieldCheck size={16} />
      </span>
      Account Status
    </h3>

    <div className="mt-2 rounded-md bg-[#eaf9ef] p-3">
      <p className="flex items-center gap-2 text-[11px] font-bold text-[#087c4a]">
        <CheckCircle2 size={17} fill="currentColor" className="text-emerald-600" />
        <span className="text-[#087c4a]">Verified Worker</span>
      </p>
      <p className="mt-2 text-[10px] leading-4 text-[#45677a]">
        Your profile has been verified by the authorities.
      </p>
    </div>
  </section>
);

export default AccountStatusCard;
