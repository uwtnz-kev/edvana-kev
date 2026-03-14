// Composes the teacher sidebar shell from extracted config, renderers, and state helpers.
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ensureMessagesSeeded, getUnreadMessagesCount, subscribeMessagesChanged } from "@/dashboard/teacher/components/messages/messagesStore";
import { teacherDashboardTheme } from "@/dashboard/teacher/theme/teacherDashboardTheme";
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
      <Button variant="ghost" size="sm" onClick={sidebar.toggleMobile} className={cn("fixed top-20 left-4 z-[100]", teacherDashboardTheme.nav.mobileToggle, sidebar.isMobileOpen && "bg-[var(--sidebar-item-active)] text-[var(--accent-primary)]")}>
        {sidebar.isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {sidebar.isMobileOpen ? <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={sidebar.closeMobile} /> : null}

      <aside className={cn(teacherDashboardTheme.surfaces.sidebar, sidebar.isCollapsed ? "lg:w-16" : "lg:w-64", sidebar.isMobileOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0")}>
        <div className="flex h-full min-h-0 flex-col">
          <div className="shrink-0 border-b border-[var(--topbar-border)] p-4">
            {!sidebar.isCollapsed ? <div className="flex items-center justify-between"><h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">My Dashboard</h2><SidebarCollapseToggle isCollapsed={sidebar.isCollapsed} onToggle={sidebar.toggleCollapsed} /></div> : <SidebarCollapseToggle isCollapsed={sidebar.isCollapsed} onToggle={sidebar.toggleCollapsed} />}
          </div>

          <nav className="flex-1 min-h-0 space-y-2 overflow-y-auto p-4">
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

          <div className="shrink-0 border-t border-[var(--topbar-border)] p-4">
            {!sidebar.isCollapsed ? (
              <div className="space-y-1 text-center">
                <div className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full ${teacherDashboardTheme.accents.brand}`}><span className="text-xs font-bold">E</span></div>
                <p className="text-xs font-medium text-[var(--text-primary)]">Edvana Dashboard</p>
                <p className="text-xs text-[var(--text-secondary)]">v1.0.0</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${teacherDashboardTheme.accents.brand}`}><span className="text-xs font-bold">E</span></div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
