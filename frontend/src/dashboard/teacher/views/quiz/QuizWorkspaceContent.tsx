// Renders the active-subject quiz workspace content and pagination.
import { TeacherQuizHeader, TeacherQuizList } from "@/dashboard/teacher/components/quiz";
import { QuizWorkspaceFilters } from "./QuizWorkspaceFilters";
import { QuizWorkspacePagination } from "./QuizWorkspacePagination";
import type { useQuizWorkspaceState } from "./useQuizWorkspaceState";

type Props = { workspace: ReturnType<typeof useQuizWorkspaceState> };

export function QuizWorkspaceContent({ workspace }: Props) {
  if (!workspace.selectedSubject) return null;

  return (
    <div className="flex w-full gap-6 overflow-x-hidden">
      <section className="min-w-0 flex-1 space-y-4">
        <TeacherQuizHeader title="Quiz" subtitle={`Subject: ${workspace.selectedSubject.name}`} subjectName={workspace.selectedSubject.name} showBack showCreate onBack={workspace.onBack} canCreate={workspace.canCreate} onCreate={workspace.onCreate} />
        <QuizWorkspaceFilters workspace={workspace} />
        <TeacherQuizList quizzes={workspace.pagedQuizzes} selectedSubject={workspace.selectedSubject} onPreview={workspace.onPreview} onPublish={workspace.onPublish} onRepublish={workspace.onRepublish} onDelete={workspace.onDelete} onCreate={workspace.onCreate} />
        <QuizWorkspacePagination page={workspace.page} totalPages={workspace.totalPages} onPageChange={workspace.setPage} />
      </section>
    </div>
  );
}
