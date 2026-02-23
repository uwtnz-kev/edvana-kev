import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import "@/styles/teacherTheme.css";

interface TeacherDashboardLayoutProps {
  navbar: ReactNode;
  sidebar: ReactNode;
}

export function TeacherDashboardLayout({
  navbar,
  sidebar,
}: TeacherDashboardLayoutProps) {
  return (
    <div className="teacher-theme min-h-screen bg-gradient-to-br from-[#F8F4E1] via-[#C9B08D] to-[#3B240F]">
      <div className="sticky top-0 z-50">{navbar}</div>

      <div className="flex relative">
        <div className="sticky top-16 h-[calc(100vh-4rem)] z-40">
          {sidebar}
        </div>

        <main className="flex-1 w-0 min-w-0">
          <div className="min-h-[calc(100vh-4rem)] bg-white/20 backdrop-blur-xl border-l border-white/25 shadow-[0_12px_40px_rgba(59,36,15,0.25)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}