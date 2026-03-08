// Orchestrates the create-attendance workspace using focused subcomponents.
import { CreateAttendanceListEmptyState } from "./attendance/create/CreateAttendanceListEmptyState";
import { CreateAttendanceListForm } from "./attendance/create/CreateAttendanceListForm";
import { CreateAttendanceListHeader } from "./attendance/create/CreateAttendanceListHeader";
import { useCreateAttendanceListState } from "./attendance/create/useCreateAttendanceListState";

export default function CreateAttendanceListView() {
  const state = useCreateAttendanceListState();

  if (!state.createState) {
    return <CreateAttendanceListEmptyState onBack={state.goBackToAttendanceHome} />;
  }

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-4">
        <CreateAttendanceListHeader
          subjectId={state.createState.subjectId}
          subjectName={state.createState.subjectName}
          onBack={state.goBackToAttendanceWorkspace}
        />
        <CreateAttendanceListForm state={state} />
      </div>
    </div>
  );
}
