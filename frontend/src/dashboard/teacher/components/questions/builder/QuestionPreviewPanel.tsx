// Renders the builder footer actions and unsaved-changes confirmation dialog.
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  totalPoints: number;
  onCancel: () => void;
  onConfirmBack: () => void;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
};

export function QuestionPreviewPanel({
  open,
  totalPoints,
  onCancel,
  onConfirmBack,
  onOpenChange,
  onSave,
}: Props) {
  return (
    <>
      <section className="rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--text-secondary)]">Total Points: <span className="font-semibold text-white">{totalPoints}</span></p>
          <div className="flex items-center gap-3">
            <Button type="button" onClick={onCancel} className="rounded-2xl border border-white/25 bg-white/20 text-white hover:bg-white/30">Cancel</Button>
            <Button type="button" onClick={onSave} className="rounded-2xl border border-white/25 bg-white/20 px-6 text-white hover:bg-white/30">Save</Button>
          </div>
        </div>
      </section>

      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="rounded-2xl border border-white/25 bg-[#1b2430]/95 text-white backdrop-blur-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription className="text-[var(--text-secondary)]">You have unsaved changes. If you proceed, your changes will not be saved.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-2xl border border-white/20 bg-white/10 text-white hover:bg-white/20">No</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmBack} className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30">Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
