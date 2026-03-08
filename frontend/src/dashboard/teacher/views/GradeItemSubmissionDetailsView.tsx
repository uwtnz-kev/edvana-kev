// Orchestrates the grade item submission details page using focused subcomponents.
import { GradeSubmissionAttachments } from "./grades/item-submission-details/GradeSubmissionAttachments";
import { GradeSubmissionComments } from "./grades/item-submission-details/GradeSubmissionComments";
import { GradeSubmissionHeader } from "./grades/item-submission-details/GradeSubmissionHeader";
import { GradeSubmissionSummary } from "./grades/item-submission-details/GradeSubmissionSummary";
import { useGradeSubmissionState } from "./grades/item-submission-details/useGradeSubmissionState";

export default function GradeItemSubmissionDetailsView() {
  const state = useGradeSubmissionState();
  if (!state.itemId || !state.submissionId || !state.submission || !state.item) return null;

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="w-full max-w-5xl mx-auto space-y-4">
        <GradeSubmissionHeader state={state} />
        <section className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 space-y-6">
          <GradeSubmissionSummary state={state} />
          <GradeSubmissionAttachments state={state} />
          <GradeSubmissionComments state={state} />
        </section>
      </div>
    </div>
  );
}
