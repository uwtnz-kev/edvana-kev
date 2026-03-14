// Renders the grade submissions page header and back navigation.
import { ArrowLeft, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toSubmissionTitle } from "./gradeSubmissionsHelpers";
import type { useGradeSubmissionsState } from "./useGradeSubmissionsState";

type Props = { state: ReturnType<typeof useGradeSubmissionsState> };

export function GradeSubmissionsHeader({ state }: Props) {
  return (
    <header className="teacher-panel-surface rounded-2xl px-6 py-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button type="button" onClick={state.backToWorkspace} className="bg-white/10 hover:bg-white/30 hover:shadow-sm transition-all duration-200 text-white border border-white/20 rounded-2xl">
            <ArrowLeft className="h-4 w-4 mr-2" />Back
          </Button>
          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${state.theme.bgClass}`}><ClipboardCheck className={`h-6 w-6 ${state.theme.iconClass}`} /></div>
          <div><h1 className="text-2xl font-semibold text-[var(--text-primary)]">{toSubmissionTitle(state.selectedGradeType)}</h1><p className="text-[var(--text-secondary)] mt-1">{`Subject: ${state.selectedSubject?.name ?? "Not selected"}`}</p></div>
        </div>
      </div>
    </header>
  );
}


