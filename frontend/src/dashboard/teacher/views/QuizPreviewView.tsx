import { ClipboardList } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getQuizById, seedSubjects2 } from "@/dashboard/teacher/components/quiz";
import { QuizPreviewPage } from "@/dashboard/teacher/components/quiz/preview/QuizPreviewPage";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";

type QuizPreviewState = {
  restoreSubjectId?: string;
};

function getRestoreSubjectId(state: unknown, quizSubject: string) {
  if (state && typeof state === "object") {
    const candidate = state as QuizPreviewState;
    if (typeof candidate.restoreSubjectId === "string") {
      return candidate.restoreSubjectId;
    }
  }

  const matchedSubject = seedSubjects2.find((subject) => subject.name === quizSubject);
  return matchedSubject?.id ?? null;
}

export default function QuizPreviewView() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ quizId: string }>();

  const quizId = params.quizId ?? "";
  const quiz = quizId ? getQuizById(quizId) : null;
  const restoreSubjectId = quiz ? getRestoreSubjectId(location.state, quiz.subject) : null;

  const goBackToQuizzes = () => {
    navigate(
      { pathname: TEACHER_ROUTES.QUIZZES, search: location.search },
      { state: { restoreSubjectId: restoreSubjectId ?? undefined } },
    );
  };

  if (!quiz) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="mx-auto max-w-3xl rounded-2xl teacher-panel-surface p-6 text-center sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-sky-500/15 text-sky-300">
            <ClipboardList className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-white">Quiz not found</h1>
          <p className="mt-3 text-[var(--text-secondary)]">
            The quiz may have been deleted or the link is invalid.
          </p>
          <div className="mt-5">
            <Button
              type="button"
              onClick={() => navigate({ pathname: TEACHER_ROUTES.QUIZZES, search: location.search })}
              className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <QuizPreviewPage quiz={quiz} onBack={goBackToQuizzes} />;
}
