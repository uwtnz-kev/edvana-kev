/**
 * ExamsCreateView
 * ---------------
 * Renders the teacher dashboard teacher dashboard page content.
 */
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  TeacherExamCreateForm,
  TeacherExamCreateHeader,
} from "@/dashboard/teacher/components/exams/create";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";

type ExamsCreateState = {
  subjectId: string;
  subjectName: string;
};

function getCreateState(state: unknown): ExamsCreateState | null {
  if (!state || typeof state !== "object") {
    return null;
  }

  const candidate = state as Partial<ExamsCreateState>;
  if (typeof candidate.subjectId !== "string" || typeof candidate.subjectName !== "string") {
    return null;
  }

  return {
    subjectId: candidate.subjectId,
    subjectName: candidate.subjectName,
  };
}

export default function ExamsCreateView() {
  const navigate = useNavigate();
  const location = useLocation();

  const createState = getCreateState(location.state);

  if (!createState) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="max-w-3xl mx-auto teacher-panel-surface rounded-2xl p-6 sm:p-8 text-center">
          <h1 className="text-[var(--text-primary)] text-2xl font-semibold">Create Exam</h1>
          <p className="text-[var(--text-secondary)] mt-3">
            Missing subject context. Go back and choose a subject first.
          </p>
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
        <TeacherExamCreateHeader
          subjectName={createState.subjectName}
          onBack={() =>
            navigate({ pathname: TEACHER_ROUTES.EXAMS, search: location.search }, {
              state: { restoreSubjectId: createState.subjectId },
            })
          }
        />

        <TeacherExamCreateForm
          subjectId={createState.subjectId}
          subjectName={createState.subjectName}
          onCancel={() =>
            navigate({ pathname: TEACHER_ROUTES.EXAMS, search: location.search }, {
              state: { restoreSubjectId: createState.subjectId },
            })
          }
          onSaved={(subjectId) =>
            navigate({ pathname: TEACHER_ROUTES.EXAMS, search: location.search }, {
              state: { restoreSubjectId: subjectId },
            })
          }
        />
      </div>
    </div>
  );
}
