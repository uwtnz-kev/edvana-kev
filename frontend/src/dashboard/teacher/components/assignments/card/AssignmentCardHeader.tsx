/** Renders the shared assessment card header for assignments. */
import { AssessmentCardHeader } from "@/dashboard/teacher/components/shared/assessment/AssessmentCardHeader";
import { getSubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";
import type { TeacherAssignment } from "../AssignmentsTypes";

type Props = { assignment: TeacherAssignment };

export function AssignmentCardHeader({ assignment }: Props) {
  const theme = getSubjectIconTheme(assignment.subject);

  return <AssessmentCardHeader title={assignment.title} iconContainerClass={theme.bgClass} iconClass={theme.iconClass} />;
}
