// Renders the quiz preview modal title.
import { DialogTitle } from "@/components/ui/dialog";

type Props = { title: string };

export function QuizPreviewHeader({ title }: Props) {
  return <DialogTitle className="text-white">{title}</DialogTitle>;
}
