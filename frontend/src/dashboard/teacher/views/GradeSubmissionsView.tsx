// Orchestrates the grade submissions workspace by composing extracted sections.
import { GradeSubmissionsContent } from "./grades/submissions/GradeSubmissionsContent";
import { GradeSubmissionsHeader } from "./grades/submissions/GradeSubmissionsHeader";
import { useGradeSubmissionsState } from "./grades/submissions/useGradeSubmissionsState";

export default function GradeSubmissionsView() {
  const state = useGradeSubmissionsState();
  if (!state.selectedGradeType) return null;

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="w-full max-w-6xl mx-auto space-y-4">
        <section className="w-full space-y-4">
          <GradeSubmissionsHeader state={state} />
          <GradeSubmissionsContent state={state} />
        </section>
      </div>
    </div>
  );
}
