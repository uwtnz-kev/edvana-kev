/** Renders quiz card actions through the shared assessment action row. */
import { AssessmentCardActions } from "@/dashboard/teacher/components/shared/assessment/AssessmentCardActions";
import type { TeacherQuiz } from "../quizTypes";

type Props = {
  quiz: TeacherQuiz;
  onPreview: (id: string) => void;
  onDuplicate: (id: string) => void;
  onPublish: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: () => void;
};

export function QuizCardActions({ onDelete, onDuplicate, onEdit, onPreview, onPublish, quiz }: Props) {
  const publishDisabled = quiz.status === "published";

  return <AssessmentCardActions id={quiz.id} publishDisabled={publishDisabled} onPreview={onPreview} onDuplicate={onDuplicate} onPublish={onPublish} onEdit={onEdit} onDelete={onDelete} />;
}
