// Renders the submitted list page header and back navigation.
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toTypeLabel } from "./gradeItemSubmittedHelpers";
import type { useGradeItemSubmittedState } from "./useGradeItemSubmittedState";

type Props = {
  state: ReturnType<typeof useGradeItemSubmittedState>;
};

export function GradeItemSubmittedHeader({ state }: Props) {
  return (
    <header className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-5">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          onClick={state.backToWorkspace}
          className="bg-white/10 hover:bg-white/30 hover:shadow-sm transition-all duration-200 text-white border border-white/20 rounded-2xl"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-[#3B240F]">{state.item?.title}</h1>
          <p className="text-[#3B240F]/70 mt-1">{`${toTypeLabel(state.type!)} Submissions | Subject: ${state.subjectName} | Class: ${state.item?.className}`}</p>
        </div>
      </div>
    </header>
  );
}
