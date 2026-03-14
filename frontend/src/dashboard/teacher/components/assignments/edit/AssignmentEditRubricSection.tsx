/** Renders the optional rubric editor for assignment scoring guidance. */
import { ClipboardCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { rubricChipStyles } from "@/dashboard/teacher/components/shared/assessment/assessmentVisualStyles";
import type { AssignmentEditFieldProps } from "./assignmentEditTypes";

export function AssignmentEditRubricSection({ values, onFieldBlur, onFieldChange }: AssignmentEditFieldProps) {
  return (
    <div className="space-y-2">
      <div className={rubricChipStyles.container}>
        <span className={rubricChipStyles.icon}><ClipboardCheck className="h-4 w-4" /></span>
        <span className={rubricChipStyles.text}>Rubric (Optional)</span>
      </div>
      <Textarea id="assignment-edit-rubric" value={values.rubric} onChange={(event) => onFieldChange("rubric", event.target.value)} onBlur={() => onFieldBlur("rubric")} placeholder="Scoring criteria and weight distribution" className="min-h-[110px] bg-white/20 border-white/20 text-white placeholder:text-white/70" />
    </div>
  );
}
