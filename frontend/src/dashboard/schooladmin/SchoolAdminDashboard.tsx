import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SchoolAdminNavbar } from "./layout/SchoolAdminNavbar";
import { SchoolAdminSidebar } from "./layout/SchoolAdminSidebar";

export default function SchoolAdminDashboard() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-300 to-purple-400 relative">
      {/* Mesh overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-300/20 pointer-events-none" />

      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <SchoolAdminNavbar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      </div>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <div className="sticky top-16 h-[calc(100vh-4rem)] z-40">
          <SchoolAdminSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
        </div>

        {/* Main Content */}
        <main className="flex-1 w-0 min-w-0">
          <div className="bg-white/5 backdrop-blur-sm border-l border-white/10 min-h-[calc(100vh-4rem)] px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}