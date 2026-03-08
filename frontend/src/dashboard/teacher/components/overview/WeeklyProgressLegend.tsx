// Renders the weekly progress status indicator and edit toggle.
import { TrendingUp } from "lucide-react";

type Props = {
  expanded: boolean;
  label: string;
  onToggleExpanded: () => void;
};

export function WeeklyProgressLegend({ expanded, label, onToggleExpanded }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center space-x-2 text-[#1EA896]">
        <TrendingUp className="h-5 w-5" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <button type="button" className="text-white/80 hover:text-white text-sm px-3 py-1.5 rounded-lg border border-white/15 bg-white/5" onClick={onToggleExpanded}>
        {expanded ? "Hide" : "Edit"}
      </button>
    </div>
  );
}
