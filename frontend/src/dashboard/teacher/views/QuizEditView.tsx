/**
 * QuizEditView
 * ------------
 * Renders the teacher dashboard teacher dashboard page content.
 */
import { ClipboardList } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  getQuizById,
  seedSubjects2,
} from "@/dashboard/teacher/components/quiz";
import {
  TeacherQuizEditForm,
  TeacherQuizEditHeader,
} from "@/dashboard/teacher/components/quiz/edit";

type QuizEditState = {
  restoreSubjectId?: string;
};

function getRestoreSubjectId(state: unknown, quizSubject: string) {
  if (state && typeof state === "object") {
    const candidate = state as QuizEditState;
    if (typeof candidate.restoreSubjectId === "string") {
      return candidate.restoreSubjectId;
    }
  }

  const matchedSubject = seedSubjects2.find((subject) => subject.name === quizSubject);
  return matchedSubject?.id ?? null;
}

export default function QuizEditView() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ quizId: string }>();

  const quizId = params.quizId ?? "";
  const quiz = quizId ? getQuizById(quizId) : null;
  const restoreSubjectId = quiz ? getRestoreSubjectId(location.state, quiz.subject) : null;

  const goBack = () => {
    navigate("/dashboard/teacher/quiz", {
      state: { restoreSubjectId: restoreSubjectId ?? undefined },
    });
  };

  if (!quiz) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="max-w-3xl mx-auto teacher-panel-surface rounded-2xl p-6 sm:p-8 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-teal-500/20 border border-white/20 flex items-center justify-center">
            <ClipboardList className="h-6 w-6 text-teal-700" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-white">Quiz not found</h1>
          <p className="text-[var(--text-secondary)] mt-3">The quiz may have been deleted or the link is invalid.</p>
          <div className="mt-5">
            <Button
              type="button"
              onClick={() => navigate("/dashboard/teacher/quiz")}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/20 rounded-2xl"
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
        <TeacherQuizEditHeader subjectName={quiz.subject} onBack={goBack} />

        <TeacherQuizEditForm
          quiz={quiz}
          onCancel={goBack}
          onSaved={goBack}
        />
      </div>
    </div>
  );
}



