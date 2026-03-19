// Switches between the attendance landing state and active subject workspace.
import { AttendanceWorkspaceFilters } from "./AttendanceWorkspaceFilters";
import { AttendanceWorkspaceHome } from "./AttendanceWorkspaceHome";
import { AttendanceWorkspaceTable } from "./AttendanceWorkspaceTable";
import type { AttendanceWorkspaceState } from "./useAttendanceWorkspaceState";

type Props = {
  workspace: AttendanceWorkspaceState;
  onBackToClassEntry: () => void;
};

export function AttendanceWorkspaceContent({ workspace, onBackToClassEntry }: Props) {
  if (!workspace.selectedSubject) return <AttendanceWorkspaceHome workspace={workspace} onBackToClassEntry={onBackToClassEntry} />;
  return (
    <div className="flex w-full gap-6 overflow-x-hidden">
      <section className="flex-1 min-w-0 space-y-4">
        <AttendanceWorkspaceFilters workspace={workspace} />
        <AttendanceWorkspaceTable workspace={workspace} />
      </section>
    </div>
  );
}
