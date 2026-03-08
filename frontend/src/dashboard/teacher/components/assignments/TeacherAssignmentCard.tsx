// Orchestrates the teacher assignment card using focused card subcomponents.
import { useState } from "react";
import type { TeacherAssignment } from "./AssignmentsTypes";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { AssignmentCardActions } from "./card/AssignmentCardActions";
import { AssignmentCardHeader } from "./card/AssignmentCardHeader";
import { AssignmentCardMeta } from "./card/AssignmentCardMeta";

type Props = {
  assignment: TeacherAssignment;
  onPreview: (id: string) => void;
  onDuplicate: (id: string) => void;
  onPublish: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TeacherAssignmentCard({ assignment, onDelete, onDuplicate, onEdit, onPreview, onPublish }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <article className="group bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-4 space-y-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:bg-white/20">
      <AssignmentCardHeader assignment={assignment} />
      <AssignmentCardMeta assignment={assignment} />
      <AssignmentCardActions assignment={assignment} onDelete={() => setConfirmOpen(true)} onDuplicate={onDuplicate} onEdit={onEdit} onPreview={onPreview} onPublish={onPublish} />
      <ConfirmDeleteModal open={confirmOpen} onOpenChange={setConfirmOpen} onConfirm={() => onDelete(assignment.id)} />
    </article>
  );
}
