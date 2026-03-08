// Provides route and expansion helpers used by the teacher sidebar renderers.
import type { TeacherSidebarItem } from "./teacherSidebarConfig";

// Treats dropdown parents as active when any child route matches exactly.
export function isSidebarItemActive(pathname: string, item: TeacherSidebarItem) {
  return pathname === item.href || Boolean(item.subItems?.some((subItem) => pathname === subItem.href));
}

// Re-clicking certain teacher sections should reset their internal selection state.
export function shouldResetSidebarRoute(pathname: string, href: string, resetRoutes: Set<string>) {
  return resetRoutes.has(href) && pathname.startsWith(href);
}

export function isSidebarItemExpanded(expandedItems: string[], label: string) {
  return expandedItems.includes(label);
}

// Keeps the expansion list immutable so state updates remain predictable.
export function toggleExpandedItem(expandedItems: string[], label: string) {
  return expandedItems.includes(label)
    ? expandedItems.filter((item) => item !== label)
    : [...expandedItems, label];
}
