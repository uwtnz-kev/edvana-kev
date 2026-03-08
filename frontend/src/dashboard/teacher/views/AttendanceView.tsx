// Orchestrates the attendance workspace by composing extracted page sections.
import {
  AttendanceMarkModal,
  ConfirmDeleteModal,
} from "@/dashboard/teacher/components/attendance";
import { AttendanceWorkspaceContent } from "./attendance/AttendanceWorkspaceContent";
import { AttendanceWorkspaceHeader } from "./attendance/AttendanceWorkspaceHeader";
import { useAttendanceWorkspaceState } from "./attendance/useAttendanceWorkspaceState";

export default function AttendanceView() {
  const workspace = useAttendanceWorkspaceState();

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <AttendanceWorkspaceHeader workspace={workspace} />
      <AttendanceWorkspaceContent workspace={workspace} />
      <AttendanceMarkModal
        open={workspace.editOpen}
        onOpenChange={workspace.onEditOpenChange}
        record={workspace.selectedRow}
        onSave={workspace.onSaveStatus}
      />
      <ConfirmDeleteModal
        open={Boolean(workspace.deleteTargetId)}
        onOpenChange={workspace.onDeleteOpenChange}
        onConfirm={workspace.onConfirmDelete}
      />
    </div>
  );
}
