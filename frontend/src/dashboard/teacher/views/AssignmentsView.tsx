// Orchestrates the assignments workspace by composing extracted page sections.
import { useNavigate, useSearchParams } from "react-router-dom";
import { TeacherAssignmentPreviewModal } from "@/dashboard/teacher/components/assignments";
import { getTeacherSubjectClass } from "@/dashboard/teacher/data/teacherSubjectsByClass";
import AssignmentsClassEntryView from "./AssignmentsClassEntryView";
import { AssignmentsWorkspaceContent } from "./assignments/AssignmentsWorkspaceContent";
import { AssignmentsWorkspaceHeader } from "./assignments/AssignmentsWorkspaceHeader";
import { useAssignmentsWorkspaceState } from "./assignments/useAssignmentsWorkspaceState";
import { getClassIdFromSearchParams } from "./subjects/subjectClassRouting";

export default function AssignmentsView() {
  const [searchParams] = useSearchParams();
  const selectedClassId = getClassIdFromSearchParams(searchParams);
  const selectedClass = getTeacherSubjectClass(selectedClassId);

  if (!selectedClass) {
    return <AssignmentsClassEntryView />;
  }

  return <AssignmentsScopedWorkspace classId={selectedClass.classId} />;
}

function AssignmentsScopedWorkspace({ classId }: { classId: string }) {
  const navigate = useNavigate();
  const workspace = useAssignmentsWorkspaceState(classId);

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <AssignmentsWorkspaceHeader workspace={workspace} onBackToClassEntry={() => navigate("/dashboard/teacher/assignments")} />
      <AssignmentsWorkspaceContent workspace={workspace} />
      <TeacherAssignmentPreviewModal
        assignment={workspace.previewAssignment}
        open={Boolean(workspace.previewAssignment)}
        onOpenChange={(isOpen) => {
          if (!isOpen) workspace.setPreviewId(null);
        }}
      />
    </div>
  );
}
