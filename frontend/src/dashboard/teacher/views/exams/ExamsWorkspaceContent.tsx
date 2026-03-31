// Renders the active-subject exams workspace content and pagination.
import { TeacherExamList, TeacherExamsHeader } from "@/dashboard/teacher/components/exams";
import { ExamsWorkspaceFilters } from "./ExamsWorkspaceFilters";
import { ExamsWorkspacePagination } from "./ExamsWorkspacePagination";
import type { useExamsWorkspaceState } from "./useExamsWorkspaceState";

type Props = { workspace: ReturnType<typeof useExamsWorkspaceState> };

export function ExamsWorkspaceContent({ workspace }: Props) {
  if (!workspace.selectedSubject) return null;
  return (
    <div className="flex w-full gap-6 overflow-x-hidden">
      <section className="flex-1 min-w-0 space-y-4">
        <TeacherExamsHeader title="Exams" subtitle={`Subject: ${workspace.selectedSubject.name}`} subjectName={workspace.selectedSubject.name} showBack showCreate onBack={workspace.onBack} canCreate={workspace.canCreate} onCreate={workspace.onCreate} />
        <ExamsWorkspaceFilters workspace={workspace} />
        <TeacherExamList exams={workspace.pagedExams} selectedSubject={workspace.selectedSubject} onPreview={workspace.onPreview} onPublish={workspace.onPublish} onRepublish={workspace.onRepublish} onDelete={workspace.onDelete} onCreate={workspace.onCreate} />
        <ExamsWorkspacePagination page={workspace.page} totalPages={workspace.totalPages} onPageChange={workspace.setPage} />
      </section>
    </div>
  );
}
