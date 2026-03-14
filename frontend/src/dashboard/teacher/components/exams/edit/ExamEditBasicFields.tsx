// Renders the core text fields for exam editing.
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { useTeacherExamEditForm } from "./useTeacherExamEditForm";

type Props = { state: ReturnType<typeof useTeacherExamEditForm> };

export function ExamEditBasicFields({ state }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="space-y-2 lg:col-span-2">
        <label htmlFor="exam-edit-title" className="text-sm text-white">Title</label>
        <Input id="exam-edit-title" value={state.values.title} onChange={(event) => state.onFieldChange("title", event.target.value)} onBlur={() => state.onFieldBlur("title")} placeholder="Quarter 3 Written Exam" className="bg-white/20 border-white/20 text-white placeholder:text-white/70" />
        {state.showError("title") ? <p className="mt-1 text-sm font-medium text-red-600">{state.errors.title}</p> : null}
      </div>
      <div className="space-y-2 lg:col-span-2">
        <label htmlFor="exam-edit-instructions" className="text-sm text-white">Instructions</label>
        <Textarea id="exam-edit-instructions" value={state.values.instructions} onChange={(event) => state.onFieldChange("instructions", event.target.value)} onBlur={() => state.onFieldBlur("instructions")} placeholder="Provide detailed instructions for students." className="min-h-[140px] bg-white/20 border-white/20 text-white placeholder:text-white/70" />
        {state.showError("instructions") ? <p className="mt-1 text-sm font-medium text-red-600">{state.errors.instructions}</p> : null}
      </div>
    </div>
  );
}
