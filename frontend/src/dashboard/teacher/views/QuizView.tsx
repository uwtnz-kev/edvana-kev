// Orchestrates the quiz workspace by composing extracted page sections.
import { TeacherQuizPreviewModal } from "@/dashboard/teacher/components/quiz";
import { QuizWorkspaceContent } from "./quiz/QuizWorkspaceContent";
import { QuizWorkspaceHeader } from "./quiz/QuizWorkspaceHeader";
import { useQuizWorkspaceState } from "./quiz/useQuizWorkspaceState";

export default function QuizView() {
  const workspace = useQuizWorkspaceState();

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <QuizWorkspaceHeader workspace={workspace} />
      <QuizWorkspaceContent workspace={workspace} />
      <TeacherQuizPreviewModal
        quiz={workspace.previewQuiz}
        open={Boolean(workspace.previewQuiz)}
        onOpenChange={(isOpen) => {
          if (!isOpen) workspace.setPreviewId(null);
        }}
      />
    </div>
  );
}
