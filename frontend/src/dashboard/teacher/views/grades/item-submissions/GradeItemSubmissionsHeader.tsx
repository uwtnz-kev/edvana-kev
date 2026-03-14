// Renders the item submissions page header and back navigation.
import { AlertCircle, ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toTypeLabel } from "./gradeItemSubmissionsHelpers";
import type { useGradeItemSubmissionsState } from "./useGradeItemSubmissionsState";

type Props = { state: ReturnType<typeof useGradeItemSubmissionsState> };

export function GradeItemSubmissionsHeader({ state }: Props) {
  return (
    <>
      <header className="teacher-panel-surface rounded-2xl px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button type="button" onClick={state.backToWorkspace} className="bg-white/10 hover:bg-white/30 hover:shadow-sm transition-all duration-200 text-white border border-white/20 rounded-2xl"><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl p-3 ${state.subjectTheme.bgClass}`}><BookOpen className={`h-6 w-6 ${state.subjectTheme.iconClass}`} /></div>
            <div><h1 className="text-2xl font-semibold text-[var(--text-primary)]">{state.item?.title}</h1><p className="text-[var(--text-secondary)] mt-1">{`${toTypeLabel(state.type!)} Submissions | Subject: ${state.subjectName} | Class: ${state.item?.className}`}</p></div>
          </div>
        </div>
      </header>
      <section className="grid gap-4 sm:grid-cols-2">
        <article className="group rounded-2xl teacher-panel-surface p-4 transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-lg"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl p-3 text-emerald-300 transition-transform duration-200 group-hover:scale-105 bg-emerald-500/15"><CheckCircle2 className="h-5 w-5" /></div><div><p className="text-xs text-white/60">Submitted</p><p className="mt-1 text-lg font-semibold text-white">{state.submittedCount}</p></div></div></article>
        <article className="group rounded-2xl teacher-panel-surface p-4 transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-lg"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl p-3 text-amber-300 transition-transform duration-200 group-hover:scale-105 bg-amber-500/15"><AlertCircle className="h-5 w-5" /></div><div><p className="text-xs text-white/60">Not Submitted</p><p className="mt-1 text-lg font-semibold text-white">{state.notSubmittedCount}</p></div></div></article>
      </section>
    </>
  );
}


