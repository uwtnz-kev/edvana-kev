/** Renders scheduling, scoring, and question-builder settings for assignment editing. */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TeacherAssignmentDueDatePicker } from "@/dashboard/teacher/components/assignments/create/TeacherAssignmentDueDatePicker";
import { seedClasses2 } from "@/dashboard/teacher/components/assignments";
import { SubmissionMethodsField } from "@/dashboard/teacher/components/shared/assessment/SubmissionMethodsField";
import { toggleSubmissionMethod } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import type { AssignmentEditFieldProps } from "./assignmentEditTypes";

function ErrorText({ show, message }: { show: boolean; message?: string | null }) {
  return show ? <p className="mt-1 text-sm font-medium text-red-600">{message}</p> : null;
}

export function AssignmentEditSubmissionSettings(props: AssignmentEditFieldProps) {
  const { errors, onClassChange, onFieldBlur, onFieldChange, onOpenPreview, onOpenQuestionBuilder, onSubmissionMethodsChange, showError, values } = props;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="w-full"><label htmlFor="assignment-edit-due-picker" className="mb-2 block text-sm text-[var(--text-secondary)]">Due At</label><div id="assignment-edit-due-picker" className="w-full [&_button]:h-12 [&_button]:w-full [&_button]:rounded-2xl"><TeacherAssignmentDueDatePicker value={values.dueAt} onChange={(nextValue) => onFieldChange("dueAt", nextValue)} onBlur={() => onFieldBlur("dueAt")} /></div><ErrorText show={showError("dueAt")} message={errors.dueAt} /></div>
      <div className="w-full"><label className="mb-2 block text-sm text-[var(--text-secondary)]">Class</label><Select value={values.classId} onValueChange={onClassChange}><SelectTrigger id="assignment-edit-class-trigger" className="h-12 w-full rounded-2xl bg-white/20 border border-white/20 text-white data-[placeholder]:text-white/70 [&>svg]:text-white/70"><SelectValue placeholder="Select class" /></SelectTrigger><SelectContent className="bg-[#1b2430]/95 border border-white/20 backdrop-blur-xl rounded-2xl text-white">{seedClasses2.map((item) => <SelectItem key={item.id} value={item.id} className="text-white focus:bg-white/10 focus:text-white">{item.label}</SelectItem>)}</SelectContent></Select><ErrorText show={showError("classId")} message={errors.classId} /></div>
      <div className="w-full"><label htmlFor="assignment-edit-max-score" className="mb-2 block text-sm text-[var(--text-secondary)]">Max Score</label><Input id="assignment-edit-max-score" type="number" min={1} value={values.maxScore} onChange={(event) => onFieldChange("maxScore", event.target.value)} onBlur={() => onFieldBlur("maxScore")} placeholder="100" className="h-12 w-full rounded-2xl bg-white/20 border border-white/25 text-white placeholder:text-white/70" /><ErrorText show={showError("maxScore")} message={errors.maxScore} /></div>
      <div className="w-full"><label htmlFor="assignment-edit-access-code" className="mb-2 block text-sm text-[var(--text-secondary)]">Access Code (Optional)</label><Input id="assignment-edit-access-code" type="text" value={values.accessCode} onChange={(event) => onFieldChange("accessCode", event.target.value)} onBlur={() => onFieldBlur("accessCode")} placeholder="Optional access code" className="h-12 w-full rounded-2xl bg-white/20 border border-white/25 text-white placeholder:text-white/70" /><ErrorText show={showError("accessCode")} message={errors.accessCode} /></div>
      <div className="w-full"><label htmlFor="assignment-edit-total-attempts" className="mb-2 block text-sm text-[var(--text-secondary)]">Total Attempts</label><Input id="assignment-edit-total-attempts" type="number" min={1} step={1} value={values.totalAttempts} onChange={(event) => onFieldChange("totalAttempts", event.target.value)} onBlur={() => onFieldBlur("totalAttempts")} placeholder="Enter total attempts" className="h-12 w-full rounded-2xl bg-white/20 border border-white/25 text-white placeholder:text-white/70" /><ErrorText show={showError("totalAttempts")} message={errors.totalAttempts} /></div>
      <div className="w-full"><label htmlFor="assignment-edit-total-questions" className="mb-2 block text-sm text-[var(--text-secondary)]">Total Questions</label><Input id="assignment-edit-total-questions" type="number" min={props.requiresQuestionBuilder ? 1 : 0} disabled={!props.requiresQuestionBuilder} value={values.totalQuestions} onChange={(event) => onFieldChange("totalQuestions", event.target.value)} onBlur={() => onFieldBlur("totalQuestions")} className="h-12 w-full rounded-2xl bg-white/20 border border-white/25 text-white placeholder:text-white/70 disabled:cursor-not-allowed disabled:opacity-70" /><ErrorText show={showError("totalQuestions")} message={errors.totalQuestions} /></div>
      <div className="w-full"><SubmissionMethodsField id="assignment-edit-submission-methods" error={showError("submissionMethods") ? errors.submissionMethods : null} selected={values.submissionMethods} onToggle={(method) => onSubmissionMethodsChange(toggleSubmissionMethod(values.submissionMethods, method))} /></div>
      {props.requiresQuestionBuilder ? <div className="space-y-2 lg:col-span-2"><div className="mb-2 flex items-center justify-between"><label htmlFor="assignment-edit-questions-text" className="text-sm text-white">Questions</label><Button type="button" onClick={onOpenPreview} className="rounded-xl border border-white/20 bg-white/20 px-3 py-1 text-xs text-white hover:bg-white/30">Preview</Button></div><Textarea id="assignment-edit-questions-text" value={values.questionsText} readOnly onBlur={() => onFieldBlur("questionsText")} placeholder="Use Input Questions to add questions" className="min-h-[140px] cursor-not-allowed bg-white/10 border-white/15 text-white placeholder:text-white/70" /><ErrorText show={showError("questionsText")} message={errors.questionsText} /></div> : <div className="rounded-2xl border border-dashed border-white/20 bg-white/10 px-4 py-5 text-sm text-white/75 lg:col-span-2">Question builder is only available when Submission Method includes Quiz Form.</div>}
      {props.requiresQuestionBuilder ? <div className="lg:col-span-2"><Button type="button" onClick={onOpenQuestionBuilder} className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30">Edit Questions</Button></div> : null}
    </div>
  );
}



