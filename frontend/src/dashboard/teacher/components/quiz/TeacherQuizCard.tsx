// Orchestrates the teacher quiz card using focused card subcomponents.
import { useState } from "react";
import type { TeacherQuiz } from "./QuizTypes";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { QuizCardActions } from "./card/QuizCardActions";
import { QuizCardHeader } from "./card/QuizCardHeader";
import { QuizCardMeta } from "./card/QuizCardMeta";
import { RepublishAssignmentModal } from "@/dashboard/teacher/components/assignments/republish/RepublishAssignmentModal";
import { getRepublishEligibleStudents } from "@/dashboard/teacher/components/assignments/republish/republishHelpers";
import type { RepublishAssignmentPayload } from "@/dashboard/teacher/components/assignments/republish/republishTypes";

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
  const [republishOpen, setRepublishOpen] = useState(false);
  const eligibleStudents = getRepublishEligibleStudents(quiz);

  const handleRepublishConfirm = (payload: RepublishAssignmentPayload) => {
    console.info("Republish quiz payload", { quizId: quiz.id, payload });
  };

  return (
    <article className="group teacher-panel-surface rounded-2xl p-4 space-y-4 teacher-panel-hover-lift">
      <QuizCardHeader quiz={quiz} />
      <QuizCardMeta quiz={quiz} />
      <QuizCardActions quiz={quiz} onDelete={() => setConfirmOpen(true)} onDuplicate={onDuplicate} onEdit={onEdit} onPreview={onPreview} onPublish={onPublish} onRepublish={() => setRepublishOpen(true)} />
      <ConfirmDeleteModal open={confirmOpen} onOpenChange={setConfirmOpen} title="Delete quiz" description="Are you sure you want to delete this quiz This cannot be undone" confirmLabel="Yes delete" cancelLabel="No" onConfirm={() => onDelete(quiz.id)} />
      <RepublishAssignmentModal open={republishOpen} assignmentTitle={quiz.title} assessmentLabel="quiz" classLabel={quiz.classLabel} eligibleStudents={eligibleStudents} onClose={() => setRepublishOpen(false)} onConfirm={handleRepublishConfirm} />
    </article>
  );
}

