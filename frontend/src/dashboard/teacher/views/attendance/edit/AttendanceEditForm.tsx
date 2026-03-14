// Renders the attendance edit card shell and its controls.
import type { useAttendanceEditState } from "./useAttendanceEditState";
import { AttendanceEditActions } from "./AttendanceEditActions";
import { AttendanceEditFields } from "./AttendanceEditFields";

type Props = {
  state: ReturnType<typeof useAttendanceEditState>;
};

export function AttendanceEditForm({ state }: Props) {
  if (!state.record) return null;

  return (
    <div className="teacher-panel-surface rounded-2xl p-6 space-y-4">
      <div>
        <p className="text-[var(--text-primary)] font-semibold">{state.record.studentName}</p>
        <p className="text-[var(--text-secondary)] text-sm mt-1">{state.record.className} - {state.record.date}</p>
      </div>
      <AttendanceEditFields note={state.note} setNote={state.setNote} setStatus={state.setStatus} status={state.status} />
      <AttendanceEditActions onCancel={state.goBackToAttendanceWorkspace} onSave={state.onSave} />
    </div>
  );
}


