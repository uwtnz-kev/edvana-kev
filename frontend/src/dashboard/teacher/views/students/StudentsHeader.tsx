// View-level header wrapper for the students workspace states.
import BaseStudentsHeader from "../../components/students/StudentsHeader";

type Props = {
  selectedSubjectName?: string | null;
  onBack?: () => void;
};

export function StudentsHeader({ selectedSubjectName, onBack }: Props) {
  if (!selectedSubjectName) {
    return <BaseStudentsHeader subtitle="Choose a subject from the sidebar to view students" />;
  }

  return (
    <BaseStudentsHeader
      subtitle={`Subject: ${selectedSubjectName}`}
      showBack
      onBack={onBack}
    />
  );
}
