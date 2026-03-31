/**
 * TeacherQuizList
 * ---------------
 * Renders the T ea ch er Qu iz Li st UI for the teacher dashboard q ui z feature.
 */
import { TeacherQuizCard } from "./TeacherQuizCard";
import { TeacherQuizEmptyState } from "./TeacherQuizEmptyState";
import type { TeacherQuiz, TeacherSubject2 } from "./QuizTypes";

type Props = {
  quizzes: TeacherQuiz[];
  selectedSubject: TeacherSubject2 | null;
  onPreview: (id: string) => void;
  onPublish: (id: string) => void;
  onRepublish: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
};

export function TeacherQuizList({
  quizzes,
  selectedSubject,
  onPreview,
  onPublish,
  onRepublish,
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
    <div className="space-y-4 transition-all duration-300">
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
        Showing {quizzes.length} quiz records
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <TeacherQuizCard
            key={quiz.id}
            quiz={quiz}
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
