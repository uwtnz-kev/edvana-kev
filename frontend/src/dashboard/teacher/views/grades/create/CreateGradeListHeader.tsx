// Renders the create grade list page header and back navigation.
import { ArrowLeft, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { useGradeListState } from "./useGradeListState";

type Props = { state: ReturnType<typeof useGradeListState> };

export function CreateGradeListHeader({ state }: Props) {
  return (
    <header className="teacher-panel-surface rounded-2xl px-6 py-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button type="button" onClick={state.backToGrades} className="bg-white/10 hover:bg-white/30 hover:shadow-sm transition-all duration-200 text-white border border-white/20 rounded-2xl"><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${state.iconTheme.bgClass}`}><BarChart3 className={`h-6 w-6 ${state.iconTheme.iconClass}`} /></div>
          <div><h1 className="text-2xl font-semibold text-[var(--text-primary)]">{state.headerTitle}</h1><p className="text-[var(--text-secondary)] mt-1">{`Subject: ${state.selectedSubject?.name}`}</p></div>
        </div>
      </div>
    </header>
  );
}


