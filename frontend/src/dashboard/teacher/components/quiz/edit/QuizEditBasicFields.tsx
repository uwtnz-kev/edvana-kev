// Renders the basic text fields for quiz editing.
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { useTeacherQuizEditForm } from "./useTeacherQuizEditForm";

type Props = { state: ReturnType<typeof useTeacherQuizEditForm> };

export function QuizEditBasicFields({ state }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="space-y-2 lg:col-span-2">
        <label htmlFor="quiz-edit-title" className="text-sm text-[#3B240F]">Title</label>
        <Input id="quiz-edit-title" value={state.values.title} onChange={(event) => state.onFieldChange("title", event.target.value)} onBlur={() => state.onFieldBlur("title")} placeholder="Quiz 1 Knowledge Check" className="bg-white/20 border-white/20 text-[#3B240F] placeholder:text-[#3B240F]/50" />
        {state.showError("title") ? <p className="mt-1 text-sm font-medium text-red-600">{state.errors.title}</p> : null}
      </div>
      <div className="space-y-2 lg:col-span-2">
        <label htmlFor="quiz-edit-instructions" className="text-sm text-[#3B240F]">Instructions</label>
        <Textarea id="quiz-edit-instructions" value={state.values.instructions} onChange={(event) => state.onFieldChange("instructions", event.target.value)} onBlur={() => state.onFieldBlur("instructions")} placeholder="Provide detailed instructions for students." className="min-h-[140px] bg-white/20 border-white/20 text-[#3B240F] placeholder:text-[#3B240F]/50" />
        {state.showError("instructions") ? <p className="mt-1 text-sm font-medium text-red-600">{state.errors.instructions}</p> : null}
      </div>
    </div>
  );
}
