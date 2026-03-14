// Renders the student roster score table for the create grade list form.
import { Input } from "@/components/ui/input";
import type { useGradeListState } from "./useGradeListState";

type Props = { state: ReturnType<typeof useGradeListState> };

export function GradeListStudentsTable({ state }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between"><h2 className="text-lg font-semibold text-[var(--text-primary)]">Student Grades</h2><span className="text-sm text-white/70">{state.classId ? `${state.classStudents.length} students in ${state.classId}` : "Select a class to load students"}</span></div>
      <div className="teacher-panel-surface rounded-2xl overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full text-sm text-white"><thead className="bg-white/10"><tr><th className="px-4 py-3 text-left font-medium">Student</th><th className="px-4 py-3 text-left font-medium">Score</th></tr></thead><tbody>{state.classStudents.map((student) => <tr key={student.id} className="border-t border-white/10"><td className="px-4 py-3">{`${student.firstName} ${student.lastName}`}</td><td className="px-4 py-3"><Input type="number" min={0} max={state.validMaxScore ? state.parsedMaxScore : undefined} step="0.01" value={state.rowsByStudentId[student.id]?.score ?? ""} onChange={(event) => state.updateRow(student.id, event.target.value)} placeholder={state.validMaxScore ? `0 - ${state.parsedMaxScore}` : "Set max score first"} className="bg-white/10 border-white/10 text-white placeholder:text-[var(--text-muted)]" />{state.isSubmitted && state.rowErrors[student.id] ? <p className="mt-1 text-sm font-medium text-red-600">{state.rowErrors[student.id]}</p> : null}</td></tr>)}</tbody></table></div>
        {state.classId && state.classStudents.length === 0 ? <div className="p-6 text-center text-white/70">No students found for this class.</div> : null}
      </div>
    </div>
  );
}



