// Right-side subject content shell for the selected subject landing state.
import { BookOpen } from "lucide-react";
import { TeacherSubjectsHome } from "../../components/subjects";
import type { SubjectWorkspaceData } from "./subjectWorkspaceData";

type Props = {
  selectedSubjectData: SubjectWorkspaceData | null;
  selectedSubjectTheme: { bgClass: string; iconClass: string } | null;
};

export function SubjectContentShell({ selectedSubjectData, selectedSubjectTheme }: Props) {
  if (!selectedSubjectData) return <TeacherSubjectsHome />;

  return (
    <section className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${selectedSubjectTheme?.bgClass ?? "bg-white/10"}`}>
          <BookOpen className={`h-6 w-6 ${selectedSubjectTheme?.iconClass ?? "text-white"}`} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1EA896]">Subject Workspace</p>
          <h2 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{selectedSubjectData.title}</h2>
          <p className="mt-1 text-sm text-[var(--text-primary)]/70">Choose Modules, Create Module, or Upload Module from the left to open the dedicated subject page.</p>
        </div>
      </div>
    </section>
  );
}
