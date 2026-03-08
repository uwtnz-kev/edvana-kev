/**
 * AssignmentsCreateView
 * ---------------------
 * Renders the teacher dashboard teacher dashboard page content.
 */
import { useLocation, useNavigate } from "react-router-dom";
import {
  TeacherAssignmentCreateForm,
  TeacherAssignmentCreateHeader,
} from "@/dashboard/teacher/components/assignments/create";
import { Button } from "@/components/ui/button";

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

  const createState = getCreateState(location.state);

  if (!createState) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="max-w-3xl mx-auto bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center">
          <h1 className="text-[#3B240F] text-2xl font-semibold">Create Assignment</h1>
          <p className="text-[#3B240F]/70 mt-3">
            Missing subject context. Go back and choose a subject first.
          </p>
          <div className="mt-5">
            <Button
              type="button"
              onClick={() => navigate("/dashboard/teacher/assignments")}
              className="bg-white/20 hover:bg-white/30 text-[#3B240F] border border-white/20 rounded-2xl"
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
          onBack={() =>
            navigate("/dashboard/teacher/assignments", {
              state: { restoreSubjectId: createState.subjectId },
            })
          }
        />

        <TeacherAssignmentCreateForm
          subjectId={createState.subjectId}
          subjectName={createState.subjectName}
          onCancel={() =>
            navigate("/dashboard/teacher/assignments", {
              state: { restoreSubjectId: createState.subjectId },
            })
          }
          onSaved={(subjectId) =>
            navigate("/dashboard/teacher/assignments", {
              state: { restoreSubjectId: subjectId },
            })
          }
        />
      </div>
    </div>
  );
}


