// Renders a submitted row with inline score editing and view action.
import { Check, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TeacherGradeSubmission } from "@/dashboard/teacher/components/grades";
import { StatusBadge } from "@/dashboard/teacher/components/shared";
import type { useGradeItemSubmissionsState } from "../useGradeItemSubmissionsState";

type Props = { state: ReturnType<typeof useGradeItemSubmissionsState>; submission: TeacherGradeSubmission };

export function GradeItemSubmissionRow({ state, submission }: Props) {
  const isEditing = state.editingSubmissionId === submission.id;
  return (
    <tr className="border-t border-white/10 cursor-pointer hover:bg-white/10" onClick={() => state.openDetails(submission.id)}>
      <td className="px-4 py-3">{submission.studentName}</td><td className="px-4 py-3">{new Date(submission.submittedAt).toLocaleString()}</td><td className="px-4 py-3"><StatusBadge status={submission.status} /></td>
      <td className="px-4 py-3">{isEditing ? <div className="space-y-1" onClick={(event) => event.stopPropagation()}><div className="flex items-center gap-2"><Input autoFocus type="number" min={0} max={submission.maxScore} value={state.editingScore} onChange={(event) => { state.setEditingError(null); state.setEditingScore(event.target.value); }} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); state.submitScoreUpdate(submission); } if (event.key === "Escape") state.stopEditing(); }} className="h-8 w-20 bg-white/10 border-white/20 text-white" /><span className="text-xs text-white/70">/ {submission.maxScore}</span><button type="button" onClick={(event) => { event.stopPropagation(); state.submitScoreUpdate(submission); }} className="p-1 rounded-lg hover:bg-white/15 transition-colors duration-200"><Check className="h-4 w-4 text-green-400" /></button><button type="button" onClick={(event) => { event.stopPropagation(); state.stopEditing(); }} className="p-1 rounded-lg hover:bg-white/15 transition-colors duration-200"><X className="h-4 w-4 text-red-400" /></button></div>{state.editingError ? <p className="text-xs text-red-300">{state.editingError}</p> : null}</div> : <div className="flex items-center justify-between gap-2" onClick={(event) => event.stopPropagation()}><span>{typeof submission.score === "number" ? `${submission.score}/${submission.maxScore}` : "-"}</span><button type="button" onClick={(event) => { event.stopPropagation(); state.startEditing(submission); }} className="p-1 rounded-lg hover:bg-white/15 transition-colors duration-200"><Pencil className="h-4 w-4 text-white/70" /></button></div>}</td>
      <td className="px-4 py-3"><Button type="button" onClick={(event) => { event.stopPropagation(); state.openDetails(submission.id); }} className="h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white">View</Button></td>
    </tr>
  );
}
