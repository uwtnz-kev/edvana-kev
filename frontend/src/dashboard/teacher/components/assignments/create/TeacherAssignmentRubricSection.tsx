// Renders the rubric textarea without taking ownership of parent form state.
import { ClipboardCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { rubricChipStyles } from "@/dashboard/teacher/components/shared/assessment/assessmentVisualStyles";
import type { AssignmentFieldProps } from "./assignmentCreateTypes";

export function TeacherAssignmentRubricSection({
  values,
  onFieldChange,
  onFieldBlur,
}: AssignmentFieldProps) {
  return (
    <div className="space-y-2">
      <div className={rubricChipStyles.container}>
        <span className={rubricChipStyles.icon}>
          <ClipboardCheck className="h-4 w-4" />
        </span>
        <span className={rubricChipStyles.text}>Rubric (Optional)</span>
      </div>
      <Textarea id="assignment-rubric" value={values.rubric} onChange={(event) => onFieldChange("rubric", event.target.value)} onBlur={() => onFieldBlur("rubric")} placeholder="Scoring criteria and weight distribution" className="min-h-[110px] border-white/20 bg-white/20 text-white placeholder:text-white/70" />
    </div>
  );
}


