/** Renders exam card actions and keeps the local delete confirmation flow. */
import { useState } from "react";
import { AssessmentCardActions } from "@/dashboard/teacher/components/shared/assessment/AssessmentCardActions";
import { ConfirmDeleteModal } from "../ConfirmDeleteModal";
import type { TeacherExam } from "../ExamsTypes";

type Props = {
  exam: TeacherExam;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onEdit: (id: string) => void;
  onPreview: (id: string) => void;
  onPublish: (id: string) => void;
  onRepublish: () => void;
};

export function TeacherExamCardActions({ exam, onDelete, onDuplicate, onEdit, onPreview, onPublish, onRepublish }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const publishDisabled = exam.status === "published" || exam.status === "closed";

  return (
    <>
      <AssessmentCardActions id={exam.id} publishDisabled={publishDisabled} showRepublish={exam.status === "closed"} onPreview={onPreview} onDuplicate={onDuplicate} onPublish={onPublish} onEdit={onEdit} onRepublish={onRepublish} onDelete={() => setConfirmOpen(true)} />
      <ConfirmDeleteModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete exam"
        description="Are you sure you want to delete this exam This cannot be undone"
        confirmLabel="Yes delete"
        cancelLabel="No"
        onConfirm={() => onDelete(exam.id)}
      />
    </>
  );
}
