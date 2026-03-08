/**
 * TeacherExamList
 * ---------------
 * Renders the T ea ch er Ex am Li st UI for the teacher dashboard e xa ms feature.
 */
import { TeacherExamCard } from "./TeacherExamCard";
import { TeacherExamEmptyState } from "./TeacherExamEmptyState";
import type { TeacherExam, TeacherSubject2 } from "./ExamsTypes";

type Props = {
  exams: TeacherExam[];
  selectedSubject: TeacherSubject2 | null;
  onPreview: (id: string) => void;
  onDuplicate: (id: string) => void;
  onPublish: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
};

export function TeacherExamList({
  exams,
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
      <TeacherExamEmptyState
        message="Choose a subject from the sidebar to manage exams"
        onCreate={onCreate}
        createDisabled
      />
    );
  }

  if (exams.length === 0) {
    return (
      <TeacherExamEmptyState
        message={`No exams in ${selectedSubject.name}. Create your first exam.`}
        onCreate={onCreate}
      />
    );
  }

  return (
    <div className="space-y-3 transition-all duration-300">
      <p className="text-white/60 text-sm">Showing {exams.length} exam records</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {exams.map((exam) => (
          <TeacherExamCard
            key={exam.id}
            exam={exam}
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


