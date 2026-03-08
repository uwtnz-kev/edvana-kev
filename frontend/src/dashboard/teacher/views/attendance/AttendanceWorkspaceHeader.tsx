// Renders the attendance page header for the selected subject state.
import AttendanceHeader from "@/dashboard/teacher/components/attendance/AttendanceHeader";
import type { AttendanceWorkspaceState } from "./useAttendanceWorkspaceState";

type Props = { workspace: AttendanceWorkspaceState };

export function AttendanceWorkspaceHeader({ workspace }: Props) {
  if (!workspace.selectedSubject) return null;
  return (
    <AttendanceHeader
      title="Attendance"
      subtitle={`Subject: ${workspace.selectedSubject.name}`}
      subjectId={workspace.selectedSubject.id}
      showBack
      showCreate
      onBack={workspace.onBack}
      canCreate
      onCreate={workspace.onCreate}
    />
  );
}
