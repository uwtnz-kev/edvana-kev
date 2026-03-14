// Renders the grade submissions table and empty state.
import { GradeSubmissionRow } from "./table/GradeSubmissionRow";
import type { useGradeSubmissionsState } from "./useGradeSubmissionsState";

type Props = { state: ReturnType<typeof useGradeSubmissionsState> };

export function GradeSubmissionsTable({ state }: Props) {
  if (!state.selectedSubject) return <div className="teacher-panel-surface rounded-2xl p-8 text-center text-white/80">No subject selected. Go back and choose a subject to review submissions.</div>;
  return (
    <div className="teacher-panel-surface rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-white">
          <thead className="bg-white/10"><tr><th className="px-4 py-3 text-left font-medium">Student</th><th className="px-4 py-3 text-left font-medium">Class</th><th className="px-4 py-3 text-left font-medium">Assessment</th><th className="px-4 py-3 text-left font-medium">Submitted</th><th className="px-4 py-3 text-left font-medium">Status</th><th className="px-4 py-3 text-left font-medium">Score</th></tr></thead>
          <tbody>{state.submissions.map((submission) => <GradeSubmissionRow key={submission.id} state={state} submission={submission} />)}</tbody>
        </table>
      </div>
      {state.submissions.length === 0 ? <div className="p-6 text-center text-white/70">No submissions found for the selected filters.</div> : null}
    </div>
  );
}

