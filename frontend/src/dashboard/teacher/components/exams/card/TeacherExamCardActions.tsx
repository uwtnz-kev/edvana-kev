/** Renders exam card actions and keeps the local delete confirmation flow. */
import { useState } from "react";
import { AssessmentCardActions } from "@/dashboard/teacher/components/shared/assessment/AssessmentCardActions";
import { ConfirmDeleteModal } from "../ConfirmDeleteModal";
import type { TeacherExam } from "../examsTypes";

type Props = {
  exam: TeacherExam;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onEdit: (id: string) => void;
  onPreview: (id: string) => void;
  onPublish: (id: string) => void;
};

export function TeacherExamCardActions({ exam, onDelete, onDuplicate, onEdit, onPreview, onPublish }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const publishDisabled = exam.status === "published";

  return (
    <>
      <AssessmentCardActions id={exam.id} publishDisabled={publishDisabled} onPreview={onPreview} onDuplicate={onDuplicate} onPublish={onPublish} onEdit={onEdit} onDelete={() => setConfirmOpen(true)} />
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
