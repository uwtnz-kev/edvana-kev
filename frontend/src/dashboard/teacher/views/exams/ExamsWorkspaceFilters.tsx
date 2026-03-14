// Renders the exams filter bar and stats for the active subject.
import { TeacherExamsControls, TeacherExamsStats } from "@/dashboard/teacher/components/exams";
import type { useExamsWorkspaceState } from "./useExamsWorkspaceState";

type Props = { workspace: ReturnType<typeof useExamsWorkspaceState> };

export function ExamsWorkspaceFilters({ workspace }: Props) {
  return (
    <>
      <TeacherExamsStats stats={workspace.stats} />
      <TeacherExamsControls
        search={workspace.search}
        statusFilter={workspace.statusFilter}
        onSearchChange={workspace.setSearch}
        onStatusFilterChange={workspace.setStatusFilter}
        disabled={false}
      />
    </>
  );
}
