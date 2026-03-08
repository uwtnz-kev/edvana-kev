// Summary card for student, class, subject, submission time, and status.
import { formatSubmittedAt } from "./gradeSubmissionDetailsHelpers";
import type { useGradeSubmissionDetailsState } from "./useGradeSubmissionDetailsState";

type Props = { state: ReturnType<typeof useGradeSubmissionDetailsState> };

function SummaryItem(props: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/10 border border-white/10 p-4">
      <p className="text-white/70 text-xs uppercase tracking-wide">{props.label}</p>
      <p className="text-white mt-1">{props.value}</p>
    </div>
  );
}

export function GradeSubmissionSummaryCard({ state }: Props) {
  if (!state.submission) return null;
  const submission = state.submission;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <SummaryItem label="Student" value={submission.studentName} />
      <SummaryItem label="Class" value={submission.className} />
      <SummaryItem label="Subject" value={submission.subjectName} />
      <SummaryItem label="Submitted" value={formatSubmittedAt(submission.submittedAt)} />
      <SummaryItem label="Status" value={submission.status} />
    </div>
  );
}
