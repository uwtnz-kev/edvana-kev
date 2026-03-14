// Renders a single student row in the students table.
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Student } from "../types";
import { StudentTableActions } from "./StudentTableActions";
import { formatStudentDate, getStudentClassBadgeClass, getStudentStatusClass } from "./studentsTableHelpers";

type Props = {
  onView: (student: Student) => void;
  student: Student;
};

export function StudentTableRow({ onView, student }: Props) {
  return (
    <TableRow className="border-white/10 hover:bg-white/5">
      <TableCell className="font-medium text-white">{student.firstName} {student.lastName}</TableCell>
      <TableCell className="text-white">{student.email}</TableCell>
      <TableCell>
        <Badge className={getStudentClassBadgeClass(student.class)}>{student.class}</Badge>
      </TableCell>
      <TableCell>
        <Badge className={getStudentStatusClass(student.status)}>
          {student.status}
        </Badge>
      </TableCell>
      <TableCell className="text-white">{formatStudentDate(student.enrollmentDate)}</TableCell>
      <TableCell className="px-6 py-4 align-middle">
        <StudentTableActions student={student} onView={onView} />
      </TableCell>
    </TableRow>
  );
}
