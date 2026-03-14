// Renders the create-attendance form shell and footer actions.
import { Button } from "@/components/ui/button";
import { AttendanceRosterTable } from "./AttendanceRosterTable";
import { AttendanceListControls } from "./CreateAttendanceListControls";
import type { useCreateAttendanceListState } from "./useCreateAttendanceListState";

type Props = {
  state: ReturnType<typeof useCreateAttendanceListState>;
};

export function CreateAttendanceListForm({ state }: Props) {
  return (
    <div className="teacher-panel-surface rounded-2xl p-6 space-y-6">
      <AttendanceListControls
        classOptions={state.classOptions}
        classValue={state.classValue}
        date={state.date}
        onClassChange={state.setClassValue}
        onDateChange={state.setDate}
        subjectName={state.createState?.subjectName ?? ""}
      />
      {state.classValue ? <AttendanceRosterTable className={state.classValue} onStatusChange={state.onStatusChange} rows={state.rows} /> : null}
      <div className="mt-6 flex justify-end gap-4">
        <Button type="button" onClick={state.goBackToAttendanceWorkspace} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl">
          Cancel
        </Button>
        <Button type="button" disabled={!state.canGenerate} onClick={state.onSave} className="bg-white/15 hover:bg-white/30 hover:shadow-sm transition-all duration-200 text-white border border-white/20 rounded-2xl px-6">
          Save Attendance List
        </Button>
      </div>
    </div>
  );
}

