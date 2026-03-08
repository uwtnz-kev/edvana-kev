// Renders a submitted-item table row with its view action.
import { Button } from "@/components/ui/button";
import type { TeacherGradeSubmission } from "@/dashboard/teacher/components/grades";
import { formatSubmissionScore } from "../gradeItemSubmittedHelpers";

type Props = {
  onView: (submissionId: string) => void;
  submission: TeacherGradeSubmission;
};

export function GradeItemSubmittedRow({ onView, submission }: Props) {
  return (
    <tr className="border-t border-white/10">
      <td className="px-4 py-3">{submission.studentName}</td>
      <td className="px-4 py-3">{submission.className}</td>
      <td className="px-4 py-3">{submission.status}</td>
      <td className="px-4 py-3">{formatSubmissionScore(submission)}</td>
      <td className="px-4 py-3">
        <Button
          type="button"
          onClick={() => onView(submission.id)}
          className="h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white"
        >
          View
        </Button>
      </td>
    </tr>
  );
}
