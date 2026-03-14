// Renders the shared footer actions for quiz creation.
import { Button } from "@/components/ui/button";

type Props = {
  onCancel: () => void;
  onSave: () => void;
};

export function TeacherQuizCreateActions({ onCancel, onSave }: Props) {
  return (
    <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
      <Button type="button" onClick={onCancel} className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30">
        Cancel
      </Button>
      <Button type="button" onClick={onSave} className="rounded-2xl border border-white/25 bg-white/20 px-6 py-3 font-semibold text-white ring-1 ring-[#3B240F]/20 transition-colors duration-200 hover:bg-white/30">
        Save Quiz
      </Button>
    </div>
  );
}

