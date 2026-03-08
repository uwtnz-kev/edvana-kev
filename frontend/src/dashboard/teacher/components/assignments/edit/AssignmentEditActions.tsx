/** Renders the footer actions for the assignment edit form. */
import { Button } from "@/components/ui/button";

type Props = {
  onCancel: () => void;
  onSave: () => void;
};

export function AssignmentEditActions({ onCancel, onSave }: Props) {
  return (
    <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
      <Button type="button" onClick={onCancel} className="bg-white/20 hover:bg-white/30 text-[#3B240F] border border-white/20 rounded-2xl">Cancel</Button>
      <Button type="button" onClick={onSave} className="px-6 py-3 rounded-2xl border border-white/25 bg-white/20 text-[#3B240F] font-semibold hover:bg-white/30 transition-colors duration-200 ring-1 ring-[#3B240F]/20">Save Assignment</Button>
    </div>
  );
}
