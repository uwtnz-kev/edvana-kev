// Header for the grade submission details page.
import { ArrowLeft, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toDetailsTitle } from "./gradeSubmissionDetailsHelpers";
import type { useGradeSubmissionDetailsState } from "./useGradeSubmissionDetailsState";

type Props = { state: ReturnType<typeof useGradeSubmissionDetailsState> };

export function GradeSubmissionDetailsHeader({ state }: Props) {
  if (!state.submission) return null;

  return (
    <header className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button type="button" onClick={state.backToSubmissions} className="bg-white/10 hover:bg-white/30 hover:shadow-sm transition-all duration-200 text-white border border-white/20 rounded-2xl">
            <ArrowLeft className="h-4 w-4 mr-2" />Back
          </Button>
          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${state.theme.bgClass}`}><ClipboardCheck className={`h-6 w-6 ${state.theme.iconClass}`} /></div>
          <div><h1 className="text-2xl font-semibold text-[#3B240F]">{toDetailsTitle(state.submission.type)}</h1><p className="text-[#3B240F]/70 mt-1">{state.submission.assessmentTitle || state.submission.title}</p></div>
        </div>
      </div>
    </header>
  );
}
