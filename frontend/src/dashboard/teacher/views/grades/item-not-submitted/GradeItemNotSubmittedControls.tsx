// Renders the not-submitted tab switcher and search input.
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SegmentedTabs } from "@/dashboard/teacher/components/shared";
import type { useGradeItemNotSubmittedState } from "./useGradeItemNotSubmittedState";

type Props = { state: ReturnType<typeof useGradeItemNotSubmittedState> };

export function GradeItemNotSubmittedControls({ state }: Props) {
  return (
    <>
      <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-4">
        <SegmentedTabs
          value="not-submitted"
          options={[
            { value: "submitted", label: "Submitted" },
            { value: "not-submitted", label: "Not Submitted" },
          ]}
          onChange={(value) => {
            // Only the alternate tab navigates away from this view.
            if (value === "not-submitted") return;
            state.openSubmitted();
          }}
        />
      </div>
      <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
            <Input
              value={state.search}
              onChange={(event) => state.setSearch(event.target.value)}
              placeholder="Search student name"
              className="h-11 w-full rounded-2xl bg-white/10 border-white/10 backdrop-blur-xl pl-11 pr-4 text-white placeholder:text-white/60"
            />
          </div>
        </div>
      </div>
    </>
  );
}
