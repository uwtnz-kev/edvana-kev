// Renders submitted and not-submitted tables for an assessment item.
import { GradeItemSubmissionRow } from "./table/GradeItemSubmissionRow";
import type { useGradeItemSubmissionsState } from "./useGradeItemSubmissionsState";

type Props = { state: ReturnType<typeof useGradeItemSubmissionsState> };

export function GradeItemSubmissionsTable({ state }: Props) {
  if (state.activeTab === "submitted") {
    return <div className="teacher-panel-surface rounded-2xl overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm text-white"><thead className="bg-white/10"><tr><th className="px-4 py-3 text-left font-medium">Student</th><th className="px-4 py-3 text-left font-medium">Submitted</th><th className="px-4 py-3 text-left font-medium">Status</th><th className="px-4 py-3 text-left font-medium">Score</th><th className="px-4 py-3 text-left font-medium">Action</th></tr></thead><tbody>{state.submittedRows.map((submission) => <GradeItemSubmissionRow key={submission.id} state={state} submission={submission} />)}</tbody></table></div>{state.submittedRows.length === 0 ? <div className="p-6 text-center text-white/70">No submissions found for this item.</div> : null}</div>;
  }
  return <div className="teacher-panel-surface rounded-2xl overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm text-white"><thead className="bg-white/10"><tr><th className="px-4 py-3 text-left font-medium">Student Name</th><th className="px-4 py-3 text-left font-medium">Class</th><th className="px-4 py-3 text-left font-medium">Status</th></tr></thead><tbody>{state.notSubmittedRows.map((student) => <tr key={student.studentId} className="border-t border-white/10"><td className="px-4 py-3">{student.studentName}</td><td className="px-4 py-3">{student.className}</td><td className="px-4 py-3">not submitted</td></tr>)}</tbody></table></div>{state.notSubmittedRows.length === 0 ? <div className="p-6 text-center text-white/70">All students have submitted this item.</div> : null}</div>;
}

