/** Renders quiz card actions through the shared assessment action row. */
import { AssessmentCardActions } from "@/dashboard/teacher/components/shared/assessment/AssessmentCardActions";
import type { TeacherQuiz } from "../QuizTypes";

type Props = {
  quiz: TeacherQuiz;
  onPreview: (id: string) => void;
  onDuplicate: (id: string) => void;
  onPublish: (id: string) => void;
  onEdit: (id: string) => void;
  onRepublish: () => void;
  onDelete: () => void;
};

export function QuizCardActions({ onDelete, onDuplicate, onEdit, onPreview, onPublish, onRepublish, quiz }: Props) {
  const publishDisabled = quiz.status === "published" || quiz.status === "closed";

  return <AssessmentCardActions id={quiz.id} publishDisabled={publishDisabled} showRepublish={quiz.status === "closed"} onPreview={onPreview} onDuplicate={onDuplicate} onPublish={onPublish} onEdit={onEdit} onRepublish={onRepublish} onDelete={onDelete} />;
}
