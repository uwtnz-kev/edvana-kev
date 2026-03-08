// Renders the exam edit schedule and scoring fields.
import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TeacherExamDueDatePicker } from "@/dashboard/teacher/components/exams/create/TeacherExamDueDatePicker";
import { seedClasses2 } from "@/dashboard/teacher/components/exams";
import type { useTeacherExamEditForm } from "./useTeacherExamEditForm";

type Props = { state: ReturnType<typeof useTeacherExamEditForm> };

export function ExamEditScheduleSection({ state }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Field label="Duration Minutes" id="exam-edit-duration" error={state.showError("durationMinutes") ? state.errors.durationMinutes : null}><Input id="exam-edit-duration" type="number" min={1} value={state.values.durationMinutes} onChange={(event) => state.onFieldChange("durationMinutes", event.target.value)} onBlur={() => state.onFieldBlur("durationMinutes")} placeholder="60" className="h-12 w-full rounded-2xl bg-white/20 border-white/20 text-[#3B240F] placeholder:text-[#3B240F]/50" /></Field>
      <Field label="Scheduled At" id="exam-edit-scheduled-picker" error={state.showError("scheduledAt") ? state.errors.scheduledAt : null}><div id="exam-edit-scheduled-picker" className="w-full [&_button]:h-12 [&_button]:w-full [&_button]:rounded-2xl"><TeacherExamDueDatePicker value={state.values.scheduledAt} onChange={(nextValue) => state.onFieldChange("scheduledAt", nextValue)} onBlur={() => state.onFieldBlur("scheduledAt")} /></div></Field>
      <Field label="Class" id="exam-edit-class-trigger" error={state.showError("classId") ? state.errors.classId : null}><Select value={state.values.classId} onValueChange={state.onClassChange}><SelectTrigger id="exam-edit-class-trigger" className="h-12 w-full rounded-2xl bg-white/20 border border-white/20 text-[#3B240F] data-[placeholder]:text-[#3B240F]/50 [&>svg]:text-[#3B240F]/70"><SelectValue placeholder="Select class" /></SelectTrigger><SelectContent className="bg-white/25 border border-white/25 backdrop-blur-xl rounded-2xl text-[#3B240F]">{seedClasses2.map((item) => <SelectItem key={item.id} value={item.id} className="text-[#3B240F] focus:bg-white/30 focus:text-[#3B240F]">{item.label}</SelectItem>)}</SelectContent></Select></Field>
      <Field label="Max Score" id="exam-edit-max-score" error={state.showError("maxScore") ? state.errors.maxScore : null}><Input id="exam-edit-max-score" type="number" min={1} value={state.values.maxScore} onChange={(event) => state.onFieldChange("maxScore", event.target.value)} onBlur={() => state.onFieldBlur("maxScore")} placeholder="100" className="h-12 w-full rounded-2xl bg-white/20 border border-white/25 text-[#3B240F] placeholder:text-[#3B240F]/50" /></Field>
      <Field label="Total Questions" id="exam-edit-total-questions" error={state.showError("totalQuestions") ? state.errors.totalQuestions : null}><Input id="exam-edit-total-questions" type="number" min={1} value={state.values.totalQuestions} onChange={(event) => state.onFieldChange("totalQuestions", event.target.value)} onBlur={() => state.onFieldBlur("totalQuestions")} placeholder="10" className="h-12 w-full rounded-2xl bg-white/20 border-white/20 text-[#3B240F] placeholder:text-[#3B240F]/50" /></Field>
    </div>
  );
}

function Field({ children, error, id, label }: { children: ReactNode; error: string | null; id: string; label: string }) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-2 block text-sm text-[#3B240F]/70">{label}</label>
      {children}
      {error ? <p className="mt-1 text-sm font-medium text-red-600">{error}</p> : null}
    </div>
  );
}


