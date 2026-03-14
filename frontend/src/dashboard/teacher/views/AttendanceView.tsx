// Orchestrates the attendance workspace by composing extracted page sections.
import { AttendanceWorkspaceContent } from "./attendance/AttendanceWorkspaceContent";
import { AttendanceWorkspaceHeader } from "./attendance/AttendanceWorkspaceHeader";
import { useAttendanceWorkspaceState } from "./attendance/useAttendanceWorkspaceState";

export default function AttendanceView() {
  const workspace = useAttendanceWorkspaceState();

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <AttendanceWorkspaceHeader workspace={workspace} />
      <div className="mt-4">
        <AttendanceWorkspaceContent workspace={workspace} />
      </div>
    </div>
  );
}
