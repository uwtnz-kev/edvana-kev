// Orchestrates the teacher assignment card using focused card subcomponents.
import { useState } from "react";
import type { TeacherAssignment } from "./AssignmentsTypes";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { AssignmentCardActions } from "./card/AssignmentCardActions";
import { AssignmentCardHeader } from "./card/AssignmentCardHeader";
import { AssignmentCardMeta } from "./card/AssignmentCardMeta";
import { RepublishAssignmentModal } from "./republish/RepublishAssignmentModal";
import { getRepublishEligibleStudents } from "./republish/republishHelpers";
import type { RepublishAssignmentPayload } from "./republish/republishTypes";

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
  const [republishOpen, setRepublishOpen] = useState(false);
  const eligibleStudents = getRepublishEligibleStudents(assignment);

  const handleRepublishConfirm = (payload: RepublishAssignmentPayload) => {
    console.info("Republish assignment payload", { assignmentId: assignment.id, payload });
  };

  return (
    <article className="group w-full max-w-[580px] teacher-panel-surface rounded-xl p-3 space-y-1.5 teacher-panel-hover-lift">
      <AssignmentCardHeader assignment={assignment} />
      <AssignmentCardMeta assignment={assignment} />
      <AssignmentCardActions assignment={assignment} onDelete={() => setConfirmOpen(true)} onDuplicate={onDuplicate} onEdit={onEdit} onPreview={onPreview} onPublish={onPublish} onRepublish={() => setRepublishOpen(true)} />
      <ConfirmDeleteModal open={confirmOpen} onOpenChange={setConfirmOpen} onConfirm={() => onDelete(assignment.id)} />
      <RepublishAssignmentModal open={republishOpen} assignmentTitle={assignment.title} classLabel={assignment.classLabel} eligibleStudents={eligibleStudents} onClose={() => setRepublishOpen(false)} onConfirm={handleRepublishConfirm} />
    </article>
  );
}
