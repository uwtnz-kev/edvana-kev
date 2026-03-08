/** Renders scheduling, scoring, and question-builder settings for assignment editing. */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TeacherAssignmentDueDatePicker } from "@/dashboard/teacher/components/assignments/create/TeacherAssignmentDueDatePicker";
import { seedClasses2 } from "@/dashboard/teacher/components/assignments";
import type { AssignmentEditFieldProps } from "./assignmentEditTypes";

function ErrorText({ show, message }: { show: boolean; message?: string | null }) {
  return show ? <p className="mt-1 text-sm font-medium text-red-600">{message}</p> : null;
}

export function AssignmentEditSubmissionSettings(props: AssignmentEditFieldProps) {
  const { errors, onClassChange, onFieldBlur, onFieldChange, onOpenPreview, onOpenQuestionBuilder, showError, values } = props;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="w-full"><label htmlFor="assignment-edit-estimated" className="mb-2 block text-sm text-[#3B240F]/70">Estimated Minutes</label><Input id="assignment-edit-estimated" type="number" min={1} value={values.estimatedMinutes} onChange={(event) => onFieldChange("estimatedMinutes", event.target.value)} onBlur={() => onFieldBlur("estimatedMinutes")} placeholder="45" className="h-12 w-full rounded-2xl bg-white/20 border-white/20 text-[#3B240F] placeholder:text-[#3B240F]/50" /><ErrorText show={showError("estimatedMinutes")} message={errors.estimatedMinutes} /></div>
      <div className="w-full"><label htmlFor="assignment-edit-due-picker" className="mb-2 block text-sm text-[#3B240F]/70">Due At</label><div id="assignment-edit-due-picker" className="w-full [&_button]:h-12 [&_button]:w-full [&_button]:rounded-2xl"><TeacherAssignmentDueDatePicker value={values.dueAt} onChange={(nextValue) => onFieldChange("dueAt", nextValue)} onBlur={() => onFieldBlur("dueAt")} /></div><ErrorText show={showError("dueAt")} message={errors.dueAt} /></div>
      <div className="w-full"><label className="mb-2 block text-sm text-[#3B240F]/70">Class</label><Select value={values.classId} onValueChange={onClassChange}><SelectTrigger id="assignment-edit-class-trigger" className="h-12 w-full rounded-2xl bg-white/20 border border-white/20 text-[#3B240F] data-[placeholder]:text-[#3B240F]/50 [&>svg]:text-[#3B240F]/70"><SelectValue placeholder="Select class" /></SelectTrigger><SelectContent className="bg-white/25 border border-white/25 backdrop-blur-xl rounded-2xl text-[#3B240F]">{seedClasses2.map((item) => <SelectItem key={item.id} value={item.id} className="text-[#3B240F] focus:bg-white/30 focus:text-[#3B240F]">{item.label}</SelectItem>)}</SelectContent></Select><ErrorText show={showError("classId")} message={errors.classId} /></div>
      <div className="w-full"><label htmlFor="assignment-edit-max-score" className="mb-2 block text-sm text-[#3B240F]/70">Max Score</label><Input id="assignment-edit-max-score" type="number" min={1} value={values.maxScore} onChange={(event) => onFieldChange("maxScore", event.target.value)} onBlur={() => onFieldBlur("maxScore")} placeholder="100" className="h-12 w-full rounded-2xl bg-white/20 border border-white/25 text-[#3B240F] placeholder:text-[#3B240F]/50" /><ErrorText show={showError("maxScore")} message={errors.maxScore} /></div>
      <div className="w-full"><label htmlFor="assignment-edit-total-questions" className="mb-2 block text-sm text-[#3B240F]/70">Total Questions</label><Input id="assignment-edit-total-questions" type="number" min={1} value={values.totalQuestions} onChange={(event) => onFieldChange("totalQuestions", event.target.value)} onBlur={() => onFieldBlur("totalQuestions")} className="h-12 w-full rounded-2xl bg-white/20 border border-white/25 text-[#3B240F] placeholder:text-[#3B240F]/50" /><ErrorText show={showError("totalQuestions")} message={errors.totalQuestions} /></div>
      <div className="space-y-2 lg:col-span-2"><div className="mb-2 flex items-center justify-between"><label htmlFor="assignment-edit-questions-text" className="text-sm text-[#3B240F]">Questions</label><Button type="button" onClick={onOpenPreview} className="rounded-xl border border-white/20 bg-white/20 px-3 py-1 text-xs text-[#3B240F] hover:bg-white/30">Preview</Button></div><Textarea id="assignment-edit-questions-text" value={values.questionsText} readOnly onBlur={() => onFieldBlur("questionsText")} placeholder="Use Input Questions to add questions" className="min-h-[140px] cursor-not-allowed bg-white/10 border-white/15 text-[#3B240F] placeholder:text-[#3B240F]/50" /><ErrorText show={showError("questionsText")} message={errors.questionsText} /></div>
      <div className="lg:col-span-2"><Button type="button" onClick={onOpenQuestionBuilder} className="rounded-2xl border border-white/20 bg-white/20 text-[#3B240F] hover:bg-white/30">Edit Questions</Button></div>
    </div>
  );
}


