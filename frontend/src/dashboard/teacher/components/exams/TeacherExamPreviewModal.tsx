// Orchestrates the teacher exam preview modal using preview subcomponents.
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import type { TeacherExam } from "./examsTypes";
import { ExamPreviewBody } from "./preview/ExamPreviewBody";
import { ExamPreviewFooter } from "./preview/ExamPreviewFooter";
import { ExamPreviewHeader } from "./preview/ExamPreviewHeader";

type Props = {
  exam: TeacherExam | null;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

export function TeacherExamPreviewModal({ exam, open, onOpenChange }: Props) {
  if (!exam) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={[
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[calc(100vw-2rem)] sm:w-full max-w-6xl",
          "max-h-[88vh] overflow-hidden",
          "bg-white/15 backdrop-blur-xl border border-white/25 text-white rounded-2xl shadow-xl",
          "p-0",
        ].join(" ")}
      >
        <div className="flex flex-col max-h-[88vh]">
          <DialogHeader className="px-6 py-4 border-b border-white/20">
            <ExamPreviewHeader title={exam.title} />
            <DialogDescription className="sr-only">Exam 2 preview dialog</DialogDescription>
          </DialogHeader>
          <div className="px-6 py-6 overflow-y-auto overscroll-contain max-h-[calc(88vh-72px)]">
            <div className="space-y-6">
              <ExamPreviewBody exam={exam} />
              <ExamPreviewFooter onClose={() => onOpenChange(false)} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
