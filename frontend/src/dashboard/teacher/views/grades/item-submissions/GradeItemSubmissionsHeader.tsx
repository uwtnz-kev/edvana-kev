// Renders the item submissions page header and back navigation.
import { AlertCircle, ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toTypeLabel } from "./gradeItemSubmissionsHelpers";
import type { useGradeItemSubmissionsState } from "./useGradeItemSubmissionsState";

type Props = { state: ReturnType<typeof useGradeItemSubmissionsState> };

export function GradeItemSubmissionsHeader({ state }: Props) {
  return (
    <>
      <header className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button type="button" onClick={state.backToWorkspace} className="bg-white/10 hover:bg-white/30 hover:shadow-sm transition-all duration-200 text-white border border-white/20 rounded-2xl"><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${state.subjectTheme.bgClass}`}><BookOpen className={`h-6 w-6 ${state.subjectTheme.iconClass}`} /></div>
            <div><h1 className="text-2xl font-semibold text-[#3B240F]">{state.item?.title}</h1><p className="text-[#3B240F]/70 mt-1">{`${toTypeLabel(state.type!)} Submissions | Subject: ${state.subjectName} | Class: ${state.item?.className}`}</p></div>
          </div>
        </div>
      </header>
      <section className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-white/30 bg-white/20 backdrop-blur-xl p-4"><div className="flex items-center gap-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 border border-teal-500/30"><CheckCircle2 className="h-5 w-5 text-teal-100" /></div><div><p className="text-xs uppercase tracking-wide text-white/70">Submitted</p><p className="text-2xl font-semibold text-white">{state.submittedCount}</p></div></div></article>
        <article className="rounded-2xl border border-white/30 bg-white/20 backdrop-blur-xl p-4"><div className="flex items-center gap-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/30"><AlertCircle className="h-5 w-5 text-amber-100" /></div><div><p className="text-xs uppercase tracking-wide text-white/70">Not Submitted</p><p className="text-2xl font-semibold text-white">{state.notSubmittedCount}</p></div></div></article>
      </section>
    </>
  );
}
