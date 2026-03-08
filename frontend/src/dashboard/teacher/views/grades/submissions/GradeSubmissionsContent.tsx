// Renders the filters and submissions table for the grade submissions workspace.
import { GradeSubmissionsFilters } from "./GradeSubmissionsFilters";
import { GradeSubmissionsTable } from "./GradeSubmissionsTable";
import type { useGradeSubmissionsState } from "./useGradeSubmissionsState";

type Props = { state: ReturnType<typeof useGradeSubmissionsState> };

export function GradeSubmissionsContent({ state }: Props) {
  return (
    <>
      <GradeSubmissionsFilters state={state} />
      <GradeSubmissionsTable state={state} />
    </>
  );
}
