// Orchestrates the grade submission details page using extracted workspace modules.
import { Button } from "@/components/ui/button";
import {
  GradeSubmissionAttachmentsPanel,
  GradeSubmissionDetailsHeader,
  GradeSubmissionRubricPanel,
  GradeSubmissionSummaryCard,
  useGradeSubmissionDetailsState,
} from "./grades/submission-details";

export default function GradeSubmissionDetailsView() {
  const state = useGradeSubmissionDetailsState();

  if (!state.submission) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="max-w-4xl mx-auto bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 space-y-4">
          <p className="text-white">Submission not found.</p>
          <Button
            type="button"
            onClick={state.backToSubmissions}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl"
          >
            Back to submissions
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-4">
        <GradeSubmissionDetailsHeader state={state} />

        <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 space-y-6">
          <GradeSubmissionSummaryCard state={state} />
          <GradeSubmissionRubricPanel state={state} />
          <GradeSubmissionAttachmentsPanel state={state} />
        </div>
      </div>
    </div>
  );
}
