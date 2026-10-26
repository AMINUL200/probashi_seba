
import React from "react";
import {
  FileCheck2,
  GraduationCap,
  BriefcaseBusiness,
  Wallet,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const notifications = [
  {
    text: "Your BMET application is under review",
    time: "2 hours ago",
    icon: FileCheck2,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    text: 'New training course available "Pre-Departure Orientation"',
    time: "1 day ago",
    icon: GraduationCap,
    color: "text-purple-600 bg-purple-50",
  },
  {
    text: "New job opportunity matches your profile",
    time: "2 days ago",
    icon: BriefcaseBusiness,
    color: "text-blue-600 bg-blue-50",
  },
  {
    text: "Payment of BDT 10,000 successful",
    time: "3 days ago",
    icon: Wallet,
    color: "text-orange-600 bg-orange-50",
  },
  {
    text: "You have a new message from support team",
    time: "4 days ago",
    icon: MessageSquare,
    color: "text-rose-600 bg-rose-50",
  },
];

const LatestNotifications = () => (
  <section className="rounded-lg border border-[#e4ebf5] bg-white p-2.5">
    <div className="mb-3 flex items-center justify-between gap-2">
      <h2 className="text-xs font-bold text-[#102d66]">
        Latest Notifications
      </h2>
      <Link
        to="/user/messages"
        className="flex shrink-0 items-center gap-1 text-[9px] text-blue-600"
      >
        View All <ArrowRight size={10} />
      </Link>
    </div>

    <div className="space-y-2.5">
      {notifications.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.text} className="flex items-start gap-2">
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${item.color}`}>
              <Icon size={15} />
            </div>

            <div className="min-w-0">
              <p className="text-[9px] font-medium leading-3.5 text-[#243c65]">
                {item.text}
              </p>
              <p className="mt-0.5 text-[8px] text-slate-400">
                {item.time}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default LatestNotifications;
