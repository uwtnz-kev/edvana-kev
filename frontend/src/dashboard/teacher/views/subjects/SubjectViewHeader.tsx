// Header wrapper for the subject workspace home and selected states.
import { TeacherSubjectsHeader } from "../../components/subjects";

type Props = {
  onBack?: () => void;
  selectedSubjectName?: string | null;
};

export function SubjectViewHeader({ onBack, selectedSubjectName }: Props) {
  return (
    <TeacherSubjectsHeader
      title="Subjects"
      subtitle={selectedSubjectName ? `Subject: ${selectedSubjectName}` : "Choose a subject from the sidebar to manage it"}
      showBack={Boolean(selectedSubjectName)}
      onBack={onBack}
    />
  );
}
