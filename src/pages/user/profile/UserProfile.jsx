
import React, { useState } from "react";
import { Pencil, FileText, GraduationCap, UsersRound, Settings } from "lucide-react";

import ProfileTabs from "./components/ProfileTabs";
import ProfileIdentityCard from "./components/ProfileIdentityCard";
import PersonalInformation from "./components/PersonalInformation";
import AccountStatusCard from "./components/AccountStatusCard";
import ProfileCompletionCard from "./components/ProfileCompletionCard";
import ProfileQuickActions from "./components/ProfileQuickActions";
import ProfileHelpCard from "./components/ProfileHelpCard";

const initialProfile = {
  fullName: "MD. Rahim Uddin",
  fullNameBangla: "মোঃ রহিম উদ্দিন",
  workerId: "WKR-2024-001234",
  mobile: "+880 1712 345678",
  email: "rahimuddin@email.com",
  dateOfBirth: "15 Mar 1995",
  gender: "Male",
  nid: "1234567890123",
  district: "Cumilla",
  presentAddress:
    "Village: South Char, Upazila: Chandina, District: Cumilla",
  permanentAddress:
    "Village: South Char, Upazila: Chandina, District: Cumilla",
  photo: "/image/profile.png",
};

const tabContent = {
  Documents: {
    icon: FileText,
    title: "My Documents",
    description:
      "Manage your identity documents, passport, and other required records.",
    items: [
      ["National ID Card", "Verified"],
      ["Passport", "Uploaded"],
      ["Work Permit", "Pending"],
    ],
  },
  "Educational & Skills": {
    icon: GraduationCap,
    title: "Educational & Skills",
    description:
      "Manage your educational qualifications, technical skills, and experience.",
    items: [
      ["Educational Qualification", "Completed"],
      ["Technical Skills", "Completed"],
      ["Work Experience", "Add details"],
    ],
  },
  "Training History": {
    icon: GraduationCap,
    title: "Training History",
    description:
      "Review your training courses, completion status, and certificates.",
    items: [
      ["Pre-Departure Orientation", "Completed"],
      ["Technical Training", "Completed"],
      ["Safety Training", "In Progress"],
    ],
  },
  "Family Information": {
    icon: UsersRound,
    title: "Family Information",
    description:
      "Manage your family details and authorized family access.",
    items: [
      ["Family Members", "View details"],
      ["Emergency Contact", "Add details"],
      ["Family Access", "Manage access"],
    ],
  },
  Preferences: {
    icon: Settings,
    title: "Preferences",
    description:
      "Manage your communication preferences and account settings.",
    items: [
      ["Email Notifications", "Enabled"],
      ["SMS Notifications", "Enabled"],
      ["Language", "English"],
    ],
  },
};

const ProfileTabContent = ({ tab }) => {
  const content = tabContent[tab];
  const Icon = content.icon;

  return (
    <section className="min-h-[280px] rounded-lg border border-[#e5ebf4] bg-white p-4 sm:p-5">
      <div className="flex items-start gap-3 border-b border-[#edf1f7] pb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon size={20} />
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#102d66]">
            {content.title}
          </h2>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">
            {content.description}
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {content.items.map(([label, status]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-3 rounded-md border border-[#edf1f7] p-3"
          >
            <span className="text-[11px] font-medium text-[#30466e]">
              {label}
            </span>
            <span className="rounded-md bg-blue-50 px-2 py-1 text-[9px] font-medium text-blue-700">
              {status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("Personal Information");
  const [profile, setProfile] = useState(initialProfile);

  const handleSaveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    // Connect your PUT/PATCH profile API here.
  };

  return (
    <div className="mx-auto w-full max-w-[1800px] space-y-2 pb-3">
      {/* Page heading */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-[#102d66]">
            My Profile
          </h1>
          <p className="mt-0.5 text-[11px] text-[#526582]">
            View and manage your personal information, documents and preferences.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab("Personal Information")}
          className="flex h-8 items-center gap-1.5 rounded-md bg-blue-600 px-3 text-[10px] font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Pencil size={12} />
          Edit Profile
        </button>
      </div>

      {/* Profile tabs */}
      <ProfileTabs
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Main profile section */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-[180px_minmax(0,1fr)]">
        <ProfileIdentityCard profile={profile} />

        <div className="min-w-0">
          {activeTab === "Personal Information" ? (
            <PersonalInformation
              profile={profile}
              onSave={handleSaveProfile}
            />
          ) : (
            <ProfileTabContent tab={activeTab} />
          )}
        </div>
      </div>

      {/* Bottom summary cards */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <AccountStatusCard />
        <ProfileCompletionCard />
        <ProfileQuickActions />
        <ProfileHelpCard />
      </div>
    </div>
  );
};

export default UserProfile;
