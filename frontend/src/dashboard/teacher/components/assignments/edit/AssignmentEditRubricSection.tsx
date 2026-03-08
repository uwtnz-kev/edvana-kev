/** Renders the optional rubric editor for assignment scoring guidance. */
import { ClipboardCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import type { AssignmentEditFieldProps } from "./assignmentEditTypes";

export function AssignmentEditRubricSection({ values, onFieldBlur, onFieldChange }: AssignmentEditFieldProps) {
  return (
    <div className="space-y-2">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
        <span className="h-7 w-7 rounded-xl bg-slate-600/15 text-slate-700 inline-flex items-center justify-center"><ClipboardCheck className="h-4 w-4" /></span>
        <span className="text-[#3B240F] text-sm font-medium">Rubric (Optional)</span>
      </div>
      <Textarea id="assignment-edit-rubric" value={values.rubric} onChange={(event) => onFieldChange("rubric", event.target.value)} onBlur={() => onFieldBlur("rubric")} placeholder="Scoring criteria and weight distribution" className="min-h-[110px] bg-white/20 border-white/20 text-[#3B240F] placeholder:text-[#3B240F]/50" />
    </div>
  );
}
