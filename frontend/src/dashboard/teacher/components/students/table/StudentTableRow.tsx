// Renders a single student row in the students table.
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Student } from "../types";
import { StudentTableActions } from "./StudentTableActions";
import { formatStudentDate, getStudentStatusClass } from "./studentsTableHelpers";

type Props = {
  onView: (student: Student) => void;
  student: Student;
};

export function StudentTableRow({ onView, student }: Props) {
  return (
    <TableRow className="border-white/10 hover:bg-white/5">
      <TableCell className="text-black font-medium">{student.firstName} {student.lastName}</TableCell>
      <TableCell className="text-black">{student.email}</TableCell>
      <TableCell>
        <Badge className="bg-blue-500/20 text-blue-700 border-blue-500/30 rounded-full px-2 py-1 text-xs font-medium border">{student.class}</Badge>
      </TableCell>
      <TableCell>
        <Badge className={`${getStudentStatusClass(student.status)} rounded-full px-2 py-1 text-xs font-medium border`}>
          {student.status}
        </Badge>
      </TableCell>
      <TableCell className="text-black">{formatStudentDate(student.enrollmentDate)}</TableCell>
      <TableCell className="px-6 py-4 align-middle">
        <StudentTableActions student={student} onView={onView} />
      </TableCell>
    </TableRow>
  );
}
