/** Renders the title area for the assignment preview modal. */
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
  title: string;
};

export function AssignmentPreviewHeader({ title }: Props) {
  return (
    <DialogHeader className="px-6 py-4 border-b border-white/20">
      <DialogTitle className="text-white">{title}</DialogTitle>
      <DialogDescription className="sr-only">Assignment 2 preview dialog</DialogDescription>
    </DialogHeader>
  );
}
