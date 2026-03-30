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
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-2xl teacher-panel-surface teacher-panel-hover-lift">
      <div className="rounded-t-2xl border-b border-white/10 bg-white/5 p-3.5">
        <AssignmentCardHeader assignment={assignment} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3.5">
        <AssignmentCardMeta assignment={assignment} />
        <div className="mt-auto border-t border-white/10 pt-2.5">
          <AssignmentCardActions assignment={assignment} onDelete={() => setConfirmOpen(true)} onDuplicate={onDuplicate} onEdit={onEdit} onPreview={onPreview} onPublish={onPublish} onRepublish={() => setRepublishOpen(true)} />
        </div>
      </div>
      <ConfirmDeleteModal open={confirmOpen} onOpenChange={setConfirmOpen} onConfirm={() => onDelete(assignment.id)} />
      <RepublishAssignmentModal open={republishOpen} assignmentTitle={assignment.title} classLabel={assignment.classLabel} eligibleStudents={eligibleStudents} onClose={() => setRepublishOpen(false)} onConfirm={handleRepublishConfirm} />
    </article>
  );
}


