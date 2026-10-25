import React, { useState } from "react";
import Navbar from "../component/common/Navbar";
import SideBar from "../component/common/SideBar";
import Footer from "../component/common/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div className="theme-user min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      {/* Navbar, sidebar and page content */}
      <Navbar toggleMenu={toggleSidebar} />
      {/* <SideBar toggleMenu={toggleSidebar} isOpen={sidebarOpen} /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
