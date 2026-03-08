// Wraps the shared grades header so the view shell stays focused on orchestration.
import { TeacherGradesHeader } from "@/dashboard/teacher/components/grades";

type Props = {
  title: string;
  subtitle: string;
  subjectId?: string | null;
  showBack: boolean;
  showCreate: boolean;
  canCreate: boolean;
  onBack: () => void;
  onCreate: () => void;
};

export function GradesWorkspaceHeader(props: Props) {
  return (
    <TeacherGradesHeader
      title={props.title}
      subtitle={props.subtitle}
      subjectId={props.subjectId}
      showBack={props.showBack}
      showCreate={props.showCreate}
      onBack={props.onBack}
      canCreate={props.canCreate}
      onCreate={props.onCreate}
    />
  );
}
