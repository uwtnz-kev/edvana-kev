// Renders the subject-selection empty state for the grades workspace.
import { TeacherGradesHome, TeacherGradesSubjectSidebar, type TeacherGradesSubject } from "@/dashboard/teacher/components/grades";
import { GradesWorkspaceHeader } from "../GradesWorkspaceHeader";

type Props = {
  subjects: TeacherGradesSubject[];
  selectedSubjectId: string | null;
  onSelectSubject: (value: string | null) => void;
  title: string;
  onBack: () => void;
};

export function GradesHomeContent({ subjects, selectedSubjectId, onSelectSubject, title, onBack }: Props) {
  return (
    <div className="flex w-full gap-6">
      <aside className="w-[220px] shrink-0">
        <TeacherGradesSubjectSidebar subjects={subjects} selectedSubjectId={selectedSubjectId} onSelectSubject={onSelectSubject} />
      </aside>
      <section className="min-w-0 flex-1 space-y-4">
        <GradesWorkspaceHeader title={title} subtitle="Choose a subject from the sidebar to manage grades" subjectId={null} showBack={false} canCreate={false} showCreate={false} onBack={onBack} onCreate={() => undefined} />
        <TeacherGradesHome />
      </section>
    </div>
  );
}
