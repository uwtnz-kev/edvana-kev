// Renders the desktop collapse toggle in expanded and collapsed sidebar states.
import { Menu } from "lucide-react";
import { teacherDashboardTheme } from "@/dashboard/teacher/theme/teacherDashboardTheme";
import { Button } from "@/components/ui/button";

type Props = {
  isCollapsed: boolean;
  onToggle: () => void;
};

export function SidebarCollapseToggle({ isCollapsed, onToggle }: Props) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className={`hidden h-8 w-8 rounded-lg border border-transparent p-0 ${teacherDashboardTheme.text.secondary} hover:bg-[var(--sidebar-item-hover)] hover:text-[var(--accent-primary)] lg:flex ${isCollapsed ? "mx-auto" : ""}`}
    >
      <Menu className="h-4 w-4" />
    </Button>
  );
}
