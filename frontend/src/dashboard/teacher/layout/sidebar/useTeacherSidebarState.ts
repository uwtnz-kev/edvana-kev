// Manages collapse, mobile, and dropdown expansion state for the teacher sidebar shell.
import { useState } from "react";
import { toggleExpandedItem } from "./sidebarHelpers";

export function useTeacherSidebarState() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  return {
    expandedItems,
    isCollapsed,
    isMobileOpen,
    closeMobile: () => setIsMobileOpen(false),
    toggleCollapsed: () => setIsCollapsed((value) => !value),
    toggleExpanded: (label: string) => setExpandedItems((items) => toggleExpandedItem(items, label)),
    toggleMobile: () => setIsMobileOpen((value) => !value),
  };
}
