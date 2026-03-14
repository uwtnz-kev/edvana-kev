// Renders class, schedule, and timing inputs needed to configure an exam session.
import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { seedClasses2 } from "@/dashboard/teacher/components/exams";
import { SubmissionMethodsField } from "@/dashboard/teacher/components/shared/assessment/SubmissionMethodsField";
import { requiresQuestionBuilder, toggleSubmissionMethod } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import { TeacherExamDueDatePicker } from "./TeacherExamDueDatePicker";
import type { ExamFieldProps } from "./examCreateTypes";

type Props = ExamFieldProps & { onClassChange: (value: string) => void };

export function TeacherExamSchedulingFieldsSection({
  values,
  errors,
  touched,
  onFieldChange,
  onFieldBlur,
  onSubmissionMethodsChange,
  onClassChange,
}: Props) {
  const show = (name: keyof typeof errors) => touched[name] && errors[name];
  const questionBuilderActive = requiresQuestionBuilder(values.submissionMethods);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Field label="Duration Minutes" id="exam-duration" error={show("durationMinutes")}>
        <Input id="exam-duration" type="number" min={1} value={values.durationMinutes} onChange={(event) => onFieldChange("durationMinutes", event.target.value)} onBlur={() => onFieldBlur("durationMinutes")} placeholder="60" className="h-12 w-full rounded-2xl border-white/20 bg-white/20 text-white placeholder:text-white/70" />
      </Field>

      <Field label="Scheduled At" id="exam-scheduled-picker" error={show("scheduledAt")}>
        <div id="exam-scheduled-picker" className="w-full [&_button]:h-12 [&_button]:w-full [&_button]:rounded-2xl">
          <TeacherExamDueDatePicker value={values.scheduledAt} onChange={(nextValue) => onFieldChange("scheduledAt", nextValue)} onBlur={() => onFieldBlur("scheduledAt")} />
        </div>
      </Field>

      <Field label="Class" id="exam-class-trigger" error={show("classId")}>
        <Select value={values.classId} onValueChange={onClassChange}>
          <SelectTrigger id="exam-class-trigger" className="h-12 w-full rounded-2xl border border-white/20 bg-white/20 text-white data-[placeholder]:text-white [&>svg]:text-white">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border border-white/25 bg-white/25 text-white backdrop-blur-xl">
            {seedClasses2.map((item) => <SelectItem key={item.id} value={item.id} className="text-white focus:bg-white/30 focus:text-white">{item.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Max Score" id="exam-max-score" error={show("maxScore")}>
        <Input id="exam-max-score" type="number" min={1} value={values.maxScore} onChange={(event) => onFieldChange("maxScore", event.target.value)} onBlur={() => onFieldBlur("maxScore")} placeholder="100" className="h-12 w-full rounded-2xl border border-white/25 bg-white/20 text-white placeholder:text-white/70" />
      </Field>

      <Field label="Access Code" id="exam-access-code" error={show("accessCode")}>
        <Input id="exam-access-code" type="text" value={values.accessCode} onChange={(event) => onFieldChange("accessCode", event.target.value)} onBlur={() => onFieldBlur("accessCode")} placeholder="Enter access code" className="h-12 w-full rounded-2xl border border-white/25 bg-white/20 text-white placeholder:text-white/70" />
      </Field>

      <Field label="Total Attempts" id="exam-total-attempts" error={show("totalAttempts")}>
        <Input id="exam-total-attempts" type="number" min={1} step={1} value={values.totalAttempts} onChange={(event) => onFieldChange("totalAttempts", event.target.value)} onBlur={() => onFieldBlur("totalAttempts")} placeholder="Enter total attempts" className="h-12 w-full rounded-2xl border border-white/25 bg-white/20 text-white placeholder:text-white/70" />
      </Field>

      <Field label="Total Questions" id="exam-total-questions" error={show("totalQuestions")}>
        <Input id="exam-total-questions" type="number" min={questionBuilderActive ? 1 : 0} disabled={!questionBuilderActive} value={values.totalQuestions} onChange={(event) => onFieldChange("totalQuestions", event.target.value)} onBlur={() => onFieldBlur("totalQuestions")} className="h-12 w-full rounded-2xl border border-white/25 bg-white/20 text-white placeholder:text-white/70 disabled:cursor-not-allowed disabled:opacity-70" />
      </Field>

      <SubmissionMethodsField id="exam-submission-methods" error={show("submissionMethods")} selected={values.submissionMethods} onToggle={(method) => onSubmissionMethodsChange(toggleSubmissionMethod(values.submissionMethods, method))} />
    </div>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error: string | null; children: ReactNode }) {
  return (
    <div className="w-full">
      {/* Keeps repeated schedule field framing and error placement consistent. */}
      <label htmlFor={id} className="mb-2 block text-sm text-white">{label}</label>
      {children}
      {error ? <p className="mt-1 text-sm font-medium text-red-600">{error}</p> : null}
    </div>
  );
}




