// Renders tab and search filters for item-level submissions.
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SegmentedTabs } from "@/dashboard/teacher/components/shared";
import type { useGradeItemSubmissionsState } from "./useGradeItemSubmissionsState";

type Props = { state: ReturnType<typeof useGradeItemSubmissionsState> };

export function GradeItemSubmissionsFilters({ state }: Props) {
  return (
    <>
      <div className="teacher-panel-surface rounded-2xl p-4"><SegmentedTabs value={state.activeTab} options={[{ value: "submitted", label: "Submitted" }, { value: "not-submitted", label: "Not Submitted" }]} onChange={(value) => state.setActiveTab(value as "submitted" | "not-submitted")} /></div>
      <div className="teacher-panel-surface rounded-2xl p-4"><div className="relative w-full sm:w-72"><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" /><Input value={state.search} onChange={(event) => state.setSearch(event.target.value)} placeholder="Search student name" className="h-11 w-full rounded-2xl bg-white/10 border-white/10 backdrop-blur-xl pl-11 pr-4 text-white placeholder:text-[var(--text-muted)]" /></div></div>
    </>
  );
}


