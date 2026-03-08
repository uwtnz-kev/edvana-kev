// Renders the item submission details page header and back navigation.
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { useGradeSubmissionState } from "./useGradeSubmissionState";

type Props = { state: ReturnType<typeof useGradeSubmissionState> };

export function GradeSubmissionHeader({ state }: Props) {
  return (
    <header className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-5">
      <div className="flex items-center gap-4">
        <Button type="button" onClick={state.goBack} className="bg-white/10 hover:bg-white/30 hover:shadow-sm transition-all duration-200 text-white border border-white/20 rounded-2xl">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-[#3B240F]">{`${state.item?.title} Submission`}</h1>
          <p className="text-[#3B240F]/70 mt-1">{`Student: ${state.submission?.studentName} | Class: ${state.submission?.className}`}</p>
        </div>
      </div>
    </header>
  );
}
