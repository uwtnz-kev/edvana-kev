// View-level header wrapper for the parents workspace states.
import BaseParentHeader from "../../components/parents/ParentHeader";

type Props = {
  onBack?: () => void;
  selectedSubjectName?: string | null;
};

export function ParentsHeader({ onBack, selectedSubjectName }: Props) {
  if (!selectedSubjectName) {
    return <BaseParentHeader subtitle="Choose a subject from the sidebar to view parents" />;
  }

  return (
    <BaseParentHeader
      subtitle={`Subject: ${selectedSubjectName}`}
      showBack
      onBack={onBack}
    />
  );
}
