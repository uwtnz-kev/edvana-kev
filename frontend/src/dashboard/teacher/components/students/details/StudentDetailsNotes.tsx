// Renders the modal body sections for student overview and academic notes.
import type { TeacherStudentDetails } from "./TeacherStudentDetailsModal";
import { StudentDetailsOverview } from "./StudentDetailsOverview";
import { StudentDetailsSubjects } from "./StudentDetailsSubjects";

type Props = {
  student: TeacherStudentDetails;
};

export function StudentDetailsNotes({ student }: Props) {
  return (
    <div className="space-y-4">
      <StudentDetailsOverview student={student} />
      <StudentDetailsSubjects student={student} />
    </div>
  );
}
