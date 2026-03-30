/**
 * AssignmentsCreateView
 * ---------------------
 * Renders the teacher dashboard teacher dashboard page content.
 */
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  TeacherAssignmentCreateForm,
  TeacherAssignmentCreateHeader,
} from "@/dashboard/teacher/components/assignments/create";
import { getTeacherSubjectClass } from "@/dashboard/teacher/data/teacherSubjectsByClass";
import { Button } from "@/components/ui/button";
import { getClassIdFromSearchParams } from "./subjects/subjectClassRouting";

type AssignmentsCreateState = {
  subjectId: string;
  subjectName: string;
};

function getCreateState(state: unknown): AssignmentsCreateState | null {
  if (!state || typeof state !== "object") {
    return null;
  }

  const candidate = state as Partial<AssignmentsCreateState>;
  if (typeof candidate.subjectId !== "string" || typeof candidate.subjectName !== "string") {
    return null;
  }

  return {
    subjectId: candidate.subjectId,
    subjectName: candidate.subjectName,
  };
}

export default function AssignmentsCreateView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const createState = getCreateState(location.state);
  const classId = getClassIdFromSearchParams(searchParams);
  const selectedClass = getTeacherSubjectClass(classId);
  const goToAssignmentsWorkspace = (restoreSubjectId?: string, classRouteId?: string) =>
    navigate(
      { pathname: "/dashboard/teacher/assignments", search: classRouteId ? `?classId=${encodeURIComponent(classRouteId)}` : location.search },
      restoreSubjectId ? { state: { restoreSubjectId, viewMode: "workspace" as const } } : undefined,
    );
  const goToAssignmentsList = (restoreSubjectId: string, classRouteId: string) =>
    navigate(
      { pathname: "/dashboard/teacher/assignments", search: `?classId=${encodeURIComponent(classRouteId)}` },
      { state: { restoreSubjectId, viewMode: "list" as const } },
    );

  if (!createState) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="max-w-3xl mx-auto teacher-panel-surface rounded-2xl p-6 sm:p-8 text-center">
          <h1 className="text-[var(--text-primary)] text-2xl font-semibold">Create Assignment</h1>
          <p className="text-[var(--text-secondary)] mt-3">
            Missing subject context. Go back and choose a subject first.
          </p>
          <div className="mt-5">
            <Button
              type="button"
              onClick={() => goToAssignmentsWorkspace()}
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
        <TeacherAssignmentCreateHeader
          subjectName={createState.subjectName}
          onBack={() => goToAssignmentsWorkspace(createState.subjectId)}
        />

        <TeacherAssignmentCreateForm
          subjectId={createState.subjectId}
          subjectName={createState.subjectName}
          lockedClassId={selectedClass?.classId}
          lockedClassLabel={selectedClass?.classLabel}
          onCancel={() => goToAssignmentsWorkspace(createState.subjectId)}
          onSaved={(subjectId, classRouteId) => goToAssignmentsList(subjectId, classRouteId)}
        />
      </div>
    </div>
  );
}
