
import React from "react";
import {
  Camera,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

const ProfileIdentityCard = ({ profile }) => {
  return (
    <section className="flex flex-col items-center rounded-lg border border-[#e5ebf4] bg-white px-3 py-4 text-center">
      <div className="relative">
        <img
          src={profile.photo || "/image/profile.png"}
          alt={profile.fullName}
          className="h-[108px] w-[108px] rounded-full border-4 border-[#f0f3f8] bg-slate-100 object-cover"
        />

        <button
          type="button"
          aria-label="Change profile photo"
          onClick={() => document.getElementById("profile-photo-input")?.click()}
          className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-sm hover:bg-blue-700"
        >
          <Camera size={15} />
        </button>

        <input
          id="profile-photo-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              // Connect to your upload API or profile state.
              window.dispatchEvent(
                new CustomEvent("profile-photo-selected", {
                  detail: file,
                })
              );
            }
          }}
        />
      </div>

      <h2 className="mt-3 text-sm font-extrabold text-[#102d66]">
        {profile.fullName}
      </h2>

      <p className="mt-1 text-[10px] text-[#526687]">
        Worker ID
      </p>

      <p className="mt-0.5 text-[11px] font-bold text-[#193767]">
        {profile.workerId}
      </p>

      <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-[#e0f8e9] px-3 py-1 text-[10px] font-semibold text-[#07834b]">
        <CheckCircle2 size={12} fill="currentColor" className="text-[#07834b]" />
        <span className="text-white" />
        Verified
      </span>

      <button
        type="button"
        onClick={() => {
          // Replace with your real digital ID route or modal.
          window.dispatchEvent(new CustomEvent("open-worker-digital-id"));
        }}
        className="mt-3 flex flex-col items-center gap-1 text-[10px] font-medium text-blue-600 hover:text-blue-800"
      >
        <img
          src="/image/worker-qr.png"
          alt="Worker digital ID QR code"
          className="h-[58px] w-[58px] object-contain"
        />
        View Digital ID
      </button>
    </section>
  );
};

export default ProfileIdentityCard;
