// Assignment attachments and response panel, plus grading actions for assignment submissions.
import { getSubmissionAttachments } from "./gradeSubmissionDetailsHelpers";
import { GradeSubmissionActionsPanel } from "./panels/GradeSubmissionActionsPanel";
import type { useGradeSubmissionDetailsState } from "./useGradeSubmissionDetailsState";

type Props = { state: ReturnType<typeof useGradeSubmissionDetailsState> };

export function GradeSubmissionAttachmentsPanel({ state }: Props) {
  if (!state.submission) return null;
  if (state.submission.type !== "assignment") return <GradeSubmissionActionsPanel state={state} />;
  const attachments = getSubmissionAttachments(state.submission);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
        <h2 className="text-lg font-semibold text-[#3B240F] mb-3">Attachments</h2>
        {attachments.length > 0 ? <ul className="space-y-2">{attachments.map((item, index) => <li key={`${item.name}-${index}`} className="text-white/90">{item.name}</li>)}</ul> : <p className="text-white/70">No attachments provided.</p>}
      </div>
      <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
        <h2 className="text-lg font-semibold text-[#3B240F] mb-3">Student Response</h2>
        <p className="text-white/90">{state.submission.submissionDetails?.responseText ?? state.submission.assignmentTextResponse ?? "No text response provided."}</p>
      </div>
      <GradeSubmissionActionsPanel state={state} />
    </div>
  );
}
