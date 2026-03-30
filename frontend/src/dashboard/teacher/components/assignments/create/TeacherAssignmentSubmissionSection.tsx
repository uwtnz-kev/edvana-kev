// Handles the question preview and question-builder launch actions for assignments.
import { ClipboardList, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { AssignmentFieldProps } from "./assignmentCreateTypes";

type Props = AssignmentFieldProps & {
  requiresQuestionBuilder: boolean;
  onOpenPreview: () => void;
  onOpenQuestionBuilder: () => void;
};

export function TeacherAssignmentSubmissionSection({
  values,
  errors,
  touched,
  onFieldBlur,
  requiresQuestionBuilder,
  onOpenPreview,
  onOpenQuestionBuilder,
}: Props) {
  if (!requiresQuestionBuilder) {
    return (
      <div className="rounded-2xl border border-dashed border-white/20 bg-white/10 px-4 py-5 text-sm text-white/75">
        Question builder is only available when Submission Method includes Quiz Form.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-2">
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="assignment-questions-text" className="text-sm text-white">Questions</label>
          <Button type="button" onClick={onOpenPreview} className="rounded-xl border border-white/20 bg-white/20 px-3 py-1 text-xs text-white hover:bg-white/30"><span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-sky-300"><Eye className="h-4 w-4" /></span>Preview</Button>
        </div>
        <Textarea id="assignment-questions-text" value={values.questionsText} readOnly onBlur={() => onFieldBlur("questionsText")} placeholder="Use Input Questions to add questions" className="min-h-[140px] cursor-not-allowed border-white/15 bg-white/10 text-white placeholder:text-white/70" />
        {touched.questionsText && errors.questionsText ? <p className="mt-1 text-sm font-medium text-red-600">{errors.questionsText}</p> : null}
      </div>

      <div>
        <Button type="button" onClick={onOpenQuestionBuilder} className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30">
          <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-indigo-400/30 bg-indigo-500/15 text-indigo-300">
            <ClipboardList className="h-4 w-4" />
          </span>
          Input Questions
        </Button>
      </div>
    </div>
  );
}


