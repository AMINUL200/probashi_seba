
import React from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const UserProfileCard = () => (
  <section className="rounded-lg border border-[#e4ebf5] bg-white p-3">
    <div className="flex items-center justify-between gap-2">
      <img
        src="/image/profile.png"
        alt="MD. Rahim Uddin"
        className="h-12 w-12 rounded-full border border-slate-100 bg-slate-50 object-cover"
      />

      <div className="rounded bg-white p-1">
        <img
          src="/image/worker-qr.png"
          alt="Worker digital ID QR code"
          className="h-12 w-12 object-contain"
        />
      </div>
    </div>

    <h3 className="mt-2 text-[10px] font-bold text-[#173363]">
      MD. RAHIM UDDIN
    </h3>
    <p className="mt-1 text-[8px] text-slate-500">
      Worker ID: WKR-2024-001234
    </p>

    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-semibold text-emerald-700">
      <CheckCircle2 size={10} />
      Verified Worker
    </span>

    <Link
      to="/user/profile"
      className="mt-2 flex items-center justify-end gap-1 text-[8px] font-medium text-blue-600"
    >
      View Digital ID <ExternalLink size={10} />
    </Link>
  </section>
);

export default UserProfileCard;
