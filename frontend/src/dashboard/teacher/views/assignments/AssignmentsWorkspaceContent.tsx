// Renders the active-subject assignments workspace content and preview actions.
import { Button } from "@/components/ui/button";
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
        {workspace.previewAssignment ? (
          <div className="teacher-panel-surface teacher-panel-hover rounded-2xl p-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="mr-2 text-sm text-white/60">Actions: {workspace.previewAssignment.title}</p>
              <Button type="button" onClick={() => workspace.onDuplicate(workspace.previewAssignment!.id)} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl">Duplicate</Button>
              <Button type="button" onClick={() => workspace.onPublish(workspace.previewAssignment!.id)} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl">Publish</Button>
              <Button type="button" onClick={() => workspace.onDelete(workspace.previewAssignment!.id)} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl">Delete</Button>
            </div>
          </div>
        ) : null}
        <TeacherAssignmentList assignments={workspace.pagedAssignments} selectedSubject={workspace.selectedSubject} onPreview={workspace.onPreview} onDuplicate={workspace.onDuplicate} onPublish={workspace.onPublish} onEdit={workspace.onEdit} onDelete={workspace.onDelete} onCreate={workspace.onCreate} />
      </section>
    </div>
  );
}

