// Composes the teacher sidebar shell from extracted config, renderers, and state helpers.
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ensureMessagesSeeded, getUnreadMessagesCount, subscribeMessagesChanged } from "@/dashboard/teacher/components/messages/messagesStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { SidebarCollapseToggle } from "./sidebar/SidebarCollapseToggle";
import { SidebarSection } from "./sidebar/SidebarSection";
import { shouldResetSidebarRoute } from "./sidebar/sidebarHelpers";
import { teacherSidebarItems, teacherSidebarResetRoutes } from "./sidebar/teacherSidebarConfig";
import { useTeacherSidebarState } from "./sidebar/useTeacherSidebarState";

export default function TeacherSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebar = useTeacherSidebarState();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    ensureMessagesSeeded();
    const syncUnreadCount = () => setUnreadCount(getUnreadMessagesCount());
    syncUnreadCount();
    return subscribeMessagesChanged(syncUnreadCount);
  }, []);

  const handleNavigate = (href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldResetSidebarRoute(location.pathname, href, teacherSidebarResetRoutes)) {
      event.preventDefault();
      navigate(href, { state: { resetToHome: true } });
    }
    sidebar.closeMobile();
  };

  return (
    <>
      <Button variant="ghost" size="sm" onClick={sidebar.toggleMobile} className="fixed top-20 left-4 z-[100] rounded-lg border border-white/30 bg-white/25 text-[#3B240F] shadow-[0_10px_30px_rgba(59,36,15,0.25)] hover:border-white/45 hover:bg-white/35 lg:hidden">
        {sidebar.isMobileOpen ? <X className="h-5 w-5 text-[#3B240F]" /> : <Menu className="h-5 w-5 text-[#3B240F]" />}
      </Button>

      {sidebar.isMobileOpen ? <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden" onClick={sidebar.closeMobile} /> : null}

      <aside className={cn("fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] overflow-hidden rounded-r-xl border-r border-white/25 bg-white/18 shadow-[0_18px_50px_rgba(59,36,15,0.25)] backdrop-blur-xl transition-all duration-300 lg:static lg:top-0 lg:h-full lg:rounded-none", sidebar.isCollapsed ? "lg:w-16" : "lg:w-64", sidebar.isMobileOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0")}>
        <div className="flex h-full max-h-screen flex-col overflow-y-auto">
          <div className="border-b border-white/25 p-4">
            {!sidebar.isCollapsed ? <div className="flex items-center justify-between"><h2 className="text-lg font-semibold text-[#3B240F]">My Dashboard</h2><SidebarCollapseToggle isCollapsed={sidebar.isCollapsed} onToggle={sidebar.toggleCollapsed} /></div> : <SidebarCollapseToggle isCollapsed={sidebar.isCollapsed} onToggle={sidebar.toggleCollapsed} />}
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto p-4">
            <SidebarSection
              items={teacherSidebarItems}
              expandedItems={sidebar.expandedItems}
              isCollapsed={sidebar.isCollapsed}
              onToggleExpanded={sidebar.toggleExpanded}
              onNavigate={handleNavigate}
              onCloseMobile={sidebar.closeMobile}
              pathname={location.pathname}
              unreadMessagesCount={unreadCount}
            />
          </nav>

          <div className="border-t border-white/25 p-4">
            {!sidebar.isCollapsed ? (
              <div className="space-y-1 text-center">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7A5A3A] to-[#3B240F] shadow-[0_10px_25px_rgba(59,36,15,0.25)]"><span className="text-xs font-bold text-[#F8F4E1]">E</span></div>
                <p className="text-xs font-medium text-[#6B4F3A]">Edvana Dashboard</p>
                <p className="text-xs text-[#6B4F3A]">v1.0.0</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7A5A3A] to-[#3B240F] shadow-[0_10px_25px_rgba(59,36,15,0.25)]"><span className="text-xs font-bold text-[#F8F4E1]">E</span></div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
