// Renders assignment attachments for the item submission details page.
import type { useGradeSubmissionState } from "./useGradeSubmissionState";

type Props = { state: ReturnType<typeof useGradeSubmissionState> };

export function GradeSubmissionAttachments({ state }: Props) {
  if (state.item?.type !== "assignment") return null;
  const attachments = state.submission?.submissionDetails?.attachments ?? [];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <h2 className="text-white font-semibold mb-2">Attachments</h2>
      {attachments.length > 0 ? <ul className="space-y-2">{attachments.map((attachment) => <li key={attachment.name} className="text-white/85">{attachment.name}</li>)}</ul> : <p className="text-white/70">No attachments submitted.</p>}
    </div>
  );
}
