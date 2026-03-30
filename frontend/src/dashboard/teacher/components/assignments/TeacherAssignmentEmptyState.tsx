/**
 * TeacherAssignmentEmptyState
 * ---------------------------
 * Renders the empty state for the teacher dashboard a ss ig nm en ts feature.
 */
import { ClipboardList, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  message: string;
  onCreate: () => void;
  createDisabled?: boolean;
};

export function TeacherAssignmentEmptyState({
  message,
  onCreate,
  createDisabled = false,
}: Props) {
  return (
    <div className="teacher-panel-surface rounded-2xl border border-white/10 p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
        <ClipboardList className="h-7 w-7 text-white" />
      </div>

      <h3 className="mt-4 text-xl font-semibold text-white">No assignments yet</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-white/60">{message}</p>

      <div className="mt-5">
        <Button
          type="button"
          onClick={onCreate}
          disabled={createDisabled}
          className="bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-2xl"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Assignment
        </Button>
      </div>
    </div>
  );
}



