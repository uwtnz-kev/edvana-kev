// Renders the quiz page shell with the shared subject sidebar and page header.
import { TeacherQuizHeader, TeacherQuizHome, TeacherQuizSubjectSidebar } from "@/dashboard/teacher/components/quiz";
import type { useQuizWorkspaceState } from "./useQuizWorkspaceState";

type Props = {
  workspace: ReturnType<typeof useQuizWorkspaceState>;
  onBackToClassEntry: () => void;
};

export function QuizWorkspaceHeader({ workspace, onBackToClassEntry }: Props) {
  return (
    <div className="flex w-full gap-6 overflow-x-hidden">
      {!workspace.selectedSubject ? (
        <>
          <aside className="w-[220px] shrink-0">
            <TeacherQuizSubjectSidebar subjects={workspace.subjects} selectedSubjectId={workspace.selectedSubjectId} onSelectSubject={workspace.setSelectedSubjectId} />
          </aside>
          <section className="flex-1 min-w-0 space-y-4">
            <TeacherQuizHeader title="Quiz" subtitle="Choose a subject from the sidebar to manage quizzes" subjectName={null} showBack showCreate={false} onBack={onBackToClassEntry} canCreate={false} onCreate={workspace.onCreate} />
            <TeacherQuizHome />
          </section>
        </>
      ) : null}
    </div>
  );
}
