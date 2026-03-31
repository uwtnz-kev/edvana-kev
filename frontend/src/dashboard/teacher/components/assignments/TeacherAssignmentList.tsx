/**
 * TeacherAssignmentCard
 * ---------------------
 * Renders the T ea ch er As si gn me nt Ca rd UI for the teacher dashboard a ss ig nm en ts feature.
 */
import { TeacherAssignmentCard } from "./TeacherAssignmentCard";
import { TeacherAssignmentEmptyState } from "./TeacherAssignmentEmptyState";
import type { TeacherAssignment, TeacherSubject2 } from "./AssignmentsTypes";

type Props = {
  assignments: TeacherAssignment[];
  selectedSubject: TeacherSubject2 | null;
  onPreview: (id: string) => void;
  onDuplicate: (id: string) => void;
  onPublish: (id: string) => void;
  onRepublish: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
};

export function TeacherAssignmentList({
  assignments,
  selectedSubject,
  onPreview,
  onDuplicate,
  onPublish,
  onRepublish,
  onEdit,
  onDelete,
  onCreate,
}: Props) {
  if (!selectedSubject) {
    return (
      <TeacherAssignmentEmptyState
        message="Choose a subject from the sidebar to manage assignments"
        onCreate={onCreate}
        createDisabled
      />
    );
  }

  if (assignments.length === 0) {
    return (
      <TeacherAssignmentEmptyState
        message={`No assignments in ${selectedSubject.name}. Create your first assignment.`}
        onCreate={onCreate}
      />
    );
  }

  return (
    <div className="space-y-4 transition-all duration-300">
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
        Showing {assignments.length} assignment records
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {assignments.map((assignment) => (
          <TeacherAssignmentCard
            key={assignment.id}
            assignment={assignment}
            onPreview={onPreview}
            onDuplicate={onDuplicate}
            onPublish={onPublish}
            onRepublish={onRepublish}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
