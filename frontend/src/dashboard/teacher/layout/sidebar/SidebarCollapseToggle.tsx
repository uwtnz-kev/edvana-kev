// Renders the desktop collapse toggle in expanded and collapsed sidebar states.
import { Menu } from "lucide-react";
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
      className={`hidden h-8 w-8 rounded-lg p-0 text-[#6B4F3A] hover:bg-white/20 hover:text-[#3B240F] lg:flex ${isCollapsed ? "mx-auto" : ""}`}
    >
      <Menu className="h-4 w-4" />
    </Button>
  );
}
