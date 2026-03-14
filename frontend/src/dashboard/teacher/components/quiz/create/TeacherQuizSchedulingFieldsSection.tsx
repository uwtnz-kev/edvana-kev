// Renders class, due date, and scoring inputs that control quiz scheduling and grading.
import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { seedClasses2 } from "@/dashboard/teacher/components/quiz";
import { SubmissionMethodsField } from "@/dashboard/teacher/components/shared/assessment/SubmissionMethodsField";
import { requiresQuestionBuilder, toggleSubmissionMethod } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import { TeacherQuizDueDatePicker } from "./TeacherQuizDueDatePicker";
import type { QuizFieldProps } from "./quizCreateTypes";

export function TeacherQuizSchedulingFieldsSection({
  values,
  errors,
  touched,
  onFieldChange,
  onFieldBlur,
  onSubmissionMethodsChange,
  onClassChange,
}: QuizFieldProps & { onClassChange: (value: string) => void }) {
  const show = (name: keyof typeof errors) => touched[name] && errors[name];
  const questionBuilderActive = requiresQuestionBuilder(values.submissionMethods);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Field label="Duration Minutes" id="quiz-duration-minutes" error={show("durationMinutes")}>
        <Input id="quiz-duration-minutes" type="number" min={1} value={values.durationMinutes} onChange={(event) => onFieldChange("durationMinutes", event.target.value)} onBlur={() => onFieldBlur("durationMinutes")} placeholder="20" className="h-12 w-full rounded-2xl border-white/20 bg-white/20 text-white placeholder:text-white/70" />
      </Field>

      <Field label="Due At" id="quiz-due-picker" error={show("dueAt")}>
        <div id="quiz-due-picker" className="w-full [&_button]:h-12 [&_button]:w-full [&_button]:rounded-2xl">
          <TeacherQuizDueDatePicker value={values.dueAt} onChange={(nextValue) => onFieldChange("dueAt", nextValue)} onBlur={() => onFieldBlur("dueAt")} />
        </div>
      </Field>

      <Field label="Class" id="quiz-class-trigger" error={show("classId")}>
        <Select value={values.classId} onValueChange={onClassChange}>
          <SelectTrigger id="quiz-class-trigger" className="h-12 w-full rounded-2xl border border-white/20 bg-white/20 text-white data-[placeholder]:text-white [&>svg]:text-white">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border border-white/25 bg-white/25 text-white backdrop-blur-xl">
            {seedClasses2.map((item) => <SelectItem key={item.id} value={item.id} className="text-white focus:bg-white/30 focus:text-white">{item.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Max Score" id="quiz-max-score" error={show("maxScore")}>
        <Input id="quiz-max-score" type="number" min={1} value={values.maxScore} onChange={(event) => onFieldChange("maxScore", event.target.value)} onBlur={() => onFieldBlur("maxScore")} placeholder="100" className="h-12 w-full rounded-2xl border border-white/25 bg-white/20 text-white placeholder:text-white/70" />
      </Field>

      <Field label="Access Code (Optional)" id="quiz-access-code" error={show("accessCode")}>
        <Input id="quiz-access-code" type="text" value={values.accessCode} onChange={(event) => onFieldChange("accessCode", event.target.value)} onBlur={() => onFieldBlur("accessCode")} placeholder="Optional access code" className="h-12 w-full rounded-2xl border border-white/25 bg-white/20 text-white placeholder:text-white/70" />
      </Field>

      <Field label="Total Attempts" id="quiz-total-attempts" error={show("totalAttempts")}>
        <Input id="quiz-total-attempts" type="number" min={1} step={1} value={values.totalAttempts} onChange={(event) => onFieldChange("totalAttempts", event.target.value)} onBlur={() => onFieldBlur("totalAttempts")} placeholder="Enter total attempts" className="h-12 w-full rounded-2xl border border-white/25 bg-white/20 text-white placeholder:text-white/70" />
      </Field>

      <Field label="Total Questions" id="quiz-total-questions" error={show("totalQuestions")}>
        <Input id="quiz-total-questions" type="number" min={questionBuilderActive ? 1 : 0} disabled={!questionBuilderActive} value={values.totalQuestions} onChange={(event) => onFieldChange("totalQuestions", event.target.value)} onBlur={() => onFieldBlur("totalQuestions")} placeholder="10" className="h-12 w-full rounded-2xl border-white/20 bg-white/20 text-white placeholder:text-white/70 disabled:cursor-not-allowed disabled:opacity-70" />
      </Field>

      <SubmissionMethodsField id="quiz-submission-methods" error={show("submissionMethods")} selected={values.submissionMethods} onToggle={(method) => onSubmissionMethodsChange(toggleSubmissionMethod(values.submissionMethods, method))} />
    </div>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error: string | null; children: ReactNode }) {
  return (
    <div className="w-full">
      {/* Keeps the repeated schedule field label and error layout consistent. */}
      <label htmlFor={id} className="mb-2 block text-sm text-white">{label}</label>
      {children}
      {error ? <p className="mt-1 text-sm font-medium text-red-600">{error}</p> : null}
    </div>
  );
}




