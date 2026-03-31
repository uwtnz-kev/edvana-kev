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
  onPublish: (id: string) => void;
  onRepublish: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
};

export function TeacherExamList({
  exams,
  selectedSubject,
  onPreview,
  onPublish,
  onRepublish,
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
    <div className="space-y-4 transition-all duration-300">
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
        Showing {exams.length} exam records
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <TeacherExamCard
            key={exam.id}
            exam={exam}
            onPreview={onPreview}
            onPublish={onPublish}
            onRepublish={onRepublish}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
