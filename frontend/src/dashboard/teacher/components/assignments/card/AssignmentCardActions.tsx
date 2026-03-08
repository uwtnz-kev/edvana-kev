/** Renders assignment card actions through the shared assessment action row. */
import { AssessmentCardActions } from "@/dashboard/teacher/components/shared/assessment/AssessmentCardActions";
import type { TeacherAssignment } from "../assignmentsTypes";

type Props = {
  assignment: TeacherAssignment;
  onPreview: (id: string) => void;
  onDuplicate: (id: string) => void;
  onPublish: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: () => void;
};

export function AssignmentCardActions({ assignment, onDelete, onDuplicate, onEdit, onPreview, onPublish }: Props) {
  const publishDisabled = assignment.status === "archived";

  return <AssessmentCardActions id={assignment.id} publishDisabled={publishDisabled} onPreview={onPreview} onDuplicate={onDuplicate} onPublish={onPublish} onEdit={onEdit} onDelete={onDelete} />;
}
