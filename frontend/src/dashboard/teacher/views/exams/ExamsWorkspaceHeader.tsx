// Renders the exams page shell with the shared subject sidebar and page header.
import { TeacherExamsHeader, TeacherExamsHome, TeacherExamsSubjectSidebar } from "@/dashboard/teacher/components/exams";
import type { useExamsWorkspaceState } from "./useExamsWorkspaceState";

type Props = {
  workspace: ReturnType<typeof useExamsWorkspaceState>;
  onBackToClassEntry: () => void;
};

export function ExamsWorkspaceHeader({ workspace, onBackToClassEntry }: Props) {
  return (
    <div className="flex w-full gap-6 overflow-x-hidden">
      {!workspace.selectedSubject ? (
        <>
          <aside className="w-[220px] shrink-0">
            <TeacherExamsSubjectSidebar subjects={workspace.subjects} selectedSubjectId={workspace.selectedSubjectId} onSelectSubject={workspace.setSelectedSubjectId} />
          </aside>
          <section className="flex-1 min-w-0 space-y-4">
            <TeacherExamsHeader title="Exams" subtitle="Choose a subject from the sidebar to manage exams" subjectName={null} showBack showCreate={false} onBack={onBackToClassEntry} canCreate={false} onCreate={workspace.onCreate} />
            <TeacherExamsHome />
          </section>
        </>
      ) : null}
    </div>
  );
}
