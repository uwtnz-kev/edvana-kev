// Orchestrates the teacher quiz card using focused card subcomponents.
import type { TeacherQuiz } from "./QuizTypes";
import { QuizCardActions } from "./card/QuizCardActions";
import { QuizCardHeader } from "./card/QuizCardHeader";
import { QuizCardMeta } from "./card/QuizCardMeta";

type Props = {
  quiz: TeacherQuiz;
  onPreview: (id: string) => void;
  onPublish: (id: string) => void;
  onRepublish: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TeacherQuizCard({ onDelete, onPreview, onPublish, onRepublish, quiz }: Props) {
  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-2xl teacher-panel-surface teacher-panel-hover-lift">
      <div className="rounded-t-2xl border-b border-white/10 bg-white/5 p-3.5">
        <QuizCardHeader quiz={quiz} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3.5">
        <QuizCardMeta quiz={quiz} />
        <div className="mt-auto border-t border-white/10 pt-2.5">
          <QuizCardActions quiz={quiz} onDelete={onDelete} onPreview={onPreview} onPublish={onPublish} onRepublish={() => onRepublish(quiz.id)} />
        </div>
      </div>
    </article>
  );
}
