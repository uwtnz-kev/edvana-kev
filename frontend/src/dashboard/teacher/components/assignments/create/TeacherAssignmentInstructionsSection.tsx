// Renders the moved instructions field below the assignment settings grid.
import { Textarea } from "@/components/ui/textarea";
import type { AssignmentFieldProps } from "./assignmentCreateTypes";

export function TeacherAssignmentInstructionsSection({
  values,
  errors,
  touched,
  onFieldChange,
  onFieldBlur,
}: AssignmentFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="assignment-instructions" className="text-sm text-white">Instructions</label>
      <Textarea id="assignment-instructions" value={values.instructions} onChange={(event) => onFieldChange("instructions", event.target.value)} onBlur={() => onFieldBlur("instructions")} placeholder="Provide detailed instructions for students." className="min-h-[140px] border-white/20 bg-white/20 text-white placeholder:text-white/70" />
      {touched.instructions && errors.instructions ? <p className="mt-1 text-sm font-medium text-red-600">{errors.instructions}</p> : null}
    </div>
  );
}
