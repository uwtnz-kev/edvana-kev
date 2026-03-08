// Orchestrates the grade item not-submitted list using focused subcomponents.
import { GradeItemNotSubmittedControls } from "./grades/item-not-submitted/GradeItemNotSubmittedControls";
import { GradeItemNotSubmittedHeader } from "./grades/item-not-submitted/GradeItemNotSubmittedHeader";
import { GradeItemNotSubmittedTable } from "./grades/item-not-submitted/GradeItemNotSubmittedTable";
import { useGradeItemNotSubmittedState } from "./grades/item-not-submitted/useGradeItemNotSubmittedState";

export default function GradeItemNotSubmittedListView() {
  const state = useGradeItemNotSubmittedState();

  if (!state.itemId || !state.item || !state.type) {
    return null;
  }

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="w-full max-w-6xl mx-auto space-y-4">
        <GradeItemNotSubmittedHeader state={state} />
        <GradeItemNotSubmittedControls state={state} />
        <GradeItemNotSubmittedTable state={state} />
      </div>
    </div>
  );
}
