/**
 * QuizCreateView
 * --------------
 * Renders the teacher dashboard teacher dashboard page content.
 */
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  TeacherQuizCreateForm,
  TeacherQuizCreateHeader,
} from "@/dashboard/teacher/components/quiz/create";

type QuizCreateState = {
  subjectId: string;
  subjectName: string;
};

function getCreateState(state: unknown): QuizCreateState | null {
  if (!state || typeof state !== "object") {
    return null;
  }

  const candidate = state as Partial<QuizCreateState>;
  if (typeof candidate.subjectId !== "string" || typeof candidate.subjectName !== "string") {
    return null;
  }

  return {
    subjectId: candidate.subjectId,
    subjectName: candidate.subjectName,
  };
}

export default function QuizCreateView() {
  const navigate = useNavigate();
  const location = useLocation();

  const createState = getCreateState(location.state);

  if (!createState) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="max-w-3xl mx-auto teacher-panel-surface rounded-2xl p-6 sm:p-8 text-center">
          <h1 className="text-[var(--text-primary)] text-2xl font-semibold">Create Quiz</h1>
          <p className="text-[var(--text-secondary)] mt-3">
            Missing subject context. Go back and choose a subject first.
          </p>
          <div className="mt-5">
            <Button
              type="button"
              onClick={() => navigate("/dashboard/teacher/quiz")}
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
        <TeacherQuizCreateHeader
          subjectName={createState.subjectName}
          onBack={() =>
            navigate("/dashboard/teacher/quiz", {
              state: { restoreSubjectId: createState.subjectId },
            })
          }
        />

        <TeacherQuizCreateForm
          subjectId={createState.subjectId}
          subjectName={createState.subjectName}
          onCancel={() =>
            navigate("/dashboard/teacher/quiz", {
              state: { restoreSubjectId: createState.subjectId },
            })
          }
          onSaved={(subjectId) =>
            navigate("/dashboard/teacher/quiz", {
              state: { restoreSubjectId: subjectId },
            })
          }
        />
      </div>
    </div>
  );
}





