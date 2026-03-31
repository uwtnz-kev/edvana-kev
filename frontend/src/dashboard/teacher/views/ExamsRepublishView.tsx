import { ClipboardList } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getRepublishEligibleStudents } from "@/dashboard/teacher/components/assignments/republish/republishHelpers";
import type { RepublishAssignmentPayload } from "@/dashboard/teacher/components/assignments/republish/republishTypes";
import { getExamById, republishExam, seedSubjects2 } from "@/dashboard/teacher/components/exams";
import { RepublishExamPage } from "@/dashboard/teacher/components/exams/republish/RepublishExamPage";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";

type ExamsRepublishState = {
  restoreSubjectId?: string;
};

function getRestoreSubjectId(state: unknown, examSubject: string) {
  if (state && typeof state === "object") {
    const candidate = state as ExamsRepublishState;
    if (typeof candidate.restoreSubjectId === "string") {
      return candidate.restoreSubjectId;
    }
  }

  const matchedSubject = seedSubjects2.find((subject) => subject.name === examSubject);
  return matchedSubject?.id ?? null;
}

export default function ExamsRepublishView() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ examId: string }>();

  const examId = params.examId ?? "";
  const exam = examId ? getExamById(examId) : null;
  const restoreSubjectId = exam ? getRestoreSubjectId(location.state, exam.subject) : null;
  const eligibleStudents = exam
    ? getRepublishEligibleStudents({ classLabel: exam.classLabel, subject: exam.subject })
    : [];

  const goBackToExams = () => {
    navigate(
      { pathname: TEACHER_ROUTES.EXAMS, search: location.search },
      { state: { restoreSubjectId: restoreSubjectId ?? undefined } },
    );
  };

  const handleConfirm = (payload: RepublishAssignmentPayload) => {
    if (!exam) return;
    republishExam(exam.id, payload);
    goBackToExams();
  };

  if (!exam) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="mx-auto max-w-3xl rounded-2xl teacher-panel-surface p-6 text-center sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-sky-500/15 text-sky-300">
            <ClipboardList className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-white">Exam not found</h1>
          <p className="mt-3 text-[var(--text-secondary)]">
            The exam may have been deleted or the link is invalid.
          </p>
          <div className="mt-5">
            <Button
              type="button"
              onClick={() => navigate({ pathname: TEACHER_ROUTES.EXAMS, search: location.search })}
              className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <RepublishExamPage
      exam={exam}
      eligibleStudents={eligibleStudents}
      onBackToExams={goBackToExams}
      onConfirm={handleConfirm}
    />
  );
}
