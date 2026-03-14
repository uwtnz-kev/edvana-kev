/**
 * TeacherExamEmptyState
 * ---------------------
 * Renders the empty state for the teacher dashboard e xa ms feature.
 */
import { ClipboardList, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  message: string;
  onCreate: () => void;
  createDisabled?: boolean;
};

export function TeacherExamEmptyState({
  message,
  onCreate,
  createDisabled = false,
}: Props) {
  return (
    <div className="teacher-panel-surface rounded-2xl p-8 text-center teacher-panel-hover">
      <div className="mx-auto h-14 w-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
        <ClipboardList className="h-7 w-7 text-white" />
      </div>

      <h3 className="text-white text-xl font-semibold mt-4">No exams yet</h3>
      <p className="text-white/60 text-sm mt-2 max-w-md mx-auto">{message}</p>

      <div className="mt-5">
        <Button
          type="button"
          onClick={onCreate}
          disabled={createDisabled}
          className="bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-2xl transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Exam
        </Button>
      </div>
    </div>
  );
}



