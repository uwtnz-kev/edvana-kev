// Renders filters and tables for item-level submissions.
import { GradeItemSubmissionsFilters } from "./GradeItemSubmissionsFilters";
import { GradeItemSubmissionsTable } from "./GradeItemSubmissionsTable";
import type { useGradeItemSubmissionsState } from "./useGradeItemSubmissionsState";

type Props = { state: ReturnType<typeof useGradeItemSubmissionsState> };

export function GradeItemSubmissionsContent({ state }: Props) {
  return (
    <>
      <GradeItemSubmissionsFilters state={state} />
      <GradeItemSubmissionsTable state={state} />
    </>
  );
}
