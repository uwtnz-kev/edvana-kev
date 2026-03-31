// Renders the assignments filter bar and page controls for the active subject.
import { TeacherAssignmentsControls } from "@/dashboard/teacher/components/assignments";
import type { useAssignmentsWorkspaceState } from "./useAssignmentsWorkspaceState";

type Props = { workspace: ReturnType<typeof useAssignmentsWorkspaceState> };

export function AssignmentsWorkspaceFilters({ workspace }: Props) {
  return (
    <div>
      <TeacherAssignmentsControls
        search={workspace.search}
        statusFilter={workspace.statusFilter}
        onSearchChange={workspace.setSearch}
        onStatusFilterChange={workspace.setStatusFilter}
        disabled={false}
      />
    </div>
  );
}
