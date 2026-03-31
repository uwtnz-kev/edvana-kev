// Orchestrates the quiz workspace by composing extracted page sections.
import { ClipboardList } from "lucide-react";
import { DEFAULT_SUBJECT_ICON_THEME } from "@/dashboard/teacher/components/quiz/QuizTheme";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";
import { QuizWorkspaceContent } from "./quiz/QuizWorkspaceContent";
import { QuizWorkspaceHeader } from "./quiz/QuizWorkspaceHeader";
import { useQuizWorkspaceState } from "./quiz/useQuizWorkspaceState";
import { TeacherFeatureClassEntryGate } from "./shared/TeacherFeatureClassEntryGate";

export default function QuizView() {
  return (
    <TeacherFeatureClassEntryGate
      entryPath={TEACHER_ROUTES.QUIZZES}
      featureKey="quiz"
      title="Quiz"
      subtitle="Choose a class to open the quiz workspace"
      icon={ClipboardList}
      infoCardClassName="transition-all duration-200 hover:-translate-y-[2px] hover:bg-white/10 hover:shadow-lg"
      renderHeaderIcon={({ Icon }) => (
        <div className={`h-12 w-12 rounded-xl p-3 flex items-center justify-center ${DEFAULT_SUBJECT_ICON_THEME.bg}`}>
          <Icon className={`h-6 w-6 ${DEFAULT_SUBJECT_ICON_THEME.text}`} />
        </div>
      )}
    >
      {({ classId, onBackToEntry }) => <QuizScopedWorkspace classId={classId} onBackToEntry={onBackToEntry} />}
    </TeacherFeatureClassEntryGate>
  );
}

function QuizScopedWorkspace({ classId, onBackToEntry }: { classId: string; onBackToEntry: () => void }) {
  const workspace = useQuizWorkspaceState(classId);

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <QuizWorkspaceHeader workspace={workspace} onBackToClassEntry={onBackToEntry} />
      <QuizWorkspaceContent workspace={workspace} />
    </div>
  );
}
