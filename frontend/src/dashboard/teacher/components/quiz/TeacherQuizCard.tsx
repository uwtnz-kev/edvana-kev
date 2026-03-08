// Orchestrates the teacher quiz card using focused card subcomponents.
import { useState } from "react";
import type { TeacherQuiz } from "./QuizTypes";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { QuizCardActions } from "./card/QuizCardActions";
import { QuizCardHeader } from "./card/QuizCardHeader";
import { QuizCardMeta } from "./card/QuizCardMeta";

type Props = {
  quiz: TeacherQuiz;
  onPreview: (id: string) => void;
  onDuplicate: (id: string) => void;
  onPublish: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TeacherQuizCard({ onDelete, onDuplicate, onEdit, onPreview, onPublish, quiz }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <article className="group bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-4 space-y-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:bg-white/20">
      <QuizCardHeader quiz={quiz} />
      <QuizCardMeta quiz={quiz} />
      <QuizCardActions quiz={quiz} onDelete={() => setConfirmOpen(true)} onDuplicate={onDuplicate} onEdit={onEdit} onPreview={onPreview} onPublish={onPublish} />
      <ConfirmDeleteModal open={confirmOpen} onOpenChange={setConfirmOpen} title="Delete quiz" description="Are you sure you want to delete this quiz This cannot be undone" confirmLabel="Yes delete" cancelLabel="No" onConfirm={() => onDelete(quiz.id)} />
    </article>
  );
}
