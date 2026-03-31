// Renders the active-subject assignments workspace content and preview actions.
import { TeacherAssignmentList, TeacherAssignmentsHeader } from "@/dashboard/teacher/components/assignments";
import { AssignmentsWorkspaceFilters } from "./AssignmentsWorkspaceFilters";
import { AssignmentsWorkspacePagination } from "./AssignmentsWorkspacePagination";
import type { useAssignmentsWorkspaceState } from "./useAssignmentsWorkspaceState";

type Props = { workspace: ReturnType<typeof useAssignmentsWorkspaceState> };

export function AssignmentsWorkspaceContent({ workspace }: Props) {
  if (!workspace.selectedSubject) return null;
  return (
    <div className="flex w-full overflow-x-hidden">
      <section className="min-w-0 flex-1 space-y-5">
        <TeacherAssignmentsHeader title="Assignments" subtitle={`Subject: ${workspace.selectedSubject.name}`} subjectId={workspace.selectedSubject.id} showBack showCreate onBack={workspace.onBack} canCreate onCreate={workspace.onCreate} />
        <div className="space-y-4">
          <AssignmentsWorkspaceFilters workspace={workspace} />
          <AssignmentsWorkspacePagination page={workspace.page} totalPages={workspace.totalPages} onPageChange={workspace.setPage} />
        </div>
        <TeacherAssignmentList assignments={workspace.pagedAssignments} selectedSubject={workspace.selectedSubject} onPreview={workspace.onPreview} onDuplicate={workspace.onDuplicate} onPublish={workspace.onPublish} onRepublish={workspace.onRepublish} onEdit={workspace.onEdit} onDelete={workspace.onDelete} onCreate={workspace.onCreate} />
      </section>
    </div>
  );
}
