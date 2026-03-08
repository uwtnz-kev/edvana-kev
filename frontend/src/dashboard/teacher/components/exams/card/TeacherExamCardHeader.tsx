/** Renders the shared assessment card header for exams. */
import { AssessmentCardHeader } from "@/dashboard/teacher/components/shared/assessment/AssessmentCardHeader";
import type { TeacherExam } from "../examsTypes";
import { DEFAULT_SUBJECT_ICON_THEME, SUBJECT_ICON_THEME } from "../examsTheme";

type Props = {
  exam: TeacherExam;
};

export function TeacherExamCardHeader({ exam }: Props) {
  const theme = SUBJECT_ICON_THEME[exam.subject] ?? DEFAULT_SUBJECT_ICON_THEME;

  return <AssessmentCardHeader title={exam.title} iconContainerClass={theme.bg} iconClass={theme.text} />;
}
