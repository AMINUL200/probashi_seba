
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../component/user_side/layout/UserNavbar";
import UserSidebar from "../component/user_side/layout/UserSidebar";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#12264a]">
      {/* Top Navbar */}
      <UserNavbar toggleMenu={toggleSidebar} />

      <div className="relative min-h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <UserSidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        {/* Main Page */}
        <main className="min-h-[calc(100vh-56px)] min-w-0 pt-3 pb-6 md:ml-[160px] md:px-3">
          <div className="mx-auto w-full max-w-[1800px] px-2 md:px-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
