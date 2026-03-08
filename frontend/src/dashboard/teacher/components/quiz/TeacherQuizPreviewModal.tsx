// Orchestrates the teacher quiz preview modal using preview subcomponents.
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import type { TeacherQuiz } from "./QuizTypes";
import { QuizPreviewBody } from "./preview/QuizPreviewBody";
import { QuizPreviewFooter } from "./preview/QuizPreviewFooter";
import { QuizPreviewHeader } from "./preview/QuizPreviewHeader";

type Props = {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  quiz: TeacherQuiz | null;
};

export function TeacherQuizPreviewModal({ quiz, open, onOpenChange }: Props) {
  if (!quiz) return null;

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
            <QuizPreviewHeader title={quiz.title} />
            <DialogDescription className="sr-only">Quiz preview dialog</DialogDescription>
          </DialogHeader>
          <div className="px-6 py-6 overflow-y-auto overscroll-contain max-h-[calc(88vh-72px)]">
            <div className="space-y-6">
              <QuizPreviewBody quiz={quiz} />
              <QuizPreviewFooter onClose={() => onOpenChange(false)} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
