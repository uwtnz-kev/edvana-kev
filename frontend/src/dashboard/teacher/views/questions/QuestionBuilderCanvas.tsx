// Maps edit-view questions into the shared question editor panels.
import type { QuestionBuilderQuestion } from "@/dashboard/teacher/components/questions/questionsStore";
import { QuestionEditorPanel } from "./QuestionEditorPanel";

type Props = {
  questions: QuestionBuilderQuestion[];
  onMove: (questionId: string, direction: -1 | 1) => void;
  onRemove: (questionId: string) => void;
  onUpdate: (questionId: string, updater: (question: QuestionBuilderQuestion) => QuestionBuilderQuestion) => void;
};

export function QuestionBuilderCanvas({ questions, onMove, onRemove, onUpdate }: Props) {
  return (
    <>
      {questions.map((question, index) => (
        <QuestionEditorPanel key={question.id} index={index} question={question} onDelete={() => onRemove(question.id)} onMoveDown={() => onMove(question.id, 1)} onMoveUp={() => onMove(question.id, -1)} onUpdate={(updater) => onUpdate(question.id, updater)} />
      ))}
    </>
  );
}
