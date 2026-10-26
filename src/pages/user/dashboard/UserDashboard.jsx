
import React from "react";
import WelcomeBanner from "./components/WelcomeBanner";
import DashboardStatCards from "./components/DashboardStatCards";
import UserJourney from "./components/UserJourney";
import RecommendedJobs from "./components/RecommendedJobs";
import LatestNotifications from "./components/LatestNotifications";
import UserProfileCard from "./components/UserProfileCard";
import QuickActions from "./components/QuickActions";
import HelpSupportCard from "./components/HelpSupportCard";

const UserDashboard = () => {
  return (
    <div className="mx-auto w-full max-w-[1800px] space-y-2">
      <WelcomeBanner />

      <div className="grid grid-cols-1 gap-2 2xl:grid-cols-[minmax(0,1fr)_155px]">
        {/* Main dashboard content */}
        <div className="min-w-0 space-y-2">
          <DashboardStatCards />

          <UserJourney />

          <div className="grid grid-cols-1 gap-2 xl:grid-cols-[minmax(0,1.65fr)_minmax(220px,0.85fr)]">
            <RecommendedJobs />
            <LatestNotifications />
          </div>
        </div>

        {/* Right sidebar cards */}
        <aside className="flex min-w-0 flex-col gap-2 sm:grid sm:grid-cols-2 2xl:flex 2xl:grid-cols-1">
          <UserProfileCard />
          <QuickActions />
          <HelpSupportCard />
        </aside>
      </div>
    </div>
  );
};

export default UserDashboard;
