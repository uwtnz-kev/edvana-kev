// View-level header wrapper for the parents workspace states.
import BaseParentHeader from "../../components/parents/ParentHeader";

type Props = {
  onBack?: () => void;
  selectedSubjectName?: string | null;
  showBack?: boolean;
};

export function ParentsHeader({ onBack, selectedSubjectName, showBack = false }: Props) {
  if (!selectedSubjectName) {
    return <BaseParentHeader subtitle="Choose a subject from the sidebar to view parents" showBack={showBack} onBack={onBack} />;
  }

  return (
    <BaseParentHeader
      subtitle={`Subject: ${selectedSubjectName}`}
      showBack
      onBack={onBack}
    />
  );
}
