// Renders the footer actions shared by the assignment create form.
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onCancel: () => void;
  onSave: () => void;
};

export function TeacherAssignmentCreateActions({ onCancel, onSave }: Props) {
  return (
    <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
      <Button type="button" onClick={onCancel} className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30">
        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-500/15 text-slate-300">
          <X className="h-4 w-4" />
        </span>
        Cancel
      </Button>
      <Button type="button" onClick={onSave} className="rounded-2xl border border-white/25 bg-white/20 px-6 py-3 font-semibold text-white ring-1 ring-[#3B240F]/20 transition-colors duration-200 hover:bg-white/30">
        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-300">
          <Save className="h-4 w-4" />
        </span>
        Save Assignment
      </Button>
    </div>
  );
}

