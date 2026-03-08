/**
 * TeacherGradesSubjectSidebar
 * ---------------------------
 * Renders the sidebar content for the teacher dashboard g ra de s feature.
 */
import { TeacherAssignmentsSubjectSidebar } from "@/dashboard/teacher/components/assignments";
import type { TeacherGradesSubject } from "./gradesTypes";

type Props = {
  subjects: TeacherGradesSubject[];
  selectedSubjectId: string | null;
  onSelectSubject: (subjectId: string | null) => void;
};

export function TeacherGradesSubjectSidebar({
  subjects,
  selectedSubjectId,
  onSelectSubject,
}: Props) {
  return (
    <TeacherAssignmentsSubjectSidebar
      subjects={subjects}
      selectedSubjectId={selectedSubjectId}
      onSelectSubject={onSelectSubject}
    />
  );
}

