import * as React from "react";
import { X, Clock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { TeacherQuiz } from "./teacherQuizTypes";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quiz: TeacherQuiz | null;
};

export default function QuizPreviewModal(props: Props) {
  const q = props.quiz;

  const close = React.useCallback(() => {
    props.onOpenChange(false);
  }, [props]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
  };

  const createdLabel = q?.createdAt ? new Date(q.createdAt).toLocaleDateString() : "";
  const publishedLabel =
    q?.status === "published" && q.publishedTo?.length ? q.publishedTo.join(", ") : "";

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent
        className={cn(
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[calc(100vw-2rem)] sm:w-full max-w-5xl",
          "max-h-[85vh] overflow-hidden",
          "bg-white/15 backdrop-blur-xl border border-white/20 text-white",
          "p-0",
          "[&>button]:hidden"
        )}
        onKeyDown={handleKeyDown}
      >
        <div className="flex flex-col max-h-[85vh]">
          <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-white/20">
            <div className="space-y-1 min-w-0">
              <div className="text-sm text-white/70">Preview</div>
              <DialogTitle className="text-white text-xl font-semibold truncate">
                {q?.title ?? "Quiz"}
              </DialogTitle>
              <div className="text-sm text-white/70 truncate">
                {q ? `${q.subject} • ${q.grade}` : ""}
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={close}
              className="text-white hover:bg-white/20 rounded-xl"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogHeader>

          <div className="px-6 py-6 overflow-y-auto overscroll-contain max-h-[calc(85vh-72px)]">
            {!q ? (
              <div className="text-white/70">No quiz selected.</div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/10 border border-white/10 px-3 py-1 rounded-full text-xs text-white/80">
                    {q.type}
                  </span>
                  <span className="bg-white/10 border border-white/10 px-3 py-1 rounded-full text-xs text-white/80">
                    {q.difficulty}
                  </span>
                  <span className="bg-white/10 border border-white/10 px-3 py-1 rounded-full text-xs text-white/80">
                    {q.totalQuestions} questions
                  </span>
                  <span className="bg-white/10 border border-white/10 px-3 py-1 rounded-full text-xs text-white/80 inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> ~{q.estimatedTime} min
                  </span>
                  <span
                    className={cn(
                      "border px-3 py-1 rounded-full text-xs",
                      q.status === "published"
                        ? "bg-emerald-500/20 text-emerald-100 border-emerald-500/20"
                        : "bg-white/10 text-white/80 border-white/10"
                    )}
                  >
                    {q.status === "published" ? "Published" : "Draft"}
                  </span>
                  {createdLabel ? (
                    <span className="bg-white/10 border border-white/10 px-3 py-1 rounded-full text-xs text-white/70">
                      Created {createdLabel}
                    </span>
                  ) : null}
                </div>

                {q.status === "published" && publishedLabel ? (
                  <div className="text-sm text-white/70">
                    Published to{" "}
                    <span className="text-white/90 font-medium">{publishedLabel}</span>
                  </div>
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                    <div className="text-sm text-white/60">Subject</div>
                    <div className="mt-2 text-white font-semibold">{q.subject}</div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                    <div className="text-sm text-white/60">Grade</div>
                    <div className="mt-2 text-white font-semibold">{q.grade}</div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                    <div className="text-sm text-white/60">Quiz type</div>
                    <div className="mt-2 text-white font-semibold">{q.type}</div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                    <div className="text-sm text-white/60">Difficulty</div>
                    <div className="mt-2 text-white font-semibold">{q.difficulty}</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                  <div className="text-sm text-white/60">Quiz preview</div>
                  <div className="mt-2 text-white/85 font-semibold">
                    Replace this section later with real question rendering.
                  </div>
                  <div className="mt-1 text-white/60 text-sm">
                    When your quiz model includes questions, show the first few here and add a
                    View full quiz action.
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-white/20">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={close}
                    className="text-white hover:bg-white/20 rounded-xl"
                  >
                    Close
                  </Button>

                  {q.status === "published" ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-100 border border-emerald-500/20">
                      <Trophy className="h-4 w-4" />
                      Published
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white/70 border border-white/10">
                      Draft
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}