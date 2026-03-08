// Renders the not-submitted students table and empty state.
import type { useGradeItemNotSubmittedState } from "./useGradeItemNotSubmittedState";
import { GradeItemNotSubmittedRow } from "./table/GradeItemNotSubmittedRow";

type Props = { state: ReturnType<typeof useGradeItemNotSubmittedState> };

export function GradeItemNotSubmittedTable({ state }: Props) {
  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-white">
          <thead className="bg-white/10">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Student Name</th>
              <th className="px-4 py-3 text-left font-medium">Class</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {state.notSubmitted.map((student) => (
              <GradeItemNotSubmittedRow key={student.studentId} student={student} />
            ))}
          </tbody>
        </table>
      </div>
      {state.notSubmitted.length === 0 ? (
        <div className="p-6 text-center text-white/70">All students have submitted this item.</div>
      ) : null}
    </div>
  );
}
