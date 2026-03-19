// Orchestrates the assignments workspace by composing extracted page sections.
import { ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TeacherAssignmentPreviewModal } from "@/dashboard/teacher/components/assignments";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { AssignmentsWorkspaceContent } from "./assignments/AssignmentsWorkspaceContent";
import { AssignmentsWorkspaceHeader } from "./assignments/AssignmentsWorkspaceHeader";
import { useAssignmentsWorkspaceState } from "./assignments/useAssignmentsWorkspaceState";
import { TeacherFeatureClassEntryGate } from "./shared/TeacherFeatureClassEntryGate";

export default function AssignmentsView() {
  const entryTheme = getSubjectThemeById("");

  return (
    <TeacherFeatureClassEntryGate
      entryPath="/dashboard/teacher/assignments"
      featureKey="assignments"
      title="Assignments"
      subtitle="Choose a class to open the assignments workspace"
      icon={ClipboardList}
      infoCardClassName="transition-all duration-200 hover:-translate-y-[2px] hover:bg-white/10 hover:shadow-lg"
      renderHeaderIcon={({ Icon }) => (
        <div className={`h-12 w-12 rounded-xl p-3 flex items-center justify-center ${entryTheme.bgClass}`}>
          <Icon className={`h-6 w-6 ${entryTheme.iconClass}`} />
        </div>
      )}
    >
      {({ classId, onBackToEntry }) => <AssignmentsScopedWorkspace classId={classId} onBackToEntry={onBackToEntry} />}
    </TeacherFeatureClassEntryGate>
  );
}

function AssignmentsScopedWorkspace({ classId, onBackToEntry }: { classId: string; onBackToEntry: () => void }) {
  const navigate = useNavigate();
  const workspace = useAssignmentsWorkspaceState(classId);

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <AssignmentsWorkspaceHeader workspace={workspace} onBackToClassEntry={onBackToEntry} />
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
