/**
 * TeacherQuizList
 * ---------------
 * Renders the T ea ch er Qu iz Li st UI for the teacher dashboard q ui z feature.
 */
import { TeacherQuizCard } from "./TeacherQuizCard";
import { TeacherQuizEmptyState } from "./TeacherQuizEmptyState";
import type { TeacherQuiz, TeacherSubject2 } from "./quizTypes";

type Props = {
  quizzes: TeacherQuiz[];
  selectedSubject: TeacherSubject2 | null;
  onPreview: (id: string) => void;
  onDuplicate: (id: string) => void;
  onPublish: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
};

export function TeacherQuizList({
  quizzes,
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
      <TeacherQuizEmptyState
        message="Choose a subject from the sidebar to manage quizzes"
        onCreate={onCreate}
        createDisabled
      />
    );
  }

  if (quizzes.length === 0) {
    return (
      <TeacherQuizEmptyState
        message={`No quizzes in ${selectedSubject.name}. Create your first quiz.`}
        onCreate={onCreate}
      />
    );
  }

  return (
    <div className="space-y-3 transition-all duration-300">
      <p className="text-white/60 text-sm">Showing {quizzes.length} quiz records</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {quizzes.map((quiz) => (
          <TeacherQuizCard
            key={quiz.id}
            quiz={quiz}
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


