// Orchestrates the assignments workspace by composing extracted page sections.
import { TeacherAssignmentPreviewModal } from "@/dashboard/teacher/components/assignments";
import { AssignmentsWorkspaceContent } from "./assignments/AssignmentsWorkspaceContent";
import { AssignmentsWorkspaceHeader } from "./assignments/AssignmentsWorkspaceHeader";
import { useAssignmentsWorkspaceState } from "./assignments/useAssignmentsWorkspaceState";

export default function AssignmentsView() {
  const workspace = useAssignmentsWorkspaceState();

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <AssignmentsWorkspaceHeader workspace={workspace} />
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
