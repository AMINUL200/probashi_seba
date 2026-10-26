
import React from "react";

import DashboardStatCards from "./components/DashboardStatCards";
import GeographicDrilldown from "./components/GeographicDrilldown";
import FraudHeatmap from "./components/FraudHeatmap";
import RemittanceAnalytics from "./components/RemittanceAnalytics";
import DashboardSummaryCards from "./components/DashboardSummaryCards";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen w-full space-y-2 bg-[#031329] text-white">
      {/* Top KPI cards */}
      <DashboardStatCards />

      {/* Geographic map + fraud + remittance */}
      <div className="grid grid-cols-1 items-stretch gap-2 2xl:grid-cols-[1.08fr_1fr]">
        {/* Left: Geographic drilldown */}
        <div className="min-w-0">
          <GeographicDrilldown />
        </div>

        {/* Right: Analytics panels */}
        <div className="flex min-w-0 flex-col gap-2">
          <FraudHeatmap />
          <RemittanceAnalytics />
        </div>
      </div>

      {/* Bottom summary panels */}
      <DashboardSummaryCards />
    </div>
  );
};

export default AdminDashboard;
