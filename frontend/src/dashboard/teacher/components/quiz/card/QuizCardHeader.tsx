/** Renders the shared assessment card header for quizzes. */
import { AssessmentCardHeader } from "@/dashboard/teacher/components/shared/assessment/AssessmentCardHeader";
import { DEFAULT_SUBJECT_ICON_THEME, SUBJECT_ICON_THEME } from "../quizTheme";
import type { TeacherQuiz } from "../quizTypes";

type Props = { quiz: TeacherQuiz };

export function QuizCardHeader({ quiz }: Props) {
  const theme = SUBJECT_ICON_THEME[quiz.subject] ?? DEFAULT_SUBJECT_ICON_THEME;

  return <AssessmentCardHeader title={quiz.title} iconContainerClass={theme.bg} iconClass={theme.text} />;
}
