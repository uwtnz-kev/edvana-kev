// Orchestrates the attendance edit workspace using focused subcomponents.
import { AttendanceEditEmptyState } from "./attendance/edit/AttendanceEditEmptyState";
import { AttendanceEditForm } from "./attendance/edit/AttendanceEditForm";
import { AttendanceEditHeader } from "./attendance/edit/AttendanceEditHeader";
import { useAttendanceEditState } from "./attendance/edit/useAttendanceEditState";

export default function AttendanceEditView() {
  const state = useAttendanceEditState();

  if (!state.record) {
    return <AttendanceEditEmptyState onBack={state.goBackToAttendanceHome} />;
  }

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-4">
        <AttendanceEditHeader
          onBack={state.goBackToAttendanceWorkspace}
          restoreSubjectId={state.restoreSubjectId}
          subjectName={state.record.subjectName}
        />
        <AttendanceEditForm state={state} />
      </div>
    </div>
  );
}
