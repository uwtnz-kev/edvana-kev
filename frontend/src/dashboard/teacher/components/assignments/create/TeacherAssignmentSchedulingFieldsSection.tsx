// Renders due date, class, and grading inputs used to schedule the assignment.
import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { seedClasses2 } from "@/dashboard/teacher/components/assignments";
import { TeacherAssignmentDueDatePicker } from "./TeacherAssignmentDueDatePicker";
import type { AssignmentFieldProps } from "./assignmentCreateTypes";

type Props = AssignmentFieldProps & { onClassChange: (value: string) => void };

export function TeacherAssignmentSchedulingFieldsSection({
  values,
  errors,
  touched,
  onFieldChange,
  onFieldBlur,
  onClassChange,
}: Props) {
  const show = (name: keyof typeof errors) => touched[name] && errors[name];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Field label="Estimated Minutes" id="assignment-estimated" error={show("estimatedMinutes")}>
        <Input id="assignment-estimated" type="number" min={1} value={values.estimatedMinutes} onChange={(event) => onFieldChange("estimatedMinutes", event.target.value)} onBlur={() => onFieldBlur("estimatedMinutes")} placeholder="45" className="h-12 w-full rounded-2xl border-white/20 bg-white/20 text-[#3B240F] placeholder:text-[#3B240F]/50" />
      </Field>

      <Field label="Due At" id="assignment-due-picker" error={show("dueAt")}>
        <div id="assignment-due-picker" className="w-full [&_button]:h-12 [&_button]:w-full [&_button]:rounded-2xl">
          <TeacherAssignmentDueDatePicker value={values.dueAt} onChange={(nextValue) => onFieldChange("dueAt", nextValue)} onBlur={() => onFieldBlur("dueAt")} />
        </div>
      </Field>

      <Field label="Class" id="assignment-class-trigger" error={show("classId")}>
        <Select value={values.classId} onValueChange={onClassChange}>
          <SelectTrigger id="assignment-class-trigger" className="h-12 w-full rounded-2xl border border-white/20 bg-white/20 text-[#3B240F] data-[placeholder]:text-[#3B240F]/50 [&>svg]:text-[#3B240F]/70">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border border-white/25 bg-white/25 text-[#3B240F] backdrop-blur-xl">
            {seedClasses2.map((item) => <SelectItem key={item.id} value={item.id} className="text-[#3B240F] focus:bg-white/30 focus:text-[#3B240F]">{item.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Max Score" id="assignment-max-score" error={show("maxScore")}>
        <Input id="assignment-max-score" type="number" min={1} value={values.maxScore} onChange={(event) => onFieldChange("maxScore", event.target.value)} onBlur={() => onFieldBlur("maxScore")} placeholder="100" className="h-12 w-full rounded-2xl border border-white/25 bg-white/20 text-[#3B240F] placeholder:text-[#3B240F]/50" />
      </Field>

      <Field label="Total Questions" id="assignment-total-questions" error={show("totalQuestions")}>
        <Input id="assignment-total-questions" type="number" min={1} value={values.totalQuestions} onChange={(event) => onFieldChange("totalQuestions", event.target.value)} onBlur={() => onFieldBlur("totalQuestions")} className="h-12 w-full rounded-2xl border border-white/25 bg-white/20 text-[#3B240F] placeholder:text-[#3B240F]/50" />
      </Field>
    </div>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error: string | null; children: ReactNode }) {
  return (
    <div className="w-full">
      {/* Keeps repeated schedule field framing and error placement consistent. */}
      <label htmlFor={id} className="mb-2 block text-sm text-[#3B240F]/70">{label}</label>
      {children}
      {error ? <p className="mt-1 text-sm font-medium text-red-600">{error}</p> : null}
    </div>
  );
}


