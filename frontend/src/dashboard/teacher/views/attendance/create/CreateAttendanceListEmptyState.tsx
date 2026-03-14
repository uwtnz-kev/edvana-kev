// Renders the fallback state when route subject context is missing.
import { Button } from "@/components/ui/button";

type Props = {
  onBack: () => void;
};

export function CreateAttendanceListEmptyState({ onBack }: Props) {
  return (
    <div className="w-full p-4 sm:p-6">
      <div className="max-w-3xl mx-auto teacher-panel-surface rounded-2xl p-6 sm:p-8 text-center">
        <h1 className="text-[var(--text-primary)] text-2xl font-semibold">Create Attendance List</h1>
        <p className="text-[var(--text-secondary)] mt-3">Missing subject context. Go back and choose a subject first.</p>
        <div className="mt-5">
          <Button type="button" onClick={onBack} className="bg-white/20 hover:bg-white/30 text-[var(--text-primary)] border border-white/20 rounded-2xl">
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}


