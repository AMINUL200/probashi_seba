import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/landing/LandingPage";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import SiteSettings from "./pages/admin/settings/SiteSettings";
import AdminProfile from "./pages/admin/profile/AdminProfile";
import UserLayout from "./layout/UserLayout";
import ComingSoonPage from "./pages/ComingSoonPage";
import UserDashboard from "./pages/user/dashboard/UserDashboard";
import UserProfile from "./pages/user/profile/UserProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<AppLayout />}>
          <Route index path="/" element={<LandingPage />} />
        </Route>



        {/* User Layout */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="job-opportunities" element={<h1>Job Opportunities</h1>} />
          <Route path="applications" element={<h1>My Applications</h1>} />
          <Route path="training" element={<h1>Training & Certificates</h1>} />
          <Route path="clearance" element={<h1>Clearance (BMET)</h1>} />
          <Route path="payments" element={<h1>Payments</h1>} />
          <Route path="grievances" element={<h1>Grievances & Support</h1>} />
          {/* Additional user routes can be added here */}
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* <Route index element={<h1>Admin Dashboard</h1>} /> */}
          {/* Additional admin routes can be added here */}
          <Route path="site-settings" element={<SiteSettings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>



        <Route path="*" element={<ComingSoonPage />} />
      </Routes>
    </Router>
  );
};

export default App;
