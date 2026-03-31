import { ClipboardList } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAssignmentById, republishAssignment, seedSubjects2 } from "@/dashboard/teacher/components/assignments";
import { RepublishAssignmentPage } from "@/dashboard/teacher/components/assignments/republish/RepublishAssignmentPage";
import { getRepublishEligibleStudents } from "@/dashboard/teacher/components/assignments/republish/republishHelpers";
import type { RepublishAssignmentPayload } from "@/dashboard/teacher/components/assignments/republish/republishTypes";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";

type AssignmentsRepublishState = {
  restoreSubjectId?: string;
};

function getRestoreSubjectId(state: unknown, assignmentSubject: string) {
  if (state && typeof state === "object") {
    const candidate = state as AssignmentsRepublishState;
    if (typeof candidate.restoreSubjectId === "string") {
      return candidate.restoreSubjectId;
    }
  }

  const matchedSubject = seedSubjects2.find((subject) => subject.name === assignmentSubject);
  return matchedSubject?.id ?? null;
}

export default function AssignmentsRepublishView() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ assignmentId: string }>();

  const assignmentId = params.assignmentId ?? "";
  const assignment = assignmentId ? getAssignmentById(assignmentId) : null;
  const restoreSubjectId = assignment ? getRestoreSubjectId(location.state, assignment.subject) : null;
  const eligibleStudents = assignment
    ? getRepublishEligibleStudents({ classLabel: assignment.classLabel, subject: assignment.subject, includeAssignmentRepublishDecoys: true })
    : [];

  const goBackToAssignments = () => {
    navigate(
      { pathname: TEACHER_ROUTES.ASSIGNMENTS, search: location.search },
      { state: { restoreSubjectId: restoreSubjectId ?? undefined, viewMode: "list" as const } },
    );
  };

  const handleConfirm = (payload: RepublishAssignmentPayload) => {
    if (!assignment) return;
    republishAssignment(assignment.id, payload);
    goBackToAssignments();
  };

  if (!assignment) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="mx-auto max-w-3xl rounded-2xl teacher-panel-surface p-6 text-center sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-sky-500/15 text-sky-300">
            <ClipboardList className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-white">Assignment not found</h1>
          <p className="mt-3 text-[var(--text-secondary)]">
            The assignment may have been deleted or the link is invalid.
          </p>
          <div className="mt-5">
            <Button
              type="button"
              onClick={() => navigate({ pathname: TEACHER_ROUTES.ASSIGNMENTS, search: location.search })}
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
    <RepublishAssignmentPage
      assignment={assignment}
      eligibleStudents={eligibleStudents}
      onBackToAssignments={goBackToAssignments}
      onConfirm={handleConfirm}
    />
  );
}

