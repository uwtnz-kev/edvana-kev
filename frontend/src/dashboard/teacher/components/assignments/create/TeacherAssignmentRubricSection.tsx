// Renders the rubric textarea without taking ownership of parent form state.
import { ClipboardCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import type { AssignmentFieldProps } from "./assignmentCreateTypes";

export function TeacherAssignmentRubricSection({
  values,
  onFieldChange,
  onFieldBlur,
}: AssignmentFieldProps) {
  return (
    <div className="space-y-2">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-slate-600/15 text-slate-700">
          <ClipboardCheck className="h-4 w-4" />
        </span>
        <span className="text-sm font-medium text-[#3B240F]">Rubric (Optional)</span>
      </div>
      <Textarea id="assignment-rubric" value={values.rubric} onChange={(event) => onFieldChange("rubric", event.target.value)} onBlur={() => onFieldBlur("rubric")} placeholder="Scoring criteria and weight distribution" className="min-h-[110px] border-white/20 bg-white/20 text-[#3B240F] placeholder:text-[#3B240F]/50" />
    </div>
  );
}
