import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { teacherDashboardTheme } from "@/dashboard/teacher/theme/teacherDashboardTheme";
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
    <div className={teacherDashboardTheme.layout.page}>
      <div className={teacherDashboardTheme.layout.shell}>
        <div className="shrink-0">{navbar}</div>

        <div className="relative flex flex-1 min-h-0 overflow-hidden">
          <div className="z-40 h-full shrink-0">
            {sidebar}
          </div>

          <main className={teacherDashboardTheme.layout.contentSurface}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
