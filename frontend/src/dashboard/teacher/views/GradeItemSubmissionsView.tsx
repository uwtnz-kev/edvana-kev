// Orchestrates the grade item submissions workspace by composing extracted sections.
import { GradeItemSubmissionsContent } from "./grades/item-submissions/GradeItemSubmissionsContent";
import { GradeItemSubmissionsHeader } from "./grades/item-submissions/GradeItemSubmissionsHeader";
import { useGradeItemSubmissionsState } from "./grades/item-submissions/useGradeItemSubmissionsState";

export default function GradeItemSubmissionsView() {
  const state = useGradeItemSubmissionsState();
  if (!state.itemId || !state.item || !state.type) return null;

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="w-full max-w-6xl mx-auto space-y-4">
        <GradeItemSubmissionsHeader state={state} />
        <GradeItemSubmissionsContent state={state} />
      </div>
    </div>
  );
}
