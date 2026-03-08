/**
 * TeacherAssignmentList
 * ---------------------
 * Renders the T ea ch er As si gn me nt Li st UI for the teacher dashboard a ss ig nm en ts feature.
 */
import { TeacherAssignmentCard } from "./TeacherAssignmentCard";
import { TeacherAssignmentEmptyState } from "./TeacherAssignmentEmptyState";
import type { TeacherAssignment, TeacherSubject2 } from "./assignmentsTypes";

type Props = {
  assignments: TeacherAssignment[];
  selectedSubject: TeacherSubject2 | null;
  onPreview: (id: string) => void;
  onDuplicate: (id: string) => void;
  onPublish: (id: string) => void;
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
    <div className="space-y-3 transition-all duration-300">
      <p className="text-white/60 text-sm">Showing {assignments.length} assignment records</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {assignments.map((assignment) => (
          <TeacherAssignmentCard
            key={assignment.id}
            assignment={assignment}
            onPreview={onPreview}
            onDuplicate={onDuplicate}
            onPublish={onPublish}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}


