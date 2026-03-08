// Renders the shared attendance page header for the create flow.
import { AttendanceHeader } from "@/dashboard/teacher/components/attendance";

type Props = {
  onBack: () => void;
  subjectId: string;
  subjectName: string;
};

export function CreateAttendanceListHeader({ onBack, subjectId, subjectName }: Props) {
  return (
    <AttendanceHeader
      title="Create Attendance List"
      subtitle={`Subject: ${subjectName}`}
      subjectId={subjectId}
      showBack
      showCreate={false}
      onBack={onBack}
      canCreate={false}
      onCreate={() => undefined}
    />
  );
}
