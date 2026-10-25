
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../component/admin/AdminNavbar";
import AdminSidebar from "../component/admin/AdminSidebar";

const NAVBAR_HEIGHT = 81;
const SIDEBAR_WIDTH = 250;

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="theme-admin min-h-screen bg-[#031329] text-white"
      style={{
        "--admin-navbar-height": `${NAVBAR_HEIGHT}px`,
        "--admin-sidebar-width": `${SIDEBAR_WIDTH}px`,
      }}
    >
      {/* Full-width navbar at the top */}
      <div className="sticky top-0 z-50 w-full">
        <AdminNavbar setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Sidebar and dashboard start below navbar */}
      <div className="relative min-h-[calc(100vh-81px)]">
        <AdminSidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <main className="min-h-[calc(100vh-81px)] min-w-0 p-3 sm:p-4 lg:ml-[250px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
