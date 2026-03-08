// Renders one teacher sidebar item, including dropdown and reset-aware link behavior.
import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
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
    "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-[#6B4F3A] transition-all duration-200 hover:bg-white/22 hover:text-[#3B240F]",
    isActive && "border border-white/35 bg-white/28 font-medium text-[#3B240F] shadow-[0_14px_35px_rgba(59,36,15,0.18)]",
    isCollapsed && "lg:justify-center lg:px-2"
  );

  if (item.hasDropdown) {
    return (
      <button onClick={() => onToggleExpanded(item.label)} className={cn(itemClassName, "w-full justify-between")}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Icon className={cn("h-5 w-5 flex-shrink-0 transition-colors duration-200 group-hover:text-[#7A5A3A]", isActive ? "text-[#7A5A3A]" : "text-[#6B4F3A]")} />
            {showUnreadBadge ? (
              <span className="pointer-events-none absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF715B] px-1 text-[10px] font-semibold leading-none text-white">
                {unreadBadgeLabel}
              </span>
            ) : null}
          </div>
          {!isCollapsed ? <span className="truncate font-medium">{item.label}</span> : null}
        </div>
        {!isCollapsed ? <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isExpanded ? "rotate-180" : "", isActive ? "text-[#7A5A3A]" : "text-[#6B4F3A]")} /> : null}
      </button>
    );
  }

  return (
    <NavLink to={item.href} onClick={(event) => onNavigate(item.href, event)} className={itemClassName}>
      <div className="relative">
        <Icon className={cn("h-5 w-5 flex-shrink-0 transition-colors duration-200 group-hover:text-[#7A5A3A]", isActive ? "text-[#7A5A3A]" : "text-[#6B4F3A]")} />
        {showUnreadBadge ? (
          <span className="pointer-events-none absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF715B] px-1 text-[10px] font-semibold leading-none text-white">
            {unreadBadgeLabel}
          </span>
        ) : null}
      </div>
      {!isCollapsed ? <span className="truncate font-medium">{item.label}</span> : null}
    </NavLink>
  );
}
