// Header wrapper for the subject workspace home and selected states.
import type { SubjectTheme } from "@/dashboard/teacher/components/shared";
import { TeacherSubjectsHeader } from "../../components/subjects";

type Props = {
  onBack?: () => void;
  selectedSubjectName?: string | null;
  selectedSubjectTheme?: SubjectTheme | null;
};

export function SubjectViewHeader({ onBack, selectedSubjectName, selectedSubjectTheme }: Props) {
  return (
    <TeacherSubjectsHeader
      title="Subjects"
      subtitle={selectedSubjectName ? `Subject: ${selectedSubjectName}` : "Choose a subject from the sidebar to manage it"}
      showBack={Boolean(selectedSubjectName)}
      onBack={onBack}
      theme={selectedSubjectTheme ?? undefined}
    />
  );
}
