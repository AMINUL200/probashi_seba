
import React from "react";

const tabs = [
  "Personal Information",
  "Documents",
  "Educational & Skills",
  "Training History",
  "Family Information",
  "Preferences",
];

const ProfileTabs = ({ activeTab, onChange }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#e7edf6] bg-white">
      <div className="flex min-w-[650px]">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={`relative flex-1 whitespace-nowrap border-r border-[#edf1f7] px-3 py-2.5 text-[10px] font-medium transition last:border-r-0 ${
              activeTab === tab
                ? "bg-[#f6f9ff] text-blue-600"
                : "text-[#30466e] hover:bg-blue-50"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
