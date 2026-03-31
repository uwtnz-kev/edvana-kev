/**
 * ExamsEditView
 * -------------
 * Renders the teacher dashboard teacher dashboard page content.
 */
import { ClipboardList } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  getExamById,
  seedSubjects2,
} from "@/dashboard/teacher/components/exams";
import {
  TeacherExamEditForm,
  TeacherExamEditHeader,
} from "@/dashboard/teacher/components/exams/edit";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";

type ExamsEditState = {
  restoreSubjectId?: string;
};

function getRestoreSubjectId(state: unknown, examSubject: string) {
  if (state && typeof state === "object") {
    const candidate = state as ExamsEditState;
    if (typeof candidate.restoreSubjectId === "string") {
      return candidate.restoreSubjectId;
    }
  }

  const matchedSubject = seedSubjects2.find((subject) => subject.name === examSubject);
  return matchedSubject?.id ?? null;
}

export default function ExamsEditView() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ examId: string }>();

  const examId = params.examId ?? "";
  const exam = examId ? getExamById(examId) : null;
  const restoreSubjectId = exam ? getRestoreSubjectId(location.state, exam.subject) : null;

  const goBack = () => {
    navigate({ pathname: TEACHER_ROUTES.EXAMS, search: location.search }, {
      state: { restoreSubjectId: restoreSubjectId ?? undefined },
    });
  };

  if (!exam) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="max-w-3xl mx-auto teacher-panel-surface rounded-2xl p-6 sm:p-8 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-teal-500/20 border border-white/20 flex items-center justify-center">
            <ClipboardList className="h-6 w-6 text-teal-700" />
          </div>
          <h1 className="text-[var(--text-primary)] text-2xl font-semibold mt-4">Exam not found</h1>
          <p className="text-[var(--text-secondary)] mt-3">The exam may have been deleted or the link is invalid.</p>
          <div className="mt-5">
            <Button
              type="button"
              onClick={() => navigate({ pathname: TEACHER_ROUTES.EXAMS, search: location.search })}
              className="bg-white/20 hover:bg-white/30 text-[var(--text-primary)] border border-white/20 rounded-2xl"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-4">
        <TeacherExamEditHeader subjectName={exam.subject} onBack={goBack} />

        <TeacherExamEditForm
          exam={exam}
          onCancel={goBack}
          onSaved={goBack}
        />
      </div>
    </div>
  );
}
