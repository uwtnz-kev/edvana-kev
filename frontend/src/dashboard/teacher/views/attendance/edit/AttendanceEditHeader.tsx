// Renders the shared attendance header for the edit workflow.
import { AttendanceHeader } from "@/dashboard/teacher/components/attendance";

type Props = {
  onBack: () => void;
  restoreSubjectId: string | null;
  subjectName: string;
};

export function AttendanceEditHeader({ onBack, restoreSubjectId, subjectName }: Props) {
  return (
    <AttendanceHeader
      title="Edit Attendance"
      subtitle={`Subject: ${subjectName}`}
      subjectId={restoreSubjectId}
      showBack
      showCreate={false}
      onBack={onBack}
      canCreate={false}
      onCreate={() => undefined}
    />
  );
}
