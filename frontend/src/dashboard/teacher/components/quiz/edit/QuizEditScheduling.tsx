// Renders the quiz edit scheduling and scoring fields.
import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TeacherQuizDueDatePicker } from "@/dashboard/teacher/components/quiz/create/TeacherQuizDueDatePicker";
import { seedClasses2 } from "@/dashboard/teacher/components/quiz";
import { SubmissionMethodsField } from "@/dashboard/teacher/components/shared/assessment/SubmissionMethodsField";
import { toggleSubmissionMethod } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import type { useTeacherQuizEditForm } from "./useTeacherQuizEditForm";

type Props = { state: ReturnType<typeof useTeacherQuizEditForm>; subjectName: string };

export function QuizEditScheduling({ state }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Field label="Duration Minutes" id="quiz-edit-duration-minutes" error={state.showError("durationMinutes") ? state.errors.durationMinutes : null}>
        <Input id="quiz-edit-duration-minutes" type="number" min={1} value={state.values.durationMinutes} onChange={(event) => state.onFieldChange("durationMinutes", event.target.value)} onBlur={() => state.onFieldBlur("durationMinutes")} placeholder="20" className="h-12 w-full rounded-2xl bg-white/20 border-white/20 text-white placeholder:text-white/70" />
      </Field>
      <Field label="Due At" id="quiz-edit-due-picker" error={state.showError("dueAt") ? state.errors.dueAt : null}>
        <div id="quiz-edit-due-picker" className="w-full [&_button]:h-12 [&_button]:w-full [&_button]:rounded-2xl">
          <TeacherQuizDueDatePicker value={state.values.dueAt} onChange={(nextValue) => state.onFieldChange("dueAt", nextValue)} onBlur={() => state.onFieldBlur("dueAt")} />
        </div>
      </Field>
      <Field label="Class" id="quiz-edit-class-trigger" error={state.showError("classId") ? state.errors.classId : null}>
        <Select value={state.values.classId} onValueChange={state.onClassChange}>
          <SelectTrigger id="quiz-edit-class-trigger" className="h-12 w-full rounded-2xl bg-white/20 border border-white/20 text-white data-[placeholder]:text-white/70 [&>svg]:text-white/70"><SelectValue placeholder="Select class" /></SelectTrigger>
          <SelectContent className="bg-[#1b2430]/95 border border-white/20 backdrop-blur-xl rounded-2xl text-white">{seedClasses2.map((item) => <SelectItem key={item.id} value={item.id} className="text-white focus:bg-white/10 focus:text-white">{item.label}</SelectItem>)}</SelectContent>
        </Select>
      </Field>
      <Field label="Max Score" id="quiz-edit-max-score" error={state.showError("maxScore") ? state.errors.maxScore : null}>
        <Input id="quiz-edit-max-score" type="number" min={1} value={state.values.maxScore} onChange={(event) => state.onFieldChange("maxScore", event.target.value)} onBlur={() => state.onFieldBlur("maxScore")} placeholder="100" className="h-12 w-full rounded-2xl bg-white/20 border border-white/25 text-white placeholder:text-white/70" />
      </Field>
      <Field label="Access Code (Optional)" id="quiz-edit-access-code" error={state.showError("accessCode") ? state.errors.accessCode : null}>
        <Input id="quiz-edit-access-code" type="text" value={state.values.accessCode} onChange={(event) => state.onFieldChange("accessCode", event.target.value)} onBlur={() => state.onFieldBlur("accessCode")} placeholder="Optional access code" className="h-12 w-full rounded-2xl bg-white/20 border border-white/25 text-white placeholder:text-white/70" />
      </Field>
      <Field label="Total Attempts" id="quiz-edit-total-attempts" error={state.showError("totalAttempts") ? state.errors.totalAttempts : null}>
        <Input id="quiz-edit-total-attempts" type="number" min={1} step={1} value={state.values.totalAttempts} onChange={(event) => state.onFieldChange("totalAttempts", event.target.value)} onBlur={() => state.onFieldBlur("totalAttempts")} placeholder="Enter total attempts" className="h-12 w-full rounded-2xl bg-white/20 border border-white/25 text-white placeholder:text-white/70" />
      </Field>
      <Field label="Total Questions" id="quiz-edit-total-questions" error={state.showError("totalQuestions") ? state.errors.totalQuestions : null}>
        <Input id="quiz-edit-total-questions" type="number" min={state.requiresQuestionBuilder ? 1 : 0} disabled={!state.requiresQuestionBuilder} value={state.values.totalQuestions} onChange={(event) => state.onFieldChange("totalQuestions", event.target.value)} onBlur={() => state.onFieldBlur("totalQuestions")} placeholder="10" className="h-12 w-full rounded-2xl bg-white/20 border-white/20 text-white placeholder:text-white/70 disabled:cursor-not-allowed disabled:opacity-70" />
      </Field>
      <SubmissionMethodsField id="quiz-edit-submission-methods" error={state.showError("submissionMethods") ? state.errors.submissionMethods : null} selected={state.values.submissionMethods} onToggle={(method) => state.onSubmissionMethodsChange(toggleSubmissionMethod(state.values.submissionMethods, method))} />
    </div>
  );
}

function Field({ children, error, id, label }: { children: ReactNode; error: string | null; id: string; label: string }) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-2 block text-sm text-white">{label}</label>
      {children}
      {error ? <p className="mt-1 text-sm font-medium text-red-600">{error}</p> : null}
    </div>
  );
}


