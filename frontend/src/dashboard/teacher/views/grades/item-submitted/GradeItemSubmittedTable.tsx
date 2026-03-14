// Renders the submitted items table and empty state.
import type { useGradeItemSubmittedState } from "./useGradeItemSubmittedState";
import { GradeItemSubmittedRow } from "./table/GradeItemSubmittedRow";

type Props = {
  state: ReturnType<typeof useGradeItemSubmittedState>;
};

export function GradeItemSubmittedTable({ state }: Props) {
  return (
    <div className="teacher-panel-surface rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-white">
          <thead className="bg-white/10">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Student Name</th>
              <th className="px-4 py-3 text-left font-medium">Class</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Score</th>
              <th className="px-4 py-3 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {state.submissions.map((submission) => (
              <GradeItemSubmittedRow
                key={submission.id}
                submission={submission}
                onView={state.openSubmission}
              />
            ))}
          </tbody>
        </table>
      </div>
      {state.submissions.length === 0 ? (
        <div className="p-6 text-center text-white/70">No submitted students for this item.</div>
      ) : null}
    </div>
  );
}

