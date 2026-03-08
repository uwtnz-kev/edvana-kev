// Renders the academic summary card for the student details modal.
import { BookOpen } from "lucide-react";
import type { TeacherStudentDetails } from "./TeacherStudentDetailsModal";
import { formatStudentDetailsGrade } from "./studentDetailsHelpers";

type Props = {
  student: TeacherStudentDetails;
};

export function StudentDetailsSubjects({ student }: Props) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/10 p-3">
      <div className="text-white/70 text-xs">Grades</div>
      <div className="mt-1 inline-flex items-center gap-2 text-white">
        <BookOpen className="h-4 w-4 text-white/70" />
        <span className="font-semibold">Average grade {formatStudentDetailsGrade(student.averageGrade)}</span>
      </div>
      <p className="text-white/60 text-xs mt-1">Replace this with subject level grades when your data model includes them.</p>
    </div>
  );
}
