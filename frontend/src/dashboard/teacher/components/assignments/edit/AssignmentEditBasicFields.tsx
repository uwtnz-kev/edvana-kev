/** Renders the core assignment metadata and text fields. */
import { BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { AssignmentEditFieldProps } from "./assignmentEditTypes";

export function AssignmentEditBasicFields({ assignment, values, errors, showError, onFieldBlur, onFieldChange }: AssignmentEditFieldProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="w-full lg:col-span-2">
        <label className="mb-2 block text-sm text-[var(--text-secondary)]">Subject</label>
        <div className="h-12 w-full rounded-2xl border border-white/20 bg-white/10 px-3 inline-flex items-center gap-2">
          <span className="h-7 w-7 rounded-xl bg-blue-500/15 text-blue-700 inline-flex items-center justify-center"><BookOpen className="h-4 w-4" /></span>
          <span className="text-white text-sm font-medium truncate">{assignment.subject}</span>
        </div>
      </div>
      <div className="space-y-2 lg:col-span-2">
        <label htmlFor="assignment-edit-title" className="text-sm text-white">Title</label>
        <Input id="assignment-edit-title" value={values.title} onChange={(event) => onFieldChange("title", event.target.value)} onBlur={() => onFieldBlur("title")} placeholder="Quarter 3 Performance Task" className="bg-white/20 border-white/20 text-white placeholder:text-white/70" />
        {showError("title") ? <p className="mt-1 text-sm font-medium text-red-600">{errors.title}</p> : null}
      </div>
      <div className="space-y-2 lg:col-span-2">
        <label htmlFor="assignment-edit-instructions" className="text-sm text-white">Instructions</label>
        <Textarea id="assignment-edit-instructions" value={values.instructions} onChange={(event) => onFieldChange("instructions", event.target.value)} onBlur={() => onFieldBlur("instructions")} placeholder="Provide detailed instructions for students." className="min-h-[140px] bg-white/20 border-white/20 text-white placeholder:text-white/70" />
        {showError("instructions") ? <p className="mt-1 text-sm font-medium text-red-600">{errors.instructions}</p> : null}
      </div>
    </div>
  );
}
