// Orchestrates the grade item submitted list using focused subcomponents.
import { GradeItemSubmittedControls } from "./grades/item-submitted/GradeItemSubmittedControls";
import { GradeItemSubmittedHeader } from "./grades/item-submitted/GradeItemSubmittedHeader";
import { GradeItemSubmittedTable } from "./grades/item-submitted/GradeItemSubmittedTable";
import { useGradeItemSubmittedState } from "./grades/item-submitted/useGradeItemSubmittedState";

export default function GradeItemSubmittedListView() {
  const state = useGradeItemSubmittedState();

  if (!state.itemId || !state.item || !state.type) {
    return null;
  }

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="w-full max-w-6xl mx-auto space-y-4">
        <GradeItemSubmittedHeader state={state} />
        <GradeItemSubmittedControls state={state} />
        <GradeItemSubmittedTable state={state} />
      </div>
    </div>
  );
}
