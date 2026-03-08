// Renders the static subject field and the core text inputs for quiz details.
import { BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { QuizFieldProps } from "./quizCreateTypes";

type Props = QuizFieldProps & { subjectName: string };

export function TeacherQuizBasicFieldsSection({
  subjectName,
  values,
  errors,
  touched,
  onFieldChange,
  onFieldBlur,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="w-full">
        <label className="mb-2 block text-sm text-[#3B240F]/70">Subject</label>
        <div className="inline-flex h-12 w-full items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-3">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-blue-500/15 text-blue-700">
            <BookOpen className="h-4 w-4" />
          </span>
          <span className="truncate text-sm font-medium text-[#3B240F]">{subjectName}</span>
        </div>
      </div>

      <div className="space-y-2 lg:col-span-2">
        <label htmlFor="quiz-title" className="text-sm text-[#3B240F]">Title</label>
        <Input id="quiz-title" value={values.title} onChange={(event) => onFieldChange("title", event.target.value)} onBlur={() => onFieldBlur("title")} placeholder="Quiz 1 Knowledge Check" className="border-white/20 bg-white/20 text-[#3B240F] placeholder:text-[#3B240F]/50" />
        {touched.title && errors.title ? <p className="mt-1 text-sm font-medium text-red-600">{errors.title}</p> : null}
      </div>

      <div className="space-y-2 lg:col-span-2">
        <label htmlFor="quiz-instructions" className="text-sm text-[#3B240F]">Instructions</label>
        <Textarea id="quiz-instructions" value={values.instructions} onChange={(event) => onFieldChange("instructions", event.target.value)} onBlur={() => onFieldBlur("instructions")} placeholder="Provide detailed instructions for students." className="min-h-[140px] border-white/20 bg-white/20 text-[#3B240F] placeholder:text-[#3B240F]/50" />
        {touched.instructions && errors.instructions ? <p className="mt-1 text-sm font-medium text-red-600">{errors.instructions}</p> : null}
      </div>
    </div>
  );
}
