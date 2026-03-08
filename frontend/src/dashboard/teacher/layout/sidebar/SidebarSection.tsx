// Maps the teacher sidebar config into top-level items and nested dropdown links.
import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";
import { SidebarItem } from "./SidebarItem";
import { isSidebarItemActive, isSidebarItemExpanded } from "./sidebarHelpers";
import type { TeacherSidebarItem } from "./teacherSidebarConfig";

type Props = {
  items: TeacherSidebarItem[];
  expandedItems: string[];
  isCollapsed: boolean;
  onToggleExpanded: (label: string) => void;
  onNavigate: (href: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
  onCloseMobile: () => void;
  pathname: string;
  unreadMessagesCount: number;
};

export function SidebarSection({
  items,
  expandedItems,
  isCollapsed,
  onToggleExpanded,
  onNavigate,
  onCloseMobile,
  pathname,
  unreadMessagesCount,
}: Props) {
  return (
    <>
      {items.map((item) => {
        const isActive = isSidebarItemActive(pathname, item);
        const isExpanded = isSidebarItemExpanded(expandedItems, item.label);
        return (
          <div key={item.href || item.label}>
            <SidebarItem
              item={item}
              isActive={isActive}
              isCollapsed={isCollapsed}
              isExpanded={isExpanded}
              onToggleExpanded={onToggleExpanded}
              onNavigate={onNavigate}
              onCloseMobile={onCloseMobile}
              pathname={pathname}
              unreadMessagesCount={item.label === "Messages" ? unreadMessagesCount : 0}
            />
            {item.hasDropdown && item.subItems && isExpanded && !isCollapsed ? (
              <div className="ml-4 mt-2 space-y-1">
                {item.subItems.map((subItem) => {
                  const SubIcon = subItem.icon;
                  const isSubActive = pathname === subItem.href;
                  return (
                    <NavLink
                      key={subItem.href}
                      to={subItem.href}
                      onClick={onCloseMobile}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-[#6B4F3A] transition-all duration-200 hover:bg-white/22 hover:text-[#3B240F]",
                        isSubActive && "border border-white/35 bg-white/30 font-medium text-[#3B240F] shadow-[0_12px_28px_rgba(59,36,15,0.16)]"
                      )}
                    >
                      <SubIcon className={cn("h-4 w-4 flex-shrink-0 transition-colors duration-200 group-hover:text-[#7A5A3A]", isSubActive ? "text-[#7A5A3A]" : "text-[#6B4F3A]")} />
                      <span className="truncate font-medium">{subItem.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
}
