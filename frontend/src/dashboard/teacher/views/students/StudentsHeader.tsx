// View-level header wrapper for the students workspace states.
import BaseStudentsHeader from "../../components/students/StudentsHeader";

type Props = {
  selectedSubjectName?: string | null;
  onBack?: () => void;
  showBack?: boolean;
};

export function StudentsHeader({ selectedSubjectName, onBack, showBack = false }: Props) {
  if (!selectedSubjectName) {
    return <BaseStudentsHeader subtitle="Choose a subject from the sidebar to view students" showBack={showBack} onBack={onBack} />;
  }

  return (
    <BaseStudentsHeader
      subtitle={`Subject: ${selectedSubjectName}`}
      showBack
      onBack={onBack}
    />
  );
}
