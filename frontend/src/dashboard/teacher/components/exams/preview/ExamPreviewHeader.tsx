// Renders the exam preview modal title.
import { DialogTitle } from "@/components/ui/dialog";

type Props = { title: string };

export function ExamPreviewHeader({ title }: Props) {
  return <DialogTitle className="text-white">{title}</DialogTitle>;
}
