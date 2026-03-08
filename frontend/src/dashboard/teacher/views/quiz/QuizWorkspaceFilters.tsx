// Renders the quiz filter bar and stats for the active subject.
import { TeacherQuizControls, TeacherQuizStats } from "@/dashboard/teacher/components/quiz";
import type { useQuizWorkspaceState } from "./useQuizWorkspaceState";

type Props = { workspace: ReturnType<typeof useQuizWorkspaceState> };

export function QuizWorkspaceFilters({ workspace }: Props) {
  return (
    <>
      <TeacherQuizStats stats={workspace.stats} />
      <TeacherQuizControls
        search={workspace.search}
        statusFilter={workspace.statusFilter}
        sort={workspace.sort}
        onSearchChange={workspace.setSearch}
        onStatusFilterChange={workspace.setStatusFilter}
        onSortChange={workspace.setSort}
        disabled={false}
      />
    </>
  );
}
