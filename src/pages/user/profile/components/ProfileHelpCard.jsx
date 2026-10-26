
import React from "react";
import { Headset } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileHelpCard = () => (
  <section className="rounded-lg border border-[#e5ebf4] bg-white p-3">
    <h3 className="flex items-center gap-2 text-[11px] font-bold text-[#102d66]">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Headset size={17} />
      </span>
      Need Help?
    </h3>

    <p className="mt-2 pl-9 text-[9px] leading-[1.45] text-[#526582]">
      Facing any issue? Contact our support team for assistance.
    </p>

    <Link
      to="/user/grievances"
      className="mt-3 flex h-8 items-center justify-center gap-2 rounded-md border border-blue-500 text-[10px] font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
    >
      <Headset size={13} />
      Contact Support
    </Link>
  </section>
);

export default ProfileHelpCard;
