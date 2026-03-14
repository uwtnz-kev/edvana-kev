// Renders one teacher sidebar item, including dropdown and reset-aware link behavior.
import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import { teacherDashboardTheme } from "@/dashboard/teacher/theme/teacherDashboardTheme";
import { cn } from "@/utils/cn";
import type { TeacherSidebarItem } from "./teacherSidebarConfig";

type Props = {
  item: TeacherSidebarItem;
  isActive: boolean;
  isCollapsed: boolean;
  isExpanded: boolean;
  onToggleExpanded: (label: string) => void;
  onNavigate: (href: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
  onCloseMobile: () => void;
  pathname: string;
  unreadMessagesCount: number;
};

export function SidebarItem({
  item,
  isActive,
  isCollapsed,
  isExpanded,
  onToggleExpanded,
  onNavigate,
  onCloseMobile,
  pathname,
  unreadMessagesCount,
}: Props) {
  const Icon = item.icon;
  const showUnreadBadge = item.label === "Messages" && unreadMessagesCount > 0;
  const unreadBadgeLabel = unreadMessagesCount > 9 ? "+9" : `${unreadMessagesCount}`;
  const itemClassName = cn(
    teacherDashboardTheme.nav.item,
    isActive && teacherDashboardTheme.nav.itemActive,
    isCollapsed && "lg:justify-center lg:px-2"
  );

  if (item.hasDropdown) {
    return (
      <button onClick={() => onToggleExpanded(item.label)} className={cn(itemClassName, "w-full justify-between")}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Icon className={cn("h-5 w-5 flex-shrink-0 transition-colors duration-200 group-hover:text-[var(--accent-primary)]", isActive ? "text-[var(--accent-primary)]" : "text-[var(--sidebar-text)]")} />
            {showUnreadBadge ? (
              <span className="pointer-events-none absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent-primary)] px-1 text-[10px] font-semibold leading-none text-[#0d1117]">
                {unreadBadgeLabel}
              </span>
            ) : null}
          </div>
          {!isCollapsed ? <span className="truncate font-medium">{item.label}</span> : null}
        </div>
        {!isCollapsed ? <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isExpanded ? "rotate-180" : "", isActive ? "text-[var(--accent-primary)]" : "text-[var(--sidebar-text)]")} /> : null}
      </button>
    );
  }

  return (
    <NavLink to={item.href} onClick={(event) => onNavigate(item.href, event)} className={itemClassName}>
      <div className="relative">
        <Icon className={cn("h-5 w-5 flex-shrink-0 transition-colors duration-200 group-hover:text-[var(--accent-primary)]", isActive ? "text-[var(--accent-primary)]" : "text-[var(--sidebar-text)]")} />
        {showUnreadBadge ? (
          <span className="pointer-events-none absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent-primary)] px-1 text-[10px] font-semibold leading-none text-[#0d1117]">
            {unreadBadgeLabel}
          </span>
        ) : null}
      </div>
      {!isCollapsed ? <span className="truncate font-medium">{item.label}</span> : null}
    </NavLink>
  );
}
