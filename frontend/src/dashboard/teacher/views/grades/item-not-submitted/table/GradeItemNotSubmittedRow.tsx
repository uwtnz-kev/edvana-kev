// Renders a single not-submitted student row.
import type { TeacherClassRosterStudent } from "@/dashboard/teacher/components/grades";
import { getNotSubmittedStatusLabel } from "../gradeItemNotSubmittedHelpers";

type Props = { student: TeacherClassRosterStudent };

export function GradeItemNotSubmittedRow({ student }: Props) {
  return (
    <tr className="border-t border-white/10">
      <td className="px-4 py-3">{student.studentName}</td>
      <td className="px-4 py-3">{student.className}</td>
      <td className="px-4 py-3">{getNotSubmittedStatusLabel()}</td>
    </tr>
  );
}
