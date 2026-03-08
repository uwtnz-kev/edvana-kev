// Orchestrates the students table, including empty state and row rendering.
import { Table, TableBody } from "@/components/ui/table";
import EmptyState from "../EmptyState";
import type { Student } from "../types";
import { StudentTableRow } from "./StudentTableRow";
import { StudentsTableHeader } from "./StudentsTableHeader";

type Props = {
  onView: (student: Student) => void;
  students: Student[];
};

export default function StudentsTable({ onView, students }: Props) {
  if (students.length === 0) return <EmptyState />;

  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden transition-colors duration-200 hover:bg-white/20">
      <Table>
        <StudentsTableHeader />
        <TableBody>
          {students.map((student) => (
            <StudentTableRow key={student.id} student={student} onView={onView} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
