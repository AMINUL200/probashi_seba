import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../component/admin/AdminNavbar";
import AdminSidebar from "../component/admin/AdminSidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  <div className="theme-admin min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
    {/* Admin navbar, sidebar and dashboard */}
    {/* Sidebar */}
    <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      <AdminNavbar setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 p-6 overflow-auto min-h-screen lg:pl-74 ">
        <Outlet />
      </main>
    </div>
  </div>;
};

export default AdminLayout;
