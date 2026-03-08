// Renders the edit form footer actions.
import { Button } from "@/components/ui/button";

type Props = {
  onCancel: () => void;
  onSave: () => void;
};

export function AttendanceEditActions({ onCancel, onSave }: Props) {
  return (
    <div className="flex justify-end gap-3">
      <Button type="button" onClick={onCancel} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl">
        Cancel
      </Button>
      <Button type="button" onClick={onSave} className="bg-white/15 hover:bg-white/30 hover:shadow-sm transition-all duration-200 text-white border border-white/20 rounded-2xl">
        Save Changes
      </Button>
    </div>
  );
}
