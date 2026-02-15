// src/layouts/DashboardLayout.tsx
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface DashboardLayoutProps {
  navbar: ReactNode;
  sidebar: ReactNode;
}

export function DashboardLayout({ navbar, sidebar }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="sticky top-0 z-50">{navbar}</div>

      <div className="flex relative">
        <div className="sticky top-16 h-[calc(100vh-4rem)] z-40">
          {sidebar}
        </div>

        <main className="flex-1 w-0 min-w-0">
          <div className="bg-white/5 backdrop-blur-sm border-l border-white/10 min-h-[calc(100vh-4rem)]">
            <Outlet /> {/* renders child routes */}
          </div>
        </main>
      </div>
    </div>
  );
}
