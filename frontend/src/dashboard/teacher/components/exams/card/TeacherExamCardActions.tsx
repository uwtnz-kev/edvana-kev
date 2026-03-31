/** Renders exam card actions and keeps the local delete confirmation flow. */
import { useState } from "react";
import { Eye, RotateCcw, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { destructiveActionButtonClass, destructiveActionIconClass } from "@/dashboard/teacher/components/shared/destructiveActionStyles";
import { ConfirmDeleteModal } from "../ConfirmDeleteModal";
import type { TeacherExam } from "../ExamsTypes";
import { getExamDerivedStatus } from "../examStatus";

type Props = {
  exam: TeacherExam;
  onDelete: (id: string) => void;
  onPreview: (id: string) => void;
  onPublish: (id: string) => void;
  onRepublish: () => void;
};

const examActionButtonClass =
  "inline-flex items-center justify-center !h-8 !min-h-[2rem] !min-w-[90px] !gap-1.5 !rounded-md !px-2.5 !py-0 !text-xs font-medium";

export function TeacherExamCardActions({ exam, onDelete, onPreview, onPublish, onRepublish }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const derivedStatus = getExamDerivedStatus(exam);
  const showDraftActions = exam.status === "draft";

  return (
    <>
      <div className="flex flex-nowrap items-center gap-1.5">
        <Button type="button" onClick={() => onPreview(exam.id)} className={`${examActionButtonClass} border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/20`}><Eye className="h-3.5 w-3.5 text-sky-300" />Preview</Button>
        {showDraftActions ? <Button type="button" onClick={() => onPublish(exam.id)} className={`${examActionButtonClass} border border-white/10 bg-emerald-500/15 text-white transition-all duration-200 hover:bg-emerald-500/25`}><Send className="h-3.5 w-3.5 text-emerald-300" />Publish</Button> : null}
        {derivedStatus === "closed" ? <Button type="button" onClick={onRepublish} className={`${examActionButtonClass} border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/20`}><RotateCcw className="h-3.5 w-3.5 text-sky-300" />Republish</Button> : null}
        {showDraftActions ? <Button type="button" onClick={() => setConfirmOpen(true)} className={`${examActionButtonClass} ${destructiveActionButtonClass} transition-all duration-200`}><Trash2 className={`h-3.5 w-3.5 ${destructiveActionIconClass}`} />Delete</Button> : null}
      </div>
      <ConfirmDeleteModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete exam"
        description="Are you sure you want to delete this exam? This cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => onDelete(exam.id)}
      />
    </>
  );
}
